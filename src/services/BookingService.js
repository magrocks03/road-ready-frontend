import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

/**
 * Initiates the booking process (Step 1).
 * @param {object} bookingData - The data for the booking (vehicleId, startDate, endDate, extraIds).
 * @returns {Promise} - The axios promise for the API call.
 */
export const initiateBookingApiCall = (bookingData) => {
  const url = `${API_BASE_URL}/Bookings/initiate`;
  return axios.post(url, bookingData);
};

/**
 * Confirms the booking with payment details (Step 2).
 * @param {number} bookingId - The ID of the pending booking.
 * @param {object} paymentData - The mock payment details.
 * @returns {Promise} - The axios promise for the API call.
 */
export const confirmBookingApiCall = (bookingId, paymentData) => {
  const url = `${API_BASE_URL}/Bookings/${bookingId}/confirm-payment`;
  return axios.post(url, paymentData);
};

// --- ADD THIS NEW FUNCTION ---
/**
 * Fetches all bookings for the currently authenticated user.
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - The axios promise for the API call.
 */
export const getMyBookingsApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Bookings/my-bookings?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

