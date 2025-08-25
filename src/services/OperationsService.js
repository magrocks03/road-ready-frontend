import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const updateBookingStatusApiCall = (bookingId, statusName) => {
  const url = `${API_BASE_URL}/Operations/bookings/${bookingId}/status`;
  return axios.put(url, { statusName });
};

export const updateIssueStatusApiCall = (issueId, issueData) => {
    const url = `${API_BASE_URL}/Operations/issues/${issueId}/status`;
    return axios.put(url, issueData);
};

export const updateVehicleStatusApiCall = (vehicleId, statusData) => {
    const url = `${API_BASE_URL}/Operations/vehicles/${vehicleId}/status`;
    return axios.put(url, statusData);
};

/**
 * Fetches a paginated list of all bookings for an operator. (Admin/Rental Agent)
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getAllBookingsForOperatorApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Operations/bookings?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

/**
 * Fetches a paginated list of all reported issues for an operator. (Admin/Rental Agent)
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getAllIssuesForOperatorApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Operations/issues?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};
