import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateVehicleApiCall } from '../../../services/VehicleService';

const EditVehicleModal = ({ isOpen, onClose, onVehicleUpdated, vehicle }) => {
  const [updatedVehicle, setUpdatedVehicle] = useState({ pricePerDay: '', isAvailable: true, imageUrl: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (vehicle) {
      setUpdatedVehicle({
        pricePerDay: vehicle.pricePerDay,
        isAvailable: vehicle.isAvailable,
        imageUrl: vehicle.imageUrl || '',
      });
    }
  }, [vehicle]);

  if (!vehicle) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedVehicle(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdateVehicle = () => {
    setError('');
    const payload = {
      ...updatedVehicle,
      pricePerDay: parseFloat(updatedVehicle.pricePerDay),
    };

    updateVehicleApiCall(vehicle.id, payload)
      .then(() => {
        onVehicleUpdated();
        onClose();
      })
      .catch(err => {
        console.error("Failed to update vehicle:", err);
        setError(err.response?.data?.message || "An error occurred.");
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Edit Vehicle: {vehicle.name}</Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Price Per Day</label>
              <input type="number" name="pricePerDay" value={updatedVehicle.pricePerDay} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Image URL</label>
              <input name="imageUrl" value={updatedVehicle.imageUrl} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isAvailable" name="isAvailable" checked={updatedVehicle.isAvailable} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <label htmlFor="isAvailable" className="text-sm font-medium text-text-secondary">Is Available</label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">Cancel</button>
            <button onClick={handleUpdateVehicle} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Save Changes</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditVehicleModal;
