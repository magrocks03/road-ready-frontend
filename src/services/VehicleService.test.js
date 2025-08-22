import axios from 'axios';
import { getAllVehiclesApiCall } from './VehicleService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('VehicleService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the get all vehicles API with the correct URL', async () => {
    const pageNumber = 1;
    const pageSize = 10;
    const expectedUrl = `${API_BASE_URL}/Vehicles?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    axios.get.mockResolvedValue({ data: 'success' });

    await getAllVehiclesApiCall(pageNumber, pageSize);

    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});