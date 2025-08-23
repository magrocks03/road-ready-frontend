import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

/**
 * Fetches all reviews for a specific vehicle.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getVehicleReviewsApiCall = (vehicleId, pageNumber = 1, pageSize = 5) => {
  const url = `${API_BASE_URL}/vehicles/${vehicleId}/reviews?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

/**
 * Submits a new review for a booking.
 * @param {object} reviewData - The review data (bookingId, rating, comment).
 * @returns {Promise} - The axios promise for the API call.
 */
export const addReviewApiCall = (reviewData) => {
  const url = `${API_BASE_URL}/reviews`;
  return axios.post(url, reviewData);
};
