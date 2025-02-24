const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://nexus-backend-dsecex9sf-ye-chan-lins-projects.vercel.app';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/users/login`,
  signup: `${API_BASE_URL}/api/users/signup`,
  projects: `${API_BASE_URL}/api/projects`,
  // Add other endpoints as needed
}; 