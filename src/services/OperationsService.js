import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

/**
 * Updates the status of a booking. (Admin/Rental Agent)
 * @param {number} bookingId - The ID of the booking to update.
 * @param {string} statusName - The new status for the booking.
 * @returns {Promise} - The axios promise for the API call.
 */
export const updateBookingStatusApiCall = (bookingId, statusName) => {
  const url = `${API_BASE_URL}/Operations/bookings/${bookingId}/status`;
  return axios.put(url, { statusName });
};

// --- ADD THIS NEW FUNCTION ---
/**
 * Updates the status and notes of a reported issue.
 * @param {number} issueId - The ID of the issue to update.
 * @param {object} issueData - The updated data (status, adminNotes).
 * @returns {Promise} - The axios promise for the API call.
 */
export const updateIssueStatusApiCall = (issueId, issueData) => {
    const url = `${API_BASE_URL}/Operations/issues/${issueId}/status`;
    return axios.put(url, issueData);
};
