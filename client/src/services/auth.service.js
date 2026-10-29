import { apiRequest } from './api';
import { storageService } from './storage.service';

export const authService = {
  async register(data) {
    try {
      // 1. Always persist in Local Storage (Criterion #3)
      const localResult = storageService.register(data);

      // 2. Also sync to backend API if available
      try {
        await apiRequest('/api/v1/auth/register', {
          method: 'POST',
          body: JSON.stringify(data)
        });
      } catch (apiErr) {
        // Backend offline or on static Vercel host - Local Storage is active
        console.info('Backend unavailable; account registered in Local Storage.');
      }

      return localResult;
    } catch (err) {
      throw err;
    }
  },

  async login(emailOrUsername, password) {
    // 1. Verify and authenticate via Local Storage
    try {
      const localResult = storageService.login(emailOrUsername, password);

      // 2. Try to sync session with backend API if online
      try {
        const apiResult = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({ emailOrUsername, password })
        });
        if (apiResult && apiResult.user) {
          storageService.setActiveUser(apiResult.user);
          return apiResult;
        }
      } catch (apiErr) {
        console.info('Backend API offline or cold-starting; using Local Storage session.');
      }

      return localResult;
    } catch (err) {
      // If local user wasn't found, try backend just in case
      try {
        const apiResult = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({ emailOrUsername, password })
        });
        if (apiResult && apiResult.user) {
          storageService.setActiveUser(apiResult.user);
          return apiResult;
        }
      } catch {
        // fall through to throw original local error
      }
      throw err;
    }
  },

  async logout() {
    storageService.logout();
    try {
      await apiRequest('/api/v1/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    return { success: true };
  },

  async getMe() {
    const localUser = storageService.getActiveUser();
    try {
      const data = await apiRequest('/api/v1/auth/me');
      if (data && data.user) {
        storageService.setActiveUser(data.user);
        return data;
      }
    } catch {
      // backend offline
    }

    if (localUser) {
      return { user: localUser };
    }
    return { user: null };
  }
};
