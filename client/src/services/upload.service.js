import { apiRequest } from './api';

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
