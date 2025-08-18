import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const loginApiCall = (loginData) => {
  const url = `${API_BASE_URL}/Auth/login`;
  return axios.post(url, loginData);
};

// --- ADD THIS NEW FUNCTION ---
export const registerApiCall = (registerData) => {
  const url = `${API_BASE_URL}/Auth/register`;
  return axios.post(url, registerData);
};