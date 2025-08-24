import axios from 'axios';
import { 
  getVehicleByIdApiCall, 
  searchVehiclesApiCall,
  addVehicleApiCall,
  updateVehicleApiCall,
  deleteVehicleApiCall
} from './VehicleService';
import { API_BASE_URL } from '../environment';

jest.mock('axios');

describe('VehicleService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the get vehicle by ID API with the correct URL', async () => {
    const vehicleId = 123;
    const expectedUrl = `${API_BASE_URL}/Vehicles/${vehicleId}`;
    axios.get.mockResolvedValue({ data: 'success' });
    await getVehicleByIdApiCall(vehicleId);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call the search vehicles API with the correct URL and data', async () => {
    const criteria = { brandId: 1 };
    const expectedUrl = `${API_BASE_URL}/Vehicles/search`;
    axios.post.mockResolvedValue({ data: 'success' });
    await searchVehiclesApiCall(criteria);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, criteria);
  });

  // --- NEW TEST CASES ---
  it('should call the add vehicle API with the correct URL and data', async () => {
    const vehicleData = { name: 'Test Car' };
    const expectedUrl = `${API_BASE_URL}/Vehicles`;
    axios.post.mockResolvedValue({ data: 'success' });
    await addVehicleApiCall(vehicleData);
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, vehicleData);
  });

  it('should call the update vehicle API with the correct URL and data', async () => {
    const vehicleId = 123;
    const vehicleData = { pricePerDay: 5000 };
    const expectedUrl = `${API_BASE_URL}/Vehicles/${vehicleId}`;
    axios.put.mockResolvedValue({ data: 'success' });
    await updateVehicleApiCall(vehicleId, vehicleData);
    expect(axios.put).toHaveBeenCalledWith(expectedUrl, vehicleData);
  });

  it('should call the delete vehicle API with the correct URL', async () => {
    const vehicleId = 123;
    const expectedUrl = `${API_BASE_URL}/Vehicles/${vehicleId}`;
    axios.delete.mockResolvedValue({ data: 'success' });
    await deleteVehicleApiCall(vehicleId);
    expect(axios.delete).toHaveBeenCalledWith(expectedUrl);
  });
});