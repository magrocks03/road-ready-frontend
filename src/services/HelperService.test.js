import axios from 'axios';
import { getAllBrandsApiCall, getAllLocationsApiCall, getAllExtrasApiCall } from './HelperService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('HelperService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the get all brands API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/brands`;
    axios.get.mockResolvedValue({ data: [] });
    await getAllBrandsApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call the get all locations API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/locations`;
    axios.get.mockResolvedValue({ data: [] });
    await getAllLocationsApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call the get all extras API with the correct URL', async () => {
    const expectedUrl = `${API_BASE_URL}/extras`;
    axios.get.mockResolvedValue({ data: [] });
    await getAllExtrasApiCall();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});