import axios from 'axios';
import { loginApiCall, registerApiCall, forgotPasswordApiCall, resetPasswordApiCall } from './AuthService';
import { API_BASE_URL } from '../environment';

// Tell Jest to create a mock version of the axios library
jest.mock('axios');

describe('AuthService', () => {

  // After each test, clear the mock history
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for the login function
  it('should call the login API with correct parameters', async () => {
    const loginData = { email: 'test@test.com', password: 'password' };
    const expectedUrl = `${API_BASE_URL}/Auth/login`;
    axios.post.mockResolvedValue({ data: 'success' }); // Fake a successful response

    await loginApiCall(loginData);

    // Check if axios.post was called with the correct URL and data
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, loginData);
  });

  // Test case for the register function
  it('should call the register API with correct parameters', async () => {
    const registerData = { email: 'test@test.com', password: 'password' };
    const expectedUrl = `${API_BASE_URL}/Auth/register`;
    axios.post.mockResolvedValue({ data: 'success' });

    await registerApiCall(registerData);

    expect(axios.post).toHaveBeenCalledWith(expectedUrl, registerData);
  });

  // Test case for the forgot password function
  it('should call the forgot password API with correct parameters', async () => {
    const email = 'test@test.com';
    const expectedUrl = `${API_BASE_URL}/Auth/forgot-password`;
    axios.post.mockResolvedValue({ data: 'success' });

    await forgotPasswordApiCall(email);

    expect(axios.post).toHaveBeenCalledWith(expectedUrl, { email });
  });

  // Test case for the reset password function
  it('should call the reset password API with correct parameters', async () => {
    const resetData = { token: '123', newPassword: 'abc' };
    const expectedUrl = `${API_BASE_URL}/Auth/reset-password`;
    axios.post.mockResolvedValue({ data: 'success' });

    await resetPasswordApiCall(resetData);

    expect(axios.post).toHaveBeenCalledWith(expectedUrl, resetData);
  });
});