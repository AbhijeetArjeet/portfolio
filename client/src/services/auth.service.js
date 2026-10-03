import { apiRequest } from './api';

export const authService = {
  async register(data) {
    return apiRequest('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async login(emailOrUsername, password) {
    return apiRequest('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailOrUsername, password })
    });
  },

  async logout() {
    return apiRequest('/api/v1/auth/logout', { method: 'POST' });
  },

  async getMe() {
    return apiRequest('/api/v1/auth/me');
  }
};
