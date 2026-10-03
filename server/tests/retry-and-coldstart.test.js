const { test, describe } = require('node:test');
const assert = require('node:assert');

// Simulate the frontend API client resilient fetch logic
async function resilientFetch(url, options = {}, { maxRetries = 2, timeoutMs = 200 } = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const isIdempotent = ['GET', 'HEAD', 'OPTIONS'].includes(method);

  let attempt = 0;

  while (attempt <= (isIdempotent ? maxRetries : 0)) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok && response.status >= 500 && isIdempotent && attempt < maxRetries) {
        attempt++;
        await new Promise(r => setTimeout(r, 50 * attempt)); // backoff
        continue;
      }

      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      if (attempt < (isIdempotent ? maxRetries : 0)) {
        attempt++;
        await new Promise(r => setTimeout(r, 50 * attempt));
        continue;
      }
      throw err;
    }
  }
}

describe('4. Frontend Cold-Start Handling & Idempotency Safety', () => {
  test('Backend timeout produces an abort/timeout error', async () => {
    // Ping an unroutable IP / port with very low timeout
    await assert.rejects(async () => {
      await resilientFetch('http://10.255.255.1:81', { method: 'GET' }, { maxRetries: 0, timeoutMs: 50 });
    }, /abort|timeout|FetchError|ECONNREFUSED|ENETUNREACH/i);
  });

  test('Non-idempotent operations (POST) are NOT retried on failure', async () => {
    let callCount = 0;
    const fakeServer = require('http').createServer((req, res) => {
      callCount++;
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Cold start in progress' }));
    });

    await new Promise(r => fakeServer.listen(0, '127.0.0.1', r));
    const port = fakeServer.address().port;

    try {
      const res = await resilientFetch(`http://127.0.0.1:${port}/api/v1/portfolios`, {
        method: 'POST',
        body: JSON.stringify({ title: 'New Portfolio' })
      }, { maxRetries: 3, timeoutMs: 500 });

      assert.strictEqual(res.status, 503);
      // Verify call was only made ONCE and not duplicated!
      assert.strictEqual(callCount, 1);
    } finally {
      fakeServer.close();
    }
  });

  test('Idempotent operations (GET) retry up to maxRetries on temporary 503', async () => {
    let callCount = 0;
    const fakeServer = require('http').createServer((req, res) => {
      callCount++;
      if (callCount < 3) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Waking up' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      }
    });

    await new Promise(r => fakeServer.listen(0, '127.0.0.1', r));
    const port = fakeServer.address().port;

    try {
      const res = await resilientFetch(`http://127.0.0.1:${port}/api/health`, {
        method: 'GET'
      }, { maxRetries: 3, timeoutMs: 500 });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(callCount, 3);
    } finally {
      fakeServer.close();
    }
  });
});
