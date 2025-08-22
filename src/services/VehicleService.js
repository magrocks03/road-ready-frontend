import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const getAllVehiclesApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Vehicles?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

export const getVehicleByIdApiCall = (id) => {
  const url = `${API_BASE_URL}/Vehicles/${id}`;
  return axios.get(url);
};

// --- ADD THIS NEW FUNCTION ---
/**
 * Searches for vehicles based on a criteria object.
 * @param {object} criteria - The search criteria (matches VehicleSearchCriteriaDTO).
 * @returns {Promise} - The axios promise for the API call.
 */
export const searchVehiclesApiCall = (criteria) => {
  const url = `${API_BASE_URL}/Vehicles/search`;
  return axios.post(url, criteria);
};