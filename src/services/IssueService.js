import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

/**
 * Submits a new issue for a booking.
 * @param {object} issueData - The issue data (bookingId, issueDescription).
 * @returns {Promise} - The axios promise for the API call.
 */
export const reportIssueApiCall = (issueData) => {
  const url = `${API_BASE_URL}/Issues`;
  return axios.post(url, issueData);
};

/**
 * Fetches all issues for the currently authenticated user.
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getMyIssuesApiCall = (pageNumber = 1, pageSize = 5) => {
  const url = `${API_BASE_URL}/Issues/my-issues?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};
