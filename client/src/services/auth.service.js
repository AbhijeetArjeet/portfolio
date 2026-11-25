import { apiRequest } from './api';

export const authService = {
  async register(data) {
    const res = await apiRequest('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res?.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_token', res.token);
    }
    return res;
  },

  async login(emailOrUsername, password) {
    const res = await apiRequest('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailOrUsername, password })
    });
    if (res?.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_token', res.token);
    }
    return res;
  },

  async logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    return apiRequest('/api/v1/auth/logout', { method: 'POST' });
  },

  async getMe() {
    return apiRequest('/api/v1/auth/me');
  }
};
