import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const getAllBrandsApiCall = () => {
  const url = `${API_BASE_URL}/brands`;
  return axios.get(url);
};

export const getAllLocationsApiCall = () => {
  const url = `${API_BASE_URL}/locations`;
  return axios.get(url);
};

// --- ADD THIS NEW FUNCTION ---
export const getAllExtrasApiCall = () => {
  const url = `${API_BASE_URL}/extras`;
  return axios.get(url);
};