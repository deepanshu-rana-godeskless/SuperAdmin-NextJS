import Cookies from 'js-cookie';
import axios from 'axios';
import { environment } from '../environment';

const api = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true // Send httpOnly cookies
});

// List of public endpoints (no auth required)
const PUBLIC_ENDPOINTS = [
  '/api/stb/api/v1/login/',
  '/api/stb/api/v1/analytics/',
  '/api/stb/api/v1/password-reset/'
];

// Request interceptor to attach Authorization header if needed
api.interceptors.request.use((config) => {
  // If endpoint is public, do not attach Authorization header
  if (PUBLIC_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint))) {
    return config;
  }
  // JWT is in httpOnly cookie, so no need to attach manually
  // If you ever need to attach a token, you can do it here
  return config;
});

// Returns Authorization header with Bearer token if access_token exists
export function getAuthHeaders(): { Authorization?: string } {
  const accessToken = Cookies.get('access_token');
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export default api;
