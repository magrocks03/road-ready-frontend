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

// --- ADD THIS NEW FUNCTION ---
export const forgotPasswordApiCall = (email) => {
  const url = `${API_BASE_URL}/Auth/forgot-password`;
  // The backend expects an object with an 'email' property
  return axios.post(url, { email });
};

// --- ADD THIS NEW FUNCTION ---
export const resetPasswordApiCall = (resetData) => {
  const url = `${API_BASE_URL}/Auth/reset-password`;
  return axios.post(url, resetData);
};