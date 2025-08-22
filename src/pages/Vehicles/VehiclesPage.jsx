import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { searchVehiclesApiCall } from '../../services/VehicleService';
import VehicleCard from '../../Components/Vehicles/VehicleCard';
import SearchFilter from '../../Components/Vehicles/SearchFilter';
import { useFetch } from '../../hooks/useFetch'; // <-- Import our new hook

const VehiclesPage = () => {
  const location = useLocation();
  const initialCriteria = location.state?.initialCriteria || {};

  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 8, totalPages: 1 });
  const [currentCriteria, setCurrentCriteria] = useState(initialCriteria);

  // --- THIS IS THE NEW DATA FETCHING LOGIC ---
  const payload = useMemo(() => ({
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
    name: currentCriteria.name || undefined,
    model: currentCriteria.model || undefined,
    brandId: currentCriteria.brandId ? parseInt(currentCriteria.brandId) : undefined,
    locationId: currentCriteria.locationId ? parseInt(currentCriteria.locationId) : undefined,
    minPrice: currentCriteria.minPrice ? parseFloat(currentCriteria.minPrice) : undefined,
    maxPrice: currentCriteria.maxPrice ? parseFloat(currentCriteria.maxPrice) : undefined,
    fuelType: currentCriteria.fuelType || undefined,
    transmission: currentCriteria.transmission || undefined,
    seatingCapacity: currentCriteria.seatingCapacity ? parseInt(currentCriteria.seatingCapacity) : undefined,
  }), [currentCriteria, pagination]);

  const { data: response, isLoading, error } = useFetch(() => searchVehiclesApiCall(payload), [payload]);
  const vehicles = response?.items || [];
  const totalPages = response?.totalPages || 1;
  // --- END OF NEW LOGIC ---

  const handleSearch = (criteria) => {
    setCurrentCriteria(criteria);
    setPagination(prev => ({ ...prev, pageNumber: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPagination(prev => ({ ...prev, pageNumber: newPage }));
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-text-primary mb-4">Explore Our Fleet</h1>
      <p className="text-text-secondary mb-8">Find the perfect vehicle for your next journey.</p>
      
      <SearchFilter onSearch={handleSearch} initialCriteria={initialCriteria} />

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
            <span>Page {pagination.pageNumber} of {totalPages}</span>
            <button onClick={() => handlePageChange(pagination.pageNumber + 1)} disabled={pagination.pageNumber >= totalPages} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Next</button>
          </div>
        </>
      ) : (
         <div className="text-center py-20"><p>No vehicles found.</p></div>
      )}
    </div>
  );
};

export default VehiclesPage;
