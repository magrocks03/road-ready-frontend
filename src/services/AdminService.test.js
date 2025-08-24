import axios from 'axios';
import { 
  getDashboardStatsApiCall, 
  getAllUsersApiCall,
  createAdminUserApiCall,
  updateUserRoleApiCall,
  deactivateUserApiCall
} from './AdminService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('AdminService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the get dashboard stats API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Admin/dashboard-stats`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getDashboardStatsApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call the get all users API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/Admin/users?pageNumber=1&pageSize=10`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getAllUsersApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  // --- NEW TEST CASES ---
  it('should call the create user API with the correct URL and data', async () => {
    const userData = { email: 'test@test.com' };
    const expectedUrl = `${API_BASE_URL}/Admin/users`;
    axios.post.mockResolvedValue({ data: 'success' });
    await createAdminUserApiCall(userData);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, userData);
  });

  it('should call the update user role API with the correct URL and data', async () => {
    const userId = 1;
    const roleName = 'Admin';
    const expectedUrl = `${API_BASE_URL}/Admin/users/role`;
    axios.put.mockResolvedValue({ data: 'success' });
    await updateUserRoleApiCall(userId, roleName);
    expect(axios.put).toHaveBeenCalledWith(expectedUrl, { userId, roleName });
  });

  it('should call the deactivate user API with the correct URL', async () => {
    const userId = 1;
    const expectedUrl = `${API_BASE_URL}/Admin/users/${userId}/deactivate`;
    axios.put.mockResolvedValue({ data: 'success' });
    await deactivateUserApiCall(userId);
    expect(axios.put).toHaveBeenCalledWith(expectedUrl);
  });
});