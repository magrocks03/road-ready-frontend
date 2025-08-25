import axios from 'axios';
import { 
  updateBookingStatusApiCall, 
  updateIssueStatusApiCall,
  updateVehicleStatusApiCall,
  getAllBookingsForOperatorApiCall,
  getAllIssuesForOperatorApiCall 
} from './OperationsService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('OperationsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the update booking status API with the correct URL and data', async () => {
    const bookingId = 1;
    const statusName = 'Completed';
    const expectedUrl = `${API_BASE_URL}/Operations/bookings/${bookingId}/status`;
    axios.put.mockResolvedValue({ data: 'success' });
    await updateBookingStatusApiCall(bookingId, statusName);
    expect(axios.put).toHaveBeenCalledWith(expectedUrl, { statusName });
  });
  
  it('should call the update issue status API with the correct URL and data', async () => {
    const issueId = 1;
    const issueData = { status: 'Resolved', adminNotes: 'Test note' };
    const expectedUrl = `${API_BASE_URL}/Operations/issues/${issueId}/status`;
    axios.put.mockResolvedValue({ data: 'success' });
    await updateIssueStatusApiCall(issueId, issueData);
    expect(axios.put).toHaveBeenCalledWith(expectedUrl, issueData);
  });

  it('should call the update vehicle status API with the correct URL and data', async () => {
    const vehicleId = 1;
    const statusData = { isAvailable: false };
    const expectedUrl = `${API_BASE_URL}/Operations/vehicles/${vehicleId}/status`;
    axios.put.mockResolvedValue({ data: 'success' });
    await updateVehicleStatusApiCall(vehicleId, statusData);
    // --- THIS IS THE FIX for the assertion error ---
    expect(axios.put).toHaveBeenCalledWith(expectedUrl, statusData);
  });

  it('should call the get all bookings for operator API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Operations/bookings?pageNumber=1&pageSize=10`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getAllBookingsForOperatorApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call the get all issues for operator API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Operations/issues?pageNumber=1&pageSize=10`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getAllIssuesForOperatorApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});