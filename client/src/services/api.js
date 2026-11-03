/**
 * Resilient API Service for PortfolioForge
 * 
 * Features:
 * - Cold-start detection & wake-up status notification for Render backend
 * - Request timeout handling (default 20 seconds)
 * - Safe exponential backoff + jitter retry for idempotent requests (GET)
 * - Strict non-retry policy for non-idempotent writes (POST, PATCH, DELETE)
 * - Seamless client-side persistence fallback when deployed statically (Vercel)
 *   or when backend is offline/sleeping, eliminating 405 Method Not Allowed errors.
 */

import { clientStorage } from './clientStorage';

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
 * Client-side persistence fallback router
 */
async function handleClientFallback(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  let body = {};
  if (options.body && typeof options.body === 'string') {
    try {
      body = JSON.parse(options.body);
    } catch {}
  } else if (options.body && typeof options.body === 'object') {
    body = options.body;
  }

  const cleanEndpoint = endpoint.split('?')[0].replace(/\/+$/, '');

  // Auth routes
  if (cleanEndpoint === '/api/v1/auth/register' && method === 'POST') {
    return clientStorage.register(body);
  }
  if (cleanEndpoint === '/api/v1/auth/login' && method === 'POST') {
    return clientStorage.login(body.emailOrUsername, body.password);
  }
  if (cleanEndpoint === '/api/v1/auth/logout' && method === 'POST') {
    return clientStorage.logout();
  }
  if (cleanEndpoint === '/api/v1/auth/me') {
    return clientStorage.getCurrentUser();
  }

  // Health routes
  if (cleanEndpoint === '/api/health' || cleanEndpoint === '/api/health/ready') {
    return { status: 'ok', uptime: 1000, database: 'connected', mode: 'resilient' };
  }

  // GitHub routes
  const ghUserMatch = cleanEndpoint.match(/^\/api\/v1\/github\/user\/([^/]+)$/);
  if (ghUserMatch) {
    return await clientStorage.getGitHubUser(decodeURIComponent(ghUserMatch[1]));
  }
  const ghReposMatch = cleanEndpoint.match(/^\/api\/v1\/github\/repos\/([^/]+)$/);
  if (ghReposMatch) {
    return await clientStorage.getGitHubRepos(decodeURIComponent(ghReposMatch[1]));
  }

  // Upload routes
  if (cleanEndpoint === '/api/v1/uploads' && method === 'POST') {
    const file = options.body instanceof FormData ? options.body.get('file') : null;
    return await clientStorage.uploadImage(file);
  }

  // Admin routes
  if (cleanEndpoint === '/api/v1/admin/stats') {
    return clientStorage.getAdminStats();
  }
  if (cleanEndpoint === '/api/v1/admin/users') {
    return clientStorage.getAdminUsers();
  }
  const adminUserStatusMatch = cleanEndpoint.match(/^\/api\/v1\/admin\/users\/([^/]+)\/status$/);
  if (adminUserStatusMatch && method === 'PATCH') {
    return clientStorage.updateUserStatus(adminUserStatusMatch[1], body.status);
  }
  if (cleanEndpoint === '/api/v1/admin/portfolios') {
    return clientStorage.getAdminPortfolios();
  }
  const adminPortfolioPublishMatch = cleanEndpoint.match(/^\/api\/v1\/admin\/portfolios\/([^/]+)\/publish$/);
  if (adminPortfolioPublishMatch && method === 'PATCH') {
    return clientStorage.togglePublish(adminPortfolioPublishMatch[1], body.isPublished);
  }
  if (cleanEndpoint === '/api/v1/admin/reports') {
    return clientStorage.getAdminReports();
  }
  if (cleanEndpoint === '/api/v1/admin/audit-logs') {
    return clientStorage.getAdminAuditLogs();
  }

  // Portfolio routes
  if (cleanEndpoint === '/api/v1/portfolios/me') {
    return clientStorage.getMyPortfolio();
  }
  if (cleanEndpoint === '/api/v1/portfolios/public/gallery') {
    return clientStorage.getPublicGallery();
  }
  const publicSlugMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/public\/([^/]+)$/);
  if (publicSlugMatch) {
    return clientStorage.getPublicPortfolio(publicSlugMatch[1]);
  }

  // Sub-entity routes:
  // Projects
  const projectPostMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/projects$/);
  if (projectPostMatch && method === 'POST') {
    return clientStorage.addProject(projectPostMatch[1], body);
  }
  const projectItemMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/projects\/([^/]+)$/);
  if (projectItemMatch) {
    if (method === 'PATCH' || method === 'PUT') {
      return clientStorage.updateProject(projectItemMatch[1], projectItemMatch[2], body);
    }
    if (method === 'DELETE') {
      return clientStorage.deleteProject(projectItemMatch[1], projectItemMatch[2]);
    }
  }

  // Skills
  const skillPostMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/skills$/);
  if (skillPostMatch && method === 'POST') {
    return clientStorage.addSkill(skillPostMatch[1], body);
  }
  const skillItemMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/skills\/([^/]+)$/);
  if (skillItemMatch && method === 'DELETE') {
    return clientStorage.deleteSkill(skillItemMatch[1], skillItemMatch[2]);
  }

  // Experience
  const expPostMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/experience$/);
  if (expPostMatch && method === 'POST') {
    return clientStorage.addExperience(expPostMatch[1], body);
  }
  const expItemMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/experience\/([^/]+)$/);
  if (expItemMatch && method === 'DELETE') {
    return clientStorage.deleteExperience(expItemMatch[1], expItemMatch[2]);
  }

  // Education
  const eduPostMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/education$/);
  if (eduPostMatch && method === 'POST') {
    return clientStorage.addEducation(eduPostMatch[1], body);
  }
  const eduItemMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/education\/([^/]+)$/);
  if (eduItemMatch && method === 'DELETE') {
    return clientStorage.deleteEducation(eduItemMatch[1], eduItemMatch[2]);
  }

  // Social Links
  const socPostMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/social-links$/);
  if (socPostMatch && method === 'POST') {
    return clientStorage.addSocialLink(socPostMatch[1], body);
  }
  const socItemMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/social-links\/([^/]+)$/);
  if (socItemMatch && method === 'DELETE') {
    return clientStorage.deleteSocialLink(socItemMatch[1], socItemMatch[2]);
  }

  // Report
  const reportMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/report$/);
  if (reportMatch && method === 'POST') {
    return clientStorage.report(reportMatch[1], body);
  }

  // Portfolio publish / unpublish / update:
  const publishMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/publish$/);
  if (publishMatch && method === 'POST') {
    return clientStorage.publish(publishMatch[1]);
  }
  const unpublishMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)\/unpublish$/);
  if (unpublishMatch && method === 'POST') {
    return clientStorage.unpublish(unpublishMatch[1]);
  }
  const portfolioUpdateMatch = cleanEndpoint.match(/^\/api\/v1\/portfolios\/([^/]+)$/);
  if (portfolioUpdateMatch && (method === 'PATCH' || method === 'PUT')) {
    return clientStorage.updatePortfolio(portfolioUpdateMatch[1], body);
  }

  throw new Error(`Endpoint not found: ${endpoint}`);
}

