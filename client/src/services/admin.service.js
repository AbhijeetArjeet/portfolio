import { apiRequest } from './api';

export const githubService = {
  async getUserProfile(username) {
    return apiRequest(`/api/v1/github/user/${encodeURIComponent(username)}`);
  },

  async getUserRepos(username) {
    return apiRequest(`/api/v1/github/repos/${encodeURIComponent(username)}`);
  }
};

export const uploadService = {
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    return apiRequest('/api/v1/uploads', {
      method: 'POST',
      body: formData
    });
  }
};

export const adminService = {
  async getStats() {
    return apiRequest('/api/v1/admin/stats');
  },

  async getUsers() {
    return apiRequest('/api/v1/admin/users');
  },

  async updateUserStatus(userId, status) {
    return apiRequest(`/api/v1/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  async getPortfolios() {
    return apiRequest('/api/v1/admin/portfolios');
  },

  async togglePublish(portfolioId, isPublished) {
    return apiRequest(`/api/v1/admin/portfolios/${portfolioId}/publish`, {
      method: 'PATCH',
      body: JSON.stringify({ isPublished })
    });
  },

  async getReports() {
    return apiRequest('/api/v1/admin/reports');
  },

  async getAuditLogs() {
    return apiRequest('/api/v1/admin/audit-logs');
  }
};

export const healthService = {
  async checkHealth() {
    return apiRequest('/api/health');
  },
  async checkReady() {
    return apiRequest('/api/health/ready');
  }
};
