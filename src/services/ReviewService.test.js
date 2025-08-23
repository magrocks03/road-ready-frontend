import axios from 'axios';
import { getVehicleReviewsApiCall, addReviewApiCall } from './ReviewService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('ReviewService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the get vehicle reviews API with the correct URL', async () => {
    const vehicleId = 42;
    const expectedUrl = `${API_BASE_URL}/vehicles/${vehicleId}/reviews?pageNumber=1&pageSize=5`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getVehicleReviewsApiCall(vehicleId);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  // --- NEW TEST CASE ---
  it('should call the add review API with the correct URL and data', async () => {
    const reviewData = { bookingId: 1, rating: 5, comment: 'Great car!' };
    const expectedUrl = `${API_BASE_URL}/reviews`;
    axios.post.mockResolvedValue({ data: 'success' });
    await addReviewApiCall(reviewData);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, reviewData);
  });
});