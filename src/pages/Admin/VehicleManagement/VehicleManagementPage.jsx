import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { searchVehiclesApiCall, deleteVehicleApiCall } from '../../../services/VehicleService';
import AddVehicleModal from './AddVehicleModal';
import EditVehicleModal from './EditVehicleModal';

const VehicleManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const forceRefetch = () => setRefetchIndex(prev => prev + 1);

  // Fetch ALL vehicles by setting isAvailable to null
  const { data: response, isLoading, error } = useFetch(
    () => searchVehiclesApiCall({ pageNumber: page, pageSize: 10, isAvailable: null }),
    [page, refetchIndex]
  );

  const vehicles = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOpenEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const handleDeleteVehicle = (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle? This action is permanent.")) {
      deleteVehicleApiCall(vehicleId)
        .then(() => {
          alert("Vehicle deleted successfully.");
          forceRefetch();
        })
        .catch(err => {
          console.error("Failed to delete vehicle:", err);
          alert(err.response?.data?.message || "An error occurred.");
        });
    }
  };

  if (isLoading) return <p>Loading vehicles...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <AddVehicleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onVehicleAdded={forceRefetch} />
      <EditVehicleModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onVehicleUpdated={forceRefetch} vehicle={selectedVehicle} />

      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Vehicle Management</h1>
          <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-hover">
            Add Vehicle
          </button>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Name</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Brand</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Price/Day</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Status</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-text-primary font-semibold">{vehicle.name}</td>
                    <td className="p-4 text-text-secondary">{vehicle.brandName}</td>
                    <td className="p-4 text-text-secondary">${vehicle.pricePerDay}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${vehicle.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="p-4 flex gap-4">
                      <button onClick={() => handleOpenEditModal(vehicle)} className="text-primary hover:underline text-sm">Edit</button>
                      <button onClick={() => handleDeleteVehicle(vehicle.id)} className="text-red-500 hover:underline text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleManagementPage;