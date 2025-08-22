import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';

const AllFiltersModal = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  // When the modal opens, sync its state with the main page's filters
  useEffect(() => {
    setFilters(initialFilters);
  }, [isOpen, initialFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">All Filters</Dialog.Title>
          
          <div className="space-y-4">
            {/* --- NEW: Model Input --- */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Model</label>
              <input 
                type="text" 
                name="model" 
                value={filters.model || ''} 
                onChange={handleInputChange} 
                placeholder="e.g., X5, Corolla"
                className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Fuel Type</label>
              <select name="fuelType" value={filters.fuelType || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary">
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Transmission</label>
              <select name="transmission" value={filters.transmission || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary">
                <option value="">Any</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Seating Capacity</label>
              <select name="seatingCapacity" value={filters.seatingCapacity || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary">
                <option value="">Any</option>
                <option value="2">2 Seats</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">
              Cancel
            </button>
            <button onClick={handleApply} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">
              Apply Filters
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AllFiltersModal;