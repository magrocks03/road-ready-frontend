import axios from 'axios';
import { getMyProfileApiCall, updateMyProfileApiCall } from './ProfileService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('ProfileService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the get my profile API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Profile/me`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getMyProfileApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call the update my profile API with the correct URL and data', async () => {
    const profileData = { firstName: 'John' };
    const expectedUrl = `${API_BASE_URL}/Profile/me`;
    axios.put.mockResolvedValue({ data: 'success' });
    await updateMyProfileApiCall(profileData);
    expect(axios.put).toHaveBeenCalledWith(expectedUrl, profileData);
  });
});