const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;
let userToken;
let portfolioId;

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

describe('5. Portfolio Persistence, LinkedIn Integration, and Versioning Features', () => {
  test('User registers and gets initial portfolio', async () => {
    const uniqueEmail = `fullstack_${Date.now()}@example.com`;
    const regRes = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Engineer',
        email: uniqueEmail,
        password: 'Password123!'
      })
    });
    assert.strictEqual(regRes.status, 201);
    const regData = await regRes.json();
    userToken = regData.token;

    // Fetch initial portfolio
    const meRes = await fetch(`${baseUrl}/api/v1/portfolios/me`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(meRes.status, 200);
    const meData = await meRes.json();
    assert.ok(meData.portfolio);
    portfolioId = meData.portfolio.id;
  });

  test('Validates LinkedIn profile URLs and accepts valid HTTPS profile', async () => {
    // 1. Invalid non-HTTPS or fake URL should be rejected
    const badRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        linkedinUrl: 'http://notlinkedin.com/bad'
      })
    });
    assert.strictEqual(badRes.status, 400);

    // 2. Valid HTTPS LinkedIn profile URL should be accepted
    const goodRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        linkedinUrl: 'https://www.linkedin.com/in/alex-engineer-99',
        showLinkedin: true
      })
    });
    assert.strictEqual(goodRes.status, 200);
    const goodData = await goodRes.json();
    assert.strictEqual(goodData.portfolio.linkedinUrl, 'https://www.linkedin.com/in/alex-engineer-99');
    assert.strictEqual(goodData.portfolio.showLinkedin, true);
  });

  test('Multi-portfolio listing: returns all user portfolios', async () => {
    const res = await fetch(`${baseUrl}/api/v1/portfolios/my/all`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.portfolios));
    assert.ok(data.portfolios.length >= 1);
  });

  test('Duplicates a portfolio with its relations', async () => {
    // Add a project first to verify deep copy
    await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        title: 'Original Cloud System',
        description: 'Microservices edge cluster',
        technologies: 'Node.js, Docker'
      })
    });

    const dupRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/duplicate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(dupRes.status, 201);
    const dupData = await dupRes.json();
    assert.ok(dupData.portfolio.title.includes('(Copy)'));
    assert.notStrictEqual(dupData.portfolio.id, portfolioId);
    assert.strictEqual(dupData.portfolio.projects.length, 1);
    assert.strictEqual(dupData.portfolio.projects[0].title, 'Original Cloud System');
  });

  test('Version Snapshots: creates snapshot, lists versions, and restores', async () => {
    // 1. Create snapshot
    const createVerRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/versions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ name: 'Milestone 1 v1' })
    });
    assert.strictEqual(createVerRes.status, 201);
    const verData = await createVerRes.json();
    const versionId = verData.version.id;
    assert.ok(versionId);

    // 2. List versions
    const listRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/versions`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(listRes.status, 200);
    const listData = await listRes.json();
    assert.ok(listData.versions.length >= 1);

    // 3. Mutate title
    await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ title: 'Mutated Temporarily' })
    });

    // 4. Restore version snapshot
    const restoreRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/versions/${versionId}/restore`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(restoreRes.status, 200);
    const restored = await restoreRes.json();
    assert.notStrictEqual(restored.portfolio.title, 'Mutated Temporarily');
  });

  test('JSON Backup Export and Import', async () => {
    // 1. Export
    const exportRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/export`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(exportRes.status, 200);
    const backup = await exportRes.json();
    assert.strictEqual(backup.version, '1.0');
    assert.ok(backup.portfolio);

    // 2. Mutate backup title and import back
    backup.portfolio.title = 'Imported Dossier From JSON Backup';
    const importRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(backup)
    });
    assert.strictEqual(importRes.status, 200);
    const imported = await importRes.json();
    assert.strictEqual(imported.portfolio.title, 'Imported Dossier From JSON Backup');
  });

  test('Submits and retrieves access request from organisation/recruiter', async () => {
    // 1. Public submission
    const reqRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/access-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requesterName: 'Amazon Talent Partner',
        organization: 'Amazon Web Services',
        email: 'recruiter@amazon.com',
        requestedRole: 'Engineering Recruiter',
        reason: 'Evaluating distributed systems and cloud projects for SDE II opportunity.'
      })
    });
    assert.strictEqual(reqRes.status, 201);
    const reqData = await reqRes.json();
    const requestId = reqData.request.id;

    // 2. Owner retrieves access requests
    const getRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/access-requests`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.strictEqual(getRes.status, 200);
    const list = await getRes.json();
    assert.ok(list.requests.some(r => r.id === requestId));

    // 3. Owner updates status to APPROVED
    const patchRes = await fetch(`${baseUrl}/api/v1/portfolios/${portfolioId}/access-requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ status: 'APPROVED' })
    });
    assert.strictEqual(patchRes.status, 200);
    const updated = await patchRes.json();
    assert.strictEqual(updated.request.status, 'APPROVED');
  });

  test('Admin can change any user role to ADMIN or USER', async () => {
    // 1. Log in as faculty admin
    const loginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrUsername: 'Suneetha Mam',
        password: '12345'
      })
    });
    assert.strictEqual(loginRes.status, 200);
    const { token: adminToken } = await loginRes.json();

    // 2. Fetch users list
    const usersRes = await fetch(`${baseUrl}/api/v1/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(usersRes.status, 200);
    const { users } = await usersRes.json();
    const regularUser = users.find(u => u.role === 'USER');
    assert.ok(regularUser);

    // 3. Promote regular user to ADMIN
    const promoteRes = await fetch(`${baseUrl}/api/v1/admin/users/${regularUser.id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ role: 'ADMIN' })
    });
    assert.strictEqual(promoteRes.status, 200);
    const promoteData = await promoteRes.json();
    assert.strictEqual(promoteData.user.role, 'ADMIN');

    // 4. Demote back to USER
    const demoteRes = await fetch(`${baseUrl}/api/v1/admin/users/${regularUser.id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ role: 'USER' })
    });
    assert.strictEqual(demoteRes.status, 200);
    const demoteData = await demoteRes.json();
    assert.strictEqual(demoteData.user.role, 'USER');
  });
});
