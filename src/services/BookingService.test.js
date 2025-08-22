import axios from 'axios';
import { initiateBookingApiCall, confirmBookingApiCall, getMyBookingsApiCall } from './BookingService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('BookingService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the initiate booking API with the correct URL and data', async () => {
    const bookingData = { vehicleId: 1 };
    const expectedUrl = `${API_BASE_URL}/Bookings/initiate`;
    axios.post.mockResolvedValue({ data: 'success' });
    await initiateBookingApiCall(bookingData);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, bookingData);
  });

  it('should call the confirm booking API with the correct URL and data', async () => {
    const bookingId = 123;
    const paymentData = { mockCardNumber: '1234' };
    const expectedUrl = `${API_BASE_URL}/Bookings/${bookingId}/confirm-payment`;
    axios.post.mockResolvedValue({ data: 'success' });
    await confirmBookingApiCall(bookingId, paymentData);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, paymentData);
  });

  // --- NEW TEST CASE ---
  it('should call the get my bookings API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Bookings/my-bookings?pageNumber=1&pageSize=10`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getMyBookingsApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});
