/**
 * Centralized API Client with Sanctum HttpOnly Cookie Authentication
 * SECURITY: This replaces localStorage Bearer tokens with secure HttpOnly cookies.
 * The browser automatically sends cookies with every request - no manual token handling.
 */
import axios from 'axios';

// API base URL - adjust for production
// In development, use relative path (empty) to let Vite proxy handle requests
// This solves CORS and Cookie issues with the remote backend
const API_BASE_URL = import.meta.env.DEV 
  ? '' 
  : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000');

/**
 * Configured axios instance for all API calls
 * - withCredentials: true → Browser sends HttpOnly cookies automatically
 * - No Authorization header needed → Cookie handles authentication
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: This sends cookies with every request
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor for CSRF token
 * Laravel Sanctum requires X-XSRF-TOKEN header for state-changing requests
 */
api.interceptors.request.use((config) => {
  // Get XSRF token from cookie (Laravel sets this as a readable cookie)
  const xsrfToken = getCookie('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Response interceptor for handling auth errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - session expired
    if (error.response?.status === 401) {
      // Dispatch logout event for Redux to handle
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    // Handle 419 CSRF token mismatch - refresh and retry
    if (error.response?.status === 419) {
      console.warn('CSRF token expired, refreshing...');
      // You could implement automatic retry logic here
    }
    return Promise.reject(error);
  }
);

/**
 * Helper to get cookie value by name
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

/**
 * Get CSRF cookie before login/register
 * MUST be called before any state-changing auth request
 */
export async function getCsrfCookie() {
  await api.get('/sanctum/csrf-cookie');
}

/**
 * Auth API methods
 */
export const authApi = {
  // Get CSRF cookie (call before login/register)
  getCsrfCookie,

  // Login - returns user data, cookie is set automatically
  async login(credentials) {
    await getCsrfCookie();
    const response = await api.post('/api/login', credentials);
    return response.data;
  },

  // Register new user
  async register(userData) {
    await getCsrfCookie();
    const response = await api.post('/api/register', userData);
    return response.data;
  },

  // Logout - clears the HttpOnly cookie server-side
  async logout() {
    const response = await api.post('/api/logout');
    return response.data;
  },

  // Get current authenticated user (validates session)
  async getUser() {
    const response = await api.get('/api/user');
    return response.data;
  },
};

export default api;