import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const getDashboardStatsApiCall = () => {
  const url = `${API_BASE_URL}/Admin/dashboard-stats`;
  return axios.get(url);
};

export const getAllUsersApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Admin/users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

// --- NEW FUNCTIONS ADDED HERE ---

/**
 * Creates a new user with a specified role.
 * @param {object} userData - The data for the new user.
 * @returns {Promise} - The axios promise for the API call.
 */
export const createAdminUserApiCall = (userData) => {
  const url = `${API_BASE_URL}/Admin/users`;
  return axios.post(url, userData);
};

/**
 * Updates the role of a specific user.
 * @param {number} userId - The ID of the user to update.
 * @param {string} roleName - The new role for the user.
 * @returns {Promise} - The axios promise for the API call.
 */
export const updateUserRoleApiCall = (userId, roleName) => {
  const url = `${API_BASE_URL}/Admin/users/role`;
  return axios.put(url, { userId, roleName });
};

/**
 * Deactivates a user's account.
 * @param {number} userId - The ID of the user to deactivate.
 * @returns {Promise} - The axios promise for the API call.
 */
export const deactivateUserApiCall = (userId) => {
  const url = `${API_BASE_URL}/Admin/users/${userId}/deactivate`;
  return axios.put(url);
};

/**
 * Fetches a paginated list of all bookings in the system.
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getAllBookingsApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Admin/bookings?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

/**
 * Processes a refund for a booking.
 * @param {object} refundData - The data for the refund (bookingId, reason, amount).
 * @returns {Promise} - The axios promise for the API call.
 */
export const processRefundApiCall = (refundData) => {
  const url = `${API_BASE_URL}/Admin/refunds`;
  return axios.post(url, refundData);
};

// --- ADD THIS NEW FUNCTION ---
/**
 * Fetches a paginated list of all reported issues.
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getAllIssuesApiCall = (pageNumber = 1, pageSize = 10) => {
    const url = `${API_BASE_URL}/Admin/issues?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return axios.get(url);
};
