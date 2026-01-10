import api from '@/utils/api';
import {
  LoginPayload,
  LoginResponse,
  LoginErrorResponse,
  LogoutResponse
} from '../types/login-types';
import { getAuthHeaders } from '@/utils/api';

const headers = getAuthHeaders();

// Login function
export async function login(
  payload: LoginPayload
): Promise<LoginResponse | LoginErrorResponse> {
  try {
    const res = await api.post('/api/stb/api/v1/login/', payload);
    return res.data as LoginResponse | LoginErrorResponse;
  } catch (err: any) {
    if (err.response?.data) return err.response.data as LoginErrorResponse;
    return { msg: 'Login failed', error_code: -1 };
  }
}

// Logout function
export async function logout(): Promise<LogoutResponse | null> {
  try {
    const res = await api.post('/api/stb/api/v1/logout/', {}, { headers });
    return res.data as LogoutResponse;
  } catch {
    return null;
  }
}
