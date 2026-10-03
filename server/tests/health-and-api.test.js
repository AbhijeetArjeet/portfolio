const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;

before((t, done) => {
  server = app.listen(0, '127.0.0.1', () => {
    const address = server.address();
    baseUrl = `http://127.0.0.1:${address.port}`;
    done();
  });
});

after((t, done) => {
  server.close(async () => {
    await prisma.$disconnect();
    done();
  });
});

describe('1. Render Health & Keep-Alive Monitoring Endpoints', () => {
  test('GET /api/health returns HTTP 200 and required fields', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.strictEqual(body.service, 'portfolio-api');
    assert.ok(typeof body.uptime === 'number');
    assert.ok(typeof body.timestamp === 'string');
  });

  test('GET /api/health does NOT leak secrets or database credentials', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    const bodyText = await res.text();

    assert.ok(!bodyText.includes('DATABASE_URL'));
    assert.ok(!bodyText.includes('JWT_SECRET'));
    assert.ok(!bodyText.includes('SESSION_SECRET'));
    assert.ok(!bodyText.includes('password'));
    assert.ok(!bodyText.includes('secret'));
  });

  test('GET /api/health/ready readiness check responds with ready', async () => {
    const res = await fetch(`${baseUrl}/api/health/ready`);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.status, 'ready');
    assert.strictEqual(body.database, 'connected');
  });

  test('Health check requests do NOT create database records', async () => {
    const auditCountBefore = await prisma.auditLog.count();
    const portfolioCountBefore = await prisma.portfolio.count();

    await fetch(`${baseUrl}/api/health`);
    await fetch(`${baseUrl}/api/health/ready`);

    const auditCountAfter = await prisma.auditLog.count();
    const portfolioCountAfter = await prisma.portfolio.count();

    assert.strictEqual(auditCountBefore, auditCountAfter);
    assert.strictEqual(portfolioCountBefore, portfolioCountAfter);
  });
});

describe('2. Authentication & Authorization Security', () => {
  let userToken;
  let userPortfolioId;
  let adminToken;

  test('Faculty Evaluator / Admin Login works (Suneetha Mam / 12345)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrUsername: 'Suneetha Mam',
        password: '12345'
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.role, 'ADMIN');
    assert.ok(data.token);
    adminToken = data.token;
  });

  test('User Registration works and hashes password', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const res = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Candidate',
        email: uniqueEmail,
        password: 'securePassword123'
      })
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.user.email, uniqueEmail);
    assert.strictEqual(data.user.role, 'USER');
    assert.ok(data.token);
    userToken = data.token;

    // Verify password is not plaintext in database
    const savedUser = await prisma.user.findUnique({ where: { email: uniqueEmail } });
    assert.notStrictEqual(savedUser.passwordHash, 'securePassword123');
  });

  test('Rejects invalid login credentials', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrUsername: 'nonexistent@example.com',
        password: 'wrongPassword'
      })
    });

    assert.strictEqual(res.status, 401);
  });

  test('User can fetch own portfolio via /api/v1/portfolios/me', async () => {
    const res = await fetch(`${baseUrl}/api/v1/portfolios/me`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.portfolio);
    assert.ok(data.portfolio.slug);
    userPortfolioId = data.portfolio.id;
  });

  test('Portfolio ownership enforcement: User cannot edit another user portfolio', async () => {
    // 1. Create a second user
    const res2 = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Intruder User',
        email: `intruder_${Date.now()}@example.com`,
        password: 'securePassword123'
      })
    });
    const data2 = await res2.json();
    const intruderToken = data2.token;

    // Intruder tries to modify User 1's portfolio
    const attackRes = await fetch(`${baseUrl}/api/v1/portfolios/${userPortfolioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${intruderToken}`
      },
      body: JSON.stringify({ title: 'Hacked Title' })
    });

    assert.strictEqual(attackRes.status, 403);
  });

  test('Admin CAN modify any portfolio', async () => {
    const adminRes = await fetch(`${baseUrl}/api/v1/portfolios/${userPortfolioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ title: 'Reviewed by Faculty' })
    });

    assert.strictEqual(adminRes.status, 200);
    const data = await adminRes.json();
    assert.strictEqual(data.portfolio.title, 'Reviewed by Faculty');
  });

  test('Admin routes reject regular users', async () => {
    const res = await fetch(`${baseUrl}/api/v1/admin/stats`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(res.status, 403);
  });

  test('Admin routes succeed for admin', async () => {
    const res = await fetch(`${baseUrl}/api/v1/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.stats.totalUsers >= 2);
  });
});

describe('3. Public Portfolios & Publishing Lifecycle', () => {
  test('Abhijeet published portfolio is accessible publicly at /api/v1/portfolios/public/abhijeet-arjeet', async () => {
    const res = await fetch(`${baseUrl}/api/v1/portfolios/public/abhijeet-arjeet`);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.strictEqual(data.portfolio.slug, 'abhijeet-arjeet');
    assert.strictEqual(data.portfolio.user.name, 'Abhijeet Arjeet');
    assert.ok(data.portfolio.projects.length >= 2);
    assert.ok(data.portfolio.skills.length >= 3);
  });

  test('Draft portfolios are NOT publicly viewable by visitors', async () => {
    // Look up an unpublished draft
    const draft = await prisma.portfolio.findFirst({ where: { isPublished: false } });
    if (draft) {
      const res = await fetch(`${baseUrl}/api/v1/portfolios/public/${draft.slug}`);
      assert.strictEqual(res.status, 404);
    }
  });

  test('Public gallery returns list of published portfolios', async () => {
    const res = await fetch(`${baseUrl}/api/v1/portfolios/public/gallery`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.portfolios));
    assert.ok(data.portfolios.length >= 1);
  });
});
