import { apiRequest } from './api';

export const githubService = {
  async getUserProfile(username) {
    return apiRequest(`/api/v1/github/user/${encodeURIComponent(username)}`);
  },

  async getUserRepos(username) {
    return apiRequest(`/api/v1/github/repos/${encodeURIComponent(username)}`);
  }
};
