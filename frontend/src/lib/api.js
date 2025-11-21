// API base URL - uses environment variable or defaults to localhost for development
// For production, VITE_API_URL should be set to your Railway backend URL
// Example: https://academicresourcehub-production.up.railway.app
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Helper function to make API calls
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

