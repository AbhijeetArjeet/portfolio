import { apiRequest } from './api';
import { storageService } from './storage.service';

export const githubService = {
  async getUserProfile(username) {
    try {
      return await apiRequest(`/api/v1/github/user/${encodeURIComponent(username)}`);
    } catch {
      // Fallback to direct public GitHub API
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!res.ok) throw new Error('GitHub profile not found');
      return await res.json();
    }
  },

  async getUserRepos(username) {
    try {
      return await apiRequest(`/api/v1/github/repos/${encodeURIComponent(username)}`);
    } catch {
      // Fallback to direct public GitHub API
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`);
      if (!res.ok) throw new Error('Failed to fetch repositories from GitHub');
      return await res.json();
    }
  }
};

export const uploadService = {
  async uploadImage(file) {
    // If backend is running, try server upload
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await apiRequest('/api/v1/uploads', {
        method: 'POST',
        body: formData
      });
    } catch {
      // Offline / Vercel fallback: create Base64 Data URL for instant preview
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ url: reader.result, filename: file.name });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }
};

export const adminService = {
  async getStats() {
    try {
      return await apiRequest('/api/v1/admin/stats');
    } catch {
      return storageService.getStats();
    }
  },

  async getUsers() {
    try {
      return await apiRequest('/api/v1/admin/users');
    } catch {
      return { users: storageService.getUsers() };
    }
  },

  async updateUserStatus(userId, status) {
    try {
      return await apiRequest(`/api/v1/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    } catch {
      return storageService.updateUserStatus(userId, status);
    }
  },

  async getPortfolios() {
    try {
      return await apiRequest('/api/v1/admin/portfolios');
    } catch {
      return { portfolios: storageService.getPortfolios() };
    }
  },

  async togglePublish(portfolioId, isPublished) {
    try {
      return await apiRequest(`/api/v1/admin/portfolios/${portfolioId}/publish`, {
        method: 'PATCH',
        body: JSON.stringify({ isPublished })
      });
    } catch {
      return isPublished
        ? storageService.publishPortfolio(portfolioId)
        : storageService.unpublishPortfolio(portfolioId);
    }
  },

  async getReports() {
    try {
      return await apiRequest('/api/v1/admin/reports');
    } catch {
      return { reports: [] };
    }
  },

  async getAuditLogs() {
    try {
      return await apiRequest('/api/v1/admin/audit-logs');
    } catch {
      return { logs: storageService.getAuditLogs() };
    }
  },

  // Access Requests management
  async getAccessRequests() {
    return storageService.getAccessRequests();
  },

  async updateAccessRequestStatus(requestId, status, reviewerName) {
    return storageService.updateAccessRequestStatus(requestId, status, reviewerName);
  }
};

export const healthService = {
  async checkHealth() {
    try {
      return await apiRequest('/api/health', { timeoutMs: 3000 });
    } catch (err) {
      return { status: 'offline', message: 'Local Storage mode active' };
    }
  },
  async checkReady() {
    try {
      return await apiRequest('/api/health/ready', { timeoutMs: 3000 });
    } catch (err) {
      return { status: 'offline', message: 'Local Storage mode active' };
    }
  }
};
