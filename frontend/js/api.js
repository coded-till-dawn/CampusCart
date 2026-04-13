// API layer for backend communication

const API_URL = 'http://localhost:5000/api';
// File: frontend/js/api.js
const BASE_URL = 'https://campuscart-backend.replit.dev/api';

const apiCall = async (method, endpoint, data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Items API
const itemsAPI = {
  getAll: (category, sort, search) => {
    let url = '/items?';
    if (category) url += `category=${category}&`;
    if (sort) url += `sort=${sort}&`;
    if (search) url += `search=${search}`;
    return apiCall('GET', url);
  },

  getById: (id) => apiCall('GET', `/items/${id}`),

  create: (data) => apiCall('POST', '/items', data),

  update: (id, data) => apiCall('PUT', `/items/${id}`, data),

  delete: (id) => apiCall('DELETE', `/items/${id}`),

  getSimilar: (id) => apiCall('GET', `/items/${id}/similar`),
};

// Wishlist API
const wishlistAPI = {
  getAll: () => apiCall('GET', '/wishlist'),

  add: (itemId) => apiCall('POST', '/wishlist', { itemId }),

  remove: (wishlistId) => apiCall('DELETE', `/wishlist/${wishlistId}`),

  check: (itemId) => apiCall('GET', `/wishlist/check/${itemId}`),
};

// Messages API
const messagesAPI = {
  getForItem: (itemId) => apiCall('GET', `/messages/${itemId}`),

  send: (data) => apiCall('POST', '/messages', data),
};
