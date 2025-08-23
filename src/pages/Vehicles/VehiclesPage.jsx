import { useState, useEffect, useCallback } from 'react';
import { searchVehiclesApiCall } from '../../services/VehicleService';
import VehicleCard from '../../Components/Vehicles/VehicleCard';
import SearchFilter from '../../Components/Vehicles/SearchFilter';
import { getCurrentSearchState, updateSearchState } from '../../rxjs/SearchService';

const VehiclesPage = () => {
  const initialSearchState = getCurrentSearchState();

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 8, totalPages: 1 });
  const [currentCriteria, setCurrentCriteria] = useState(initialSearchState.criteria);

  const fetchVehicles = useCallback((criteria, page) => {
    setIsLoading(true);
    setError(null);
    const payload = {
      pageNumber: page,
      pageSize: pagination.pageSize,
      name: criteria.name || undefined,
      model: criteria.model || undefined,
      brandId: criteria.brandId ? parseInt(criteria.brandId) : undefined,
      locationId: criteria.locationId ? parseInt(criteria.locationId) : undefined,
      minPrice: criteria.minPrice ? parseFloat(criteria.minPrice) : undefined,
      maxPrice: criteria.maxPrice ? parseFloat(criteria.maxPrice) : undefined,
      fuelType: criteria.fuelType || undefined,
      transmission: criteria.transmission || undefined,
      seatingCapacity: criteria.seatingCapacity ? parseInt(criteria.seatingCapacity) : undefined,
    };
    searchVehiclesApiCall(payload).then(response => {
      setVehicles(response.data.items);
      setPagination(prev => ({ ...prev, pageNumber: response.data.pageNumber, totalPages: response.data.totalPages }));
    }).catch(err => {
      console.error("Failed to fetch vehicles:", err);
      setError("Sorry, we couldn't load the vehicles at this time.");
    }).finally(() => setIsLoading(false));
  }, [pagination.pageSize]);

  useEffect(() => {
    fetchVehicles(currentCriteria, pagination.pageNumber);
  }, [fetchVehicles, currentCriteria, pagination.pageNumber]);

  const handleSearch = (criteria) => {
    setCurrentCriteria(criteria);
    // Also update the global state so it's remembered everywhere
    updateSearchState({ criteria, dateRange: initialSearchState.dateRange });
    setPagination(prev => ({ ...prev, pageNumber: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, pageNumber: newPage }));
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-text-primary mb-4">Explore Our Fleet</h1>
      <p className="text-text-secondary mb-8">Find the perfect vehicle for your next journey.</p>
      <SearchFilter onSearch={handleSearch} initialCriteria={currentCriteria} />
      {isLoading ? (
        <div className="text-center py-20"><p>Loading vehicles...</p></div>
      ) : error ? (
        <div className="text-center py-20"><p className="text-red-500">{error}</p></div>
      ) : vehicles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button onClick={() => handlePageChange(pagination.pageNumber - 1)} disabled={pagination.pageNumber <= 1} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Previous</button>
            <span>Page {pagination.pageNumber} of {pagination.totalPages}</span>
            <button onClick={() => handlePageChange(pagination.pageNumber + 1)} disabled={pagination.pageNumber >= pagination.totalPages} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Next</button>
          </div>
        </>
      ) : (
         <div className="text-center py-20"><p>No vehicles found.</p></div>
      )}
    </div>
  );
};

export default VehiclesPage;
