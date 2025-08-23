import { useState, useEffect } from 'react';
import { getAllBrandsApiCall, getAllLocationsApiCall } from '../../services/HelperService';
import AllFiltersModal from './AllFiltersModal';

const SearchFilter = ({ onSearch, initialCriteria }) => {
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize state from the initialCriteria prop
  const [criteria, setCriteria] = useState({
    name: initialCriteria.name || '',
    locationId: initialCriteria.locationId || '',
    brandId: initialCriteria.brandId || '',
    minPrice: initialCriteria.minPrice || '',
    maxPrice: initialCriteria.maxPrice || '',
    fuelType: initialCriteria.fuelType || '',
    transmission: initialCriteria.transmission || '',
    seatingCapacity: initialCriteria.seatingCapacity || '',
  });

  useEffect(() => {
    getAllBrandsApiCall().then(res => setBrands(res.data)).catch(err => console.error("Failed to fetch brands:", err));
    getAllLocationsApiCall().then(res => setLocations(res.data)).catch(err => console.error("Failed to fetch locations:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => {
    onSearch(criteria);
  };

  const handleResetClick = () => {
    const emptyCriteria = {
      name: '', locationId: '', brandId: '', minPrice: '', maxPrice: '',
      fuelType: '', transmission: '', seatingCapacity: '',
    };
    setCriteria(emptyCriteria);
    onSearch(emptyCriteria);
  }

  const handleApplyModalFilters = (modalFilters) => {
    setCriteria(prev => ({...prev, ...modalFilters}));
  }

  return (
    <>
      <AllFiltersModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyModalFilters}
        initialFilters={criteria}
      />
      <div className="bg-card p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1">Search by Name</label>
            <input type="text" name="name" value={criteria.name} onChange={handleInputChange} placeholder="e.g., Innova Crysta SUV..." className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
            <select name="locationId" value={criteria.locationId} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary">
              <option value="">All Locations</option>
              {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.storeName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Brand</label>
            <select name="brandId" value={criteria.brandId} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary">
              <option value="">All Brands</option>
              {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Min Price</label>
              <input type="number" name="minPrice" value={criteria.minPrice} onChange={handleInputChange} placeholder="Any" className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Max Price</label>
              <input type="number" name="maxPrice" value={criteria.maxPrice} onChange={handleInputChange} placeholder="Any" className="w-full p-2 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <div>
            <button onClick={() => setIsModalOpen(true)} className="w-full p-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20 transition">
              All Filters
            </button>
          </div>
          <div className="md:col-span-2 flex gap-4">
            <button onClick={handleResetClick} className="w-full px-6 py-2 font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20 transition">
              Reset
            </button>
            <button onClick={handleSearchClick} className="w-full px-6 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;