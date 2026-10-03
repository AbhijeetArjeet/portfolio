import { apiRequest } from './api';

export const portfolioService = {
  async getMyPortfolio() {
    return apiRequest('/api/v1/portfolios/me');
  },

  async getPublicPortfolio(slug) {
    return apiRequest(`/api/v1/portfolios/public/${slug}`);
  },

  async getPublicGallery() {
    return apiRequest('/api/v1/portfolios/public/gallery');
  },

  async updatePortfolio(id, data) {
    return apiRequest(`/api/v1/portfolios/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  async publish(id) {
    return apiRequest(`/api/v1/portfolios/${id}/publish`, { method: 'POST' });
  },

  async unpublish(id) {
    return apiRequest(`/api/v1/portfolios/${id}/unpublish`, { method: 'POST' });
  },

  // Projects
  async addProject(portfolioId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async updateProject(portfolioId, projectId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/projects/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  async deleteProject(portfolioId, projectId) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/projects/${projectId}`, {
      method: 'DELETE'
    });
  },

  // Skills
  async addSkill(portfolioId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/skills`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async deleteSkill(portfolioId, skillId) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/skills/${skillId}`, {
      method: 'DELETE'
    });
  },

  // Experience
  async addExperience(portfolioId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/experience`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async deleteExperience(portfolioId, experienceId) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/experience/${experienceId}`, {
      method: 'DELETE'
    });
  },

  // Education
  async addEducation(portfolioId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/education`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async deleteEducation(portfolioId, educationId) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/education/${educationId}`, {
      method: 'DELETE'
    });
  },

  // Social Links
  async addSocialLink(portfolioId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/social-links`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async deleteSocialLink(portfolioId, linkId) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/social-links/${linkId}`, {
      method: 'DELETE'
    });
  },

  // Report
  async report(portfolioId, data) {
    return apiRequest(`/api/v1/portfolios/${portfolioId}/report`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
