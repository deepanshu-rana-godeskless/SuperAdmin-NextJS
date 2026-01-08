import api from '@/utils/api';

export async function login(credentials: { email: string; password: string }) {
  // Backend should set httpOnly cookie on success
  return api.post('/api/stb/api/v1/login/', credentials);
}

export async function logout() {
  // Backend should clear httpOnly cookie
  return api.post('/api/stb/api/v1/logout/');
}

export async function getCurrentUser() {
  // Returns user info if authenticated (checks cookie)
  return api.get('/api/stb/api/v1/me/');
}
