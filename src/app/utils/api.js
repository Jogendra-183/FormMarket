/**
 * FarmMarket API Service - Frontend Integration Layer
 * Enhanced with retry logic, connection status, and better error handling
 * 
 * Usage in components:
 *   import { api, authApi, productApi, orderApi, cartApi, apiConfig } from './api';
 */

// =====================
// API Configuration
// =====================
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
  retryAttempts: 2,
  retryDelay: 1000,
};

// Connection status tracking
let isOnline = true;
let lastConnectionCheck = 0;
const CONNECTION_CHECK_INTERVAL = 30000; // 30 seconds

export const apiConfig = {
  get isOnline() { return isOnline; },
  get baseUrl() { return API_CONFIG.baseUrl; },
  setBaseUrl: (url) => { API_CONFIG.baseUrl = url; },
};

// =====================
// Token Helper
// =====================
const getToken = () => {
  try {
    const user = localStorage.getItem('farmMarketUser');
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.token || localStorage.getItem('farmMarketToken');
    }
    return localStorage.getItem('farmMarketToken');
  } catch (e) {
    return localStorage.getItem('farmMarketToken');
  }
};

// =====================
// Connection Check
// =====================
const checkConnection = async () => {
  const now = Date.now();
  if (now - lastConnectionCheck < CONNECTION_CHECK_INTERVAL) {
    return isOnline;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    await fetch(`${API_CONFIG.baseUrl}/health`, { 
      method: 'HEAD',
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    isOnline = true;
  } catch {
    isOnline = false;
  }
  
  lastConnectionCheck = now;
  return isOnline;
};

// =====================
// Retry Logic
// =====================
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options, retries = API_CONFIG.retryAttempts) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (retries > 0 && (error.name === 'AbortError' || error.message.includes('fetch'))) {
      await sleep(API_CONFIG.retryDelay);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

// =====================
// Core Fetch Wrapper
// =====================
const request = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetchWithRetry(`${API_CONFIG.baseUrl}${endpoint}`, config);
    const text = await response.text();
    
    // Update connection status on successful response
    isOnline = true;
    lastConnectionCheck = Date.now();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }
      return text;
    }

    if (!response.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data.data ?? data;
  } catch (error) {
    // Update connection status on network errors
    if (error.name === 'AbortError' || error.message.includes('fetch') || error.message.includes('network')) {
      isOnline = false;
    }
    throw error;
  }
};

// =====================
// Auth API
// =====================
export const authApi = {
  login: (email, password, role) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role: role.toUpperCase() }),
    }),

  register: (name, email, password, role) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role: role.toUpperCase() }),
    }),

  getMe: () => request('/auth/me'),
};

// =====================
// Products API
// =====================
export const productApi = {
  // Public
  getAll: (page = 0, size = 12, sort = 'newest') =>
    request(`/products?page=${page}&size=${size}&sort=${sort}`),

  search: (keyword, category = 'all', page = 0) =>
    request(`/products/search?keyword=${keyword}&category=${category}&page=${page}`),

  getById: (id) => request(`/products/${id}`),

  getTopRated: (limit = 3) => request(`/products/top-rated?limit=${limit}`),

  // Farmer
  getFarmerProducts: () => request('/farmer/products'),

  create: (productData) =>
    request('/farmer/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  update: (id, productData) =>
    request(`/farmer/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),

  delete: (id) =>
    request(`/farmer/products/${id}`, { method: 'DELETE' }),

  getLowStock: () => request('/farmer/products/low-stock'),
};

// =====================
// Cart API
// =====================
export const cartApi = {
  getCart: () => request('/buyer/cart'),

  addItem: (productId, quantity = 1) =>
    request(`/buyer/cart?productId=${productId}&quantity=${quantity}`, { method: 'POST' }),

  updateItem: (cartItemId, quantity) =>
    request(`/buyer/cart/${cartItemId}?quantity=${quantity}`, { method: 'PUT' }),

  removeItem: (cartItemId) =>
    request(`/buyer/cart/${cartItemId}`, { method: 'DELETE' }),

  clearCart: () => request('/buyer/cart', { method: 'DELETE' }),
};

// =====================
// Orders API
// =====================
export const orderApi = {
  // Buyer
  placeOrder: (orderData) =>
    request('/buyer/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getBuyerOrders: () => request('/buyer/orders'),

  getOrderById: (id) => request(`/buyer/orders/${id}`),

  // Farmer
  getFarmerOrders: () => request('/farmer/orders'),

  updateOrderStatus: (id, status) =>
    request(`/farmer/orders/${id}/status?status=${status}`, { method: 'PATCH' }),

  // Admin
  getAllOrders: () => request('/admin/orders'),
};

// =====================
// Subscription API
// =====================
export const subscriptionApi = {
  getMine: () => request('/buyer/subscription'),

  requestUpgrade: (upgradeData) =>
    request('/buyer/subscription/upgrade', {
      method: 'POST',
      body: JSON.stringify(upgradeData),
    }),

  cancel: () => request('/buyer/subscription/cancel', { method: 'POST' }),

  // Admin
  getPending: () => request('/admin/subscriptions/pending'),
  approve: (id) => request(`/admin/subscriptions/${id}/approve`, { method: 'POST' }),
};

// =====================
// Notifications API
// =====================
export const notificationApi = {
  getAll: () => request('/notifications'),
  getUnreadCount: () => request('/notifications/unread-count'),
  markAsRead: (id) => request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllAsRead: () => request('/notifications/read-all', { method: 'PATCH' }),
  delete: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),
};

// =====================
// User / Profile API
// =====================
export const userApi = {
  getProfile: () => request('/users/profile'),

  updateProfile: (profileData) =>
    request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  changePassword: (currentPassword, newPassword) =>
    request('/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Dashboards
  getFarmerDashboard: () => request('/farmer/dashboard'),
  getFarmerAnalytics: () => request('/farmer/analytics'),
  getBuyerDashboard: () => request('/buyer/dashboard'),

  // Admin
  getAllUsers: (page = 0) => request(`/admin/users?page=${page}`),
  toggleUserStatus: (id) => request(`/admin/users/${id}/toggle-status`, { method: 'PATCH' }),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  getAdminDashboard: () => request('/admin/dashboard'),
  getAdminAnalytics: () => request('/admin/analytics'),
};

// =====================
// Community API
// =====================
export const communityApi = {
  getPosts: (page = 0) => request(`/community/posts?page=${page}`),
  getByCategory: (category, page = 0) =>
    request(`/community/posts/category/${category}?page=${page}`),
  createPost: (postData) =>
    request('/community/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),
  likePost: (id) => request(`/community/posts/${id}/like`, { method: 'POST' }),
  deletePost: (id) => request(`/community/posts/${id}`, { method: 'DELETE' }),
};

// =====================
// Health Check
// =====================
export const healthApi = {
  check: () => checkConnection(),
  getStatus: () => ({ isOnline, lastCheck: lastConnectionCheck }),
};

export { checkConnection };
export default request;
