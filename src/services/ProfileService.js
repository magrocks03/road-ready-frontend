import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

/**
 * Fetches the profile for the currently authenticated user.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getMyProfileApiCall = () => {
  const url = `${API_BASE_URL}/Profile/me`;
  return axios.get(url);
};

/**
 * Updates the profile for the currently authenticated user.
 * @param {object} profileData - The updated profile data.
 * @returns {Promise} - The axios promise for the API call.
 */
export const updateMyProfileApiCall = (profileData) => {
  const url = `${API_BASE_URL}/Profile/me`;
  return axios.put(url, profileData);
};
