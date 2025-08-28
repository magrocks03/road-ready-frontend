import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const getVehicleByIdApiCall = (id) => {
  const url = `${API_BASE_URL}/Vehicles/${id}`;
  return axios.get(url);
};

export const searchVehiclesApiCall = (criteria) => {
  const url = `${API_BASE_URL}/Vehicles/search`;
  return axios.post(url, criteria);
};

// --- NEW ADMIN FUNCTIONS ---

/**
 * Adds a new vehicle to the fleet. (Admin only)
 * @param {object} vehicleData - The data for the new vehicle.
 * @returns {Promise} - The axios promise for the API call.
 */
export const addVehicleApiCall = (vehicleData) => {
  const url = `${API_BASE_URL}/Vehicles`;
  return axios.post(url, vehicleData);
};

/**
 * Updates an existing vehicle's details. (Admin only)
 * @param {number} id - The ID of the vehicle to update.
 * @param {object} vehicleData - The updated data for the vehicle.
 * @returns {Promise} - The axios promise for the API call.
 */
export const updateVehicleApiCall = (id, vehicleData) => {
  const url = `${API_BASE_URL}/Vehicles/${id}`;
  return axios.put(url, vehicleData);
};

/**
 * Deletes a vehicle from the fleet. (Admin only)
 * @param {number} id - The ID of the vehicle to delete.
 * @returns {Promise} - The axios promise for the API call.
 */
export const deleteVehicleApiCall = (id) => {
  const url = `${API_BASE_URL}/Vehicles/${id}`;
  return axios.delete(url);
};


/**
 * Fetches a list of vehicles, intended for the landing page's featured section.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getFeaturedVehiclesApiCall = () => {
  // We'll fetch the first 3 vehicles to feature on the home page.
  const url = `${API_BASE_URL}/Vehicles?pageNumber=1&pageSize=3`;
  return axios.get(url);
};