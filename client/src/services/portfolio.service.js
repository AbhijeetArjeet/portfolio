import { apiRequest } from './api';
import { storageService } from './storage.service';

export const portfolioService = {
  async getMyPortfolio() {
    try {
      const data = await apiRequest('/api/v1/portfolios/me');
      if (data && data.portfolio) {
        return data;
      }
    } catch {
      // Backend offline; use Local Storage
    }
    return storageService.getMyPortfolio();
  },

  async getPublicPortfolio(slug) {
    try {
      const data = await apiRequest(`/api/v1/portfolios/public/${slug}`);
      if (data && data.portfolio) {
        return data;
      }
    } catch {
      // Backend offline
    }
    return storageService.getPublicPortfolio(slug);
  },

  async getPublicGallery() {
    try {
      const data = await apiRequest('/api/v1/portfolios/public/gallery');
      if (data && data.portfolios) {
        return data;
      }
    } catch {
      // Backend offline
    }
    const all = storageService.getPortfolios();
    return { portfolios: all.filter((p) => p.isPublished) };
  },

  async updatePortfolio(id, data) {
    storageService.updatePortfolio(id, data);
    try {
      return await apiRequest(`/api/v1/portfolios/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
    } catch {
      return { portfolio: storageService.getMyPortfolio().portfolio };
    }
  },

  async publish(id) {
    storageService.publishPortfolio(id);
    try {
      return await apiRequest(`/api/v1/portfolios/${id}/publish`, { method: 'POST' });
    } catch {
      return { success: true };
    }
  },

  async unpublish(id) {
    storageService.unpublishPortfolio(id);
    try {
      return await apiRequest(`/api/v1/portfolios/${id}/unpublish`, { method: 'POST' });
    } catch {
      return { success: true };
    }
  },

  // Projects
  async addProject(portfolioId, data) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const newProj = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data,
      displayOrder: portfolio?.projects?.length || 0
    };
    const updatedProjects = [...(portfolio?.projects || []), newProj];
    storageService.updatePortfolio(portfolioId, { projects: updatedProjects });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/projects`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      return { project: newProj };
    }
  },

  async updateProject(portfolioId, projectId, data) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const updatedProjects = (portfolio?.projects || []).map((p) =>
      p.id === projectId ? { ...p, ...data } : p
    );
    storageService.updatePortfolio(portfolioId, { projects: updatedProjects });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/projects/${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
    } catch {
      return { success: true };
    }
  },

  async deleteProject(portfolioId, projectId) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const updatedProjects = (portfolio?.projects || []).filter((p) => p.id !== projectId);
    storageService.updatePortfolio(portfolioId, { projects: updatedProjects });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/projects/${projectId}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: true };
    }
  },

  // Skills
  async addSkill(portfolioId, data) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const newSkill = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data
    };
    const updatedSkills = [...(portfolio?.skills || []), newSkill];
    storageService.updatePortfolio(portfolioId, { skills: updatedSkills });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/skills`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      return { skill: newSkill };
    }
  },

  async deleteSkill(portfolioId, skillId) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const updatedSkills = (portfolio?.skills || []).filter((s) => s.id !== skillId);
    storageService.updatePortfolio(portfolioId, { skills: updatedSkills });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/skills/${skillId}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: true };
    }
  },

  // Experience
  async addExperience(portfolioId, data) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const newExp = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data
    };
    const updatedExp = [...(portfolio?.experience || []), newExp];
    storageService.updatePortfolio(portfolioId, { experience: updatedExp });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/experience`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      return { experience: newExp };
    }
  },

  async deleteExperience(portfolioId, experienceId) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const updatedExp = (portfolio?.experience || []).filter((e) => e.id !== experienceId);
    storageService.updatePortfolio(portfolioId, { experience: updatedExp });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/experience/${experienceId}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: true };
    }
  },

  // Education
  async addEducation(portfolioId, data) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const newEdu = {
      id: `edu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data
    };
    const updatedEdu = [...(portfolio?.education || []), newEdu];
    storageService.updatePortfolio(portfolioId, { education: updatedEdu });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/education`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      return { education: newEdu };
    }
  },

  async deleteEducation(portfolioId, educationId) {
    const portfolio = storageService.getMyPortfolio().portfolio;
    const updatedEdu = (portfolio?.education || []).filter((e) => e.id !== educationId);
    storageService.updatePortfolio(portfolioId, { education: updatedEdu });

    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/education/${educationId}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: true };
    }
  },

  // Report Portfolio (Abuse / Violation)
  async report(portfolioId, data) {
    try {
      return await apiRequest(`/api/v1/portfolios/${portfolioId}/report`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      storageService.addAuditLog('REPORT_SUBMITTED', 'Portfolio', portfolioId, `Abuse report submitted: ${data.reason}`);
      return { success: true };
    }
  },

  // Access & Collaboration Requests (For visiting organisations & recruiters)
  async submitAccessRequest(requestData) {
    return storageService.submitAccessRequest(requestData);
  },

  async getAccessRequests() {
    return storageService.getAccessRequests();
  },

  async updateAccessRequestStatus(requestId, status, reviewerName) {
    return storageService.updateAccessRequestStatus(requestId, status, reviewerName);
  }
};
