import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { addVehicleApiCall } from '../../../services/VehicleService';
import { getAllBrandsApiCall, getAllLocationsApiCall } from '../../../services/HelperService';

const AddVehicleModal = ({ isOpen, onClose, onVehicleAdded }) => {
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    name: '', model: '', year: '', pricePerDay: '', brandId: '', locationId: '',
    fuelType: 'Petrol', transmission: 'Automatic', seatingCapacity: '5', imageUrl: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      getAllBrandsApiCall().then(res => setBrands(res.data));
      getAllLocationsApiCall().then(res => setLocations(res.data));
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVehicle = () => {
    setError('');
    const payload = {
      ...newVehicle,
      year: parseInt(newVehicle.year),
      pricePerDay: parseFloat(newVehicle.pricePerDay),
      brandId: parseInt(newVehicle.brandId),
      locationId: parseInt(newVehicle.locationId),
      seatingCapacity: parseInt(newVehicle.seatingCapacity),
    };

    addVehicleApiCall(payload)
      .then(() => {
        onVehicleAdded();
        onClose();
      })
      .catch(err => {
        console.error("Failed to add vehicle:", err);
        setError(err.response?.data?.message || "An error occurred.");
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* --- CHANGE IS ON THIS LINE --- */}
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Add New Vehicle</Dialog.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={newVehicle.name} onChange={handleInputChange} placeholder="Vehicle Name (e.g., Innova Crysta)" className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            <input name="model" value={newVehicle.model} onChange={handleInputChange} placeholder="Model (e.g., SUV)" className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            <input type="number" name="year" value={newVehicle.year} onChange={handleInputChange} placeholder="Year" className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            <input type="number" name="pricePerDay" value={newVehicle.pricePerDay} onChange={handleInputChange} placeholder="Price Per Day" className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            <select name="brandId" value={newVehicle.brandId} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
              <option value="">Select Brand</option>
              {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
            </select>
            <select name="locationId" value={newVehicle.locationId} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
              <option value="">Select Location</option>
              {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.storeName}</option>)}
            </select>
            <select name="fuelType" value={newVehicle.fuelType} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
              <option>Petrol</option> <option>Diesel</option> <option>Electric</option>
            </select>
            <select name="transmission" value={newVehicle.transmission} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
              <option>Automatic</option> <option>Manual</option>
            </select>
            <select name="seatingCapacity" value={newVehicle.seatingCapacity} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
              <option value="2">2 Seats</option><option value="4">4 Seats</option><option value="5">5 Seats</option><option value="7">7 Seats</option>
            </select>
            <input name="imageUrl" value={newVehicle.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="w-full p-2 bg-background border border-border text-text-primary rounded-md md:col-span-2" />
            {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">Cancel</button>
            <button onClick={handleAddVehicle} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Add Vehicle</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddVehicleModal;