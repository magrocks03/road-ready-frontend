import axios from 'axios';
import { updateBookingStatusApiCall, updateIssueStatusApiCall } from './OperationsService';
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
});
