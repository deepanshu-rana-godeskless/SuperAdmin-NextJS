import Cookies from 'js-cookie';
import { LoginResponse } from '../types/login-types';

export function setLoginCookies(response: LoginResponse) {
  Cookies.set('access_token', response.access_token, {
    secure: true,
    sameSite: 'strict',
    expires: response.expires_in / 3600 // expires_in is in seconds
  });
  Cookies.set('user_data', JSON.stringify(response.user_data), {
    secure: true,
    sameSite: 'strict',
    expires: response.expires_in / 3600
  });
}
