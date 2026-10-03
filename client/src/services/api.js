/**
 * Resilient API Service for Render Backend
 * 
 * Features:
 * - Cold-start detection & wake-up status notification
 * - Request timeout handling (default 18 seconds)
 * - Safe exponential backoff + jitter retry for idempotent requests (GET)
 * - Strict non-retry policy for non-idempotent writes (POST, PATCH, DELETE) to prevent duplicates
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Cold start state subscribers
let coldStartListeners = [];
let isBackendWakingUp = false;

export function subscribeToColdStart(callback) {
  coldStartListeners.push(callback);
  callback(isBackendWakingUp);
  return () => {
    coldStartListeners = coldStartListeners.filter(cb => cb !== callback);
  };
}

function notifyColdStart(status) {
  if (isBackendWakingUp !== status) {
    isBackendWakingUp = status;
    coldStartListeners.forEach(cb => cb(status));
  }
}

/**
 * Resilient HTTP client
 */
export async function apiRequest(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const isIdempotent = ['GET', 'HEAD', 'OPTIONS'].includes(method);
  const maxRetries = isIdempotent ? 3 : 0; // Never retry POST/PATCH/DELETE blindly
  const timeoutMs = options.timeoutMs || 20000; // 20s timeout for cold start tolerance

  let attempt = 0;
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    let isSlowTimer = null;

    // If request takes longer than 3 seconds, flag potential Render cold-start to show friendly UI
    isSlowTimer = setTimeout(() => {
      notifyColdStart(true);
    }, 3000);

    const timeoutTimer = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const fetchOptions = {
        ...options,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        credentials: 'include', // Include HttpOnly cookies
        signal: controller.signal
      };

      // If body is FormData (e.g. file upload), let browser set Content-Type with boundary
      if (options.body instanceof FormData) {
        delete fetchOptions.headers['Content-Type'];
      }

      const response = await fetch(url, fetchOptions);

      clearTimeout(isSlowTimer);
      clearTimeout(timeoutTimer);
      notifyColdStart(false);

      // Handle HTTP error responses
      if (!response.ok) {
        // Cold start 502 / 503 / 504 from Render proxy
        if ([502, 503, 504].includes(response.status) && isIdempotent && attempt < maxRetries) {
          notifyColdStart(true);
          attempt++;
          // Exponential backoff with jitter: 2s, 4s, 8s + random(0-500ms)
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          await new Promise(r => setTimeout(r, delay));
          continue;
        }

        let errorData = {};
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `Server error (${response.status})` };
        }

        const error = new Error(errorData.error || response.statusText || 'Request failed');
        error.status = response.status;
        error.details = errorData.details;
        throw error;
      }

      return await response.json();
    } catch (err) {
      clearTimeout(isSlowTimer);
      clearTimeout(timeoutTimer);

      const isNetworkOrAbort = err.name === 'AbortError' || err.message.includes('Failed to fetch') || err.message.includes('NetworkError');

      if (isNetworkOrAbort && isIdempotent && attempt < maxRetries) {
        notifyColdStart(true);
        attempt++;
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      // If it aborted due to timeout
      if (err.name === 'AbortError') {
        const timeoutError = new Error('The Render server took too long to respond. It may still be spinning up from sleep.');
        timeoutError.isTimeout = true;
        throw timeoutError;
      }

      throw err;
    }
  }
}
