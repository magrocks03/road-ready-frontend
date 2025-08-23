import axios from '../Interceptors/AuthInterceptor';
import { API_BASE_URL } from '../environment';

export const initiateBookingApiCall = (bookingData) => {
  const url = `${API_BASE_URL}/Bookings/initiate`;
  return axios.post(url, bookingData);
};

export const confirmBookingApiCall = (bookingId, paymentData) => {
  const url = `${API_BASE_URL}/Bookings/${bookingId}/confirm-payment`;
  return axios.post(url, paymentData);
};

export const getMyBookingsApiCall = (pageNumber = 1, pageSize = 10) => {
  const url = `${API_BASE_URL}/Bookings/my-bookings?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return axios.get(url);
};

// --- ADD THIS NEW FUNCTION ---
/**
 * Cancels a booking.
 * @param {number} bookingId - The ID of the booking to cancel.
 * @returns {Promise} - The axios promise for the API call.
 */
export const cancelBookingApiCall = (bookingId) => {
  const url = `${API_BASE_URL}/Bookings/${bookingId}/cancel`;
  return axios.put(url); // Note: It's a PUT request as per our API design
};