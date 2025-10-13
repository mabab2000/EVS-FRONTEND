// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    PASSWORD_RESET: `${API_BASE_URL}/auth/password-reset`,
    PASSWORD_RESET_CONFIRM: `${API_BASE_URL}/auth/password-reset-confirm`,
  },
  
  // Users
  USERS: {
    ME: `${API_BASE_URL}/users/me`,
    LIST: `${API_BASE_URL}/users`,
    DETAIL: (id: number) => `${API_BASE_URL}/users/${id}`,
    UPDATE: (id: number) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/users/${id}`,
    ACTIVATE: (id: number) => `${API_BASE_URL}/users/${id}/activate`,
    DEACTIVATE: (id: number) => `${API_BASE_URL}/users/${id}/deactivate`,
    MAKE_ADMIN: (id: number) => `${API_BASE_URL}/users/${id}/make-admin`,
  },
  
  // Visitors
  VISITORS: {
    LIST: `${API_BASE_URL}/visitors`,
    CREATE: `${API_BASE_URL}/visitors`,
    DETAIL: (id: number) => `${API_BASE_URL}/visitors/${id}`,
    UPDATE: (id: number) => `${API_BASE_URL}/visitors/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/visitors/${id}`,
  },
  
  // Visits
  VISITS: {
    LIST: `${API_BASE_URL}/visits`,
    CREATE: `${API_BASE_URL}/visits`,
    ACTIVE: `${API_BASE_URL}/visits/active`,
    DETAIL: (id: number) => `${API_BASE_URL}/visits/${id}`,
    UPDATE: (id: number) => `${API_BASE_URL}/visits/${id}`,
    CHECKOUT: (id: number) => `${API_BASE_URL}/visits/${id}/checkout`,
    LOGS: (id: number) => `${API_BASE_URL}/visits/${id}/logs`,
  },
  
  // Statistics
  STATS: `${API_BASE_URL}/stats`,
  
  // OCR Integration
  OCR: {
    SCAN_FOLDER: 'http://localhost:8000/scan-folder',
    IMAGE: (filename: string) => `http://localhost:8000/image/${encodeURIComponent(filename)}`,
  },
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,
};

// API Client Configuration
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Auth Token Management
export const AUTH_CONFIG = {
  TOKEN_KEY: 'evs_access_token',
  REFRESH_TOKEN_KEY: 'evs_refresh_token',
  USER_KEY: 'evs_user',
};

export default API_ENDPOINTS;