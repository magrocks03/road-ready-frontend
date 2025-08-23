import axios from 'axios';
import { reportIssueApiCall, getMyIssuesApiCall } from './IssueService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('IssueService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the report issue API with the correct URL and data', async () => {
    const issueData = { bookingId: 1, issueDescription: 'Test issue' };
    const expectedUrl = `${API_BASE_URL}/Issues`;
    axios.post.mockResolvedValue({ data: 'success' });
    await reportIssueApiCall(issueData);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, issueData);
  });

  it('should call the get my issues API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Issues/my-issues?pageNumber=1&pageSize=5`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getMyIssuesApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});