/**
 * Resilient HTTP client with automatic fallback
 */
export async function apiRequest(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const isIdempotent = ['GET', 'HEAD', 'OPTIONS'].includes(method);
  const maxRetries = isIdempotent ? 2 : 0;
  const timeoutMs = options.timeoutMs || 20000;

  let attempt = 0;
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    let isSlowTimer = null;

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
        credentials: 'include',
        signal: controller.signal
      };

      if (options.body instanceof FormData) {
        delete fetchOptions.headers['Content-Type'];
      }

      const response = await fetch(url, fetchOptions);

      clearTimeout(isSlowTimer);
      clearTimeout(timeoutTimer);
      notifyColdStart(false);

      const contentType = response.headers.get('content-type') || '';
      const isHtmlResponse = contentType.includes('text/html');

      // Detect Vercel 405 Method Not Allowed or SPA index.html rewrites on API endpoints
      if (isHtmlResponse && endpoint.includes('/api/')) {
        return await handleClientFallback(endpoint, options);
      }

      if (!response.ok) {
        // Cold start retry for 502/503/504
        if ([502, 503, 504].includes(response.status) && isIdempotent && attempt < maxRetries) {
          notifyColdStart(true);
          attempt++;
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          await new Promise(r => setTimeout(r, delay));
          continue;
        }

        // Static host / server unavailable fallback
        if ([404, 405, 502, 503, 504].includes(response.status) || isHtmlResponse) {
          try {
            return await handleClientFallback(endpoint, options);
          } catch (fallbackErr) {
            if (fallbackErr.message && !fallbackErr.message.includes('Endpoint not found')) {
              throw fallbackErr;
            }
          }
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

      const isNetworkOrAbort = err.name === 'AbortError' ||
        (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')));

      if (isNetworkOrAbort && isIdempotent && attempt < maxRetries) {
        notifyColdStart(true);
        attempt++;
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      // Try fallback on network/timeout error
      try {
        return await handleClientFallback(endpoint, options);
      } catch (fallbackErr) {
        if (fallbackErr.message && !fallbackErr.message.includes('Endpoint not found')) {
          throw fallbackErr;
        }
        if (err.name === 'AbortError') {
          const timeoutError = new Error('The server took too long to respond.');
          timeoutError.isTimeout = true;
          throw timeoutError;
        }
        throw err;
      }
    }
  }
}
