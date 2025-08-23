import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getVehicleByIdApiCall } from '../../services/VehicleService';
import ReviewsList from '../../Components/Reviews/ReviewsList'; // <-- Import

const placeholderImage = 'https://placehold.co/800x600/e2e8f0/e2e8f0?text=';

const VehicleDetailPage = () => {
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { dateRange } = location.state || {};

  useEffect(() => {
    if (id) {
      getVehicleByIdApiCall(id).then(response => {
        setVehicle(response.data);
      }).catch(err => {
        console.error("Failed to fetch vehicle details:", err);
        setError("Could not find vehicle details. Please try again.");
      }).finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`, { state: { dateRange } });
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading details...</p></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-500">{error}</p></div>;
  if (!vehicle) return <div className="text-center py-20"><p>Vehicle not found.</p></div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img src={vehicle.imageUrl || placeholderImage} alt={`${vehicle.brandName} ${vehicle.name}`} className="w-full h-auto object-cover rounded-lg shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-primary">{vehicle.brandName}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mt-1">{vehicle.name} {vehicle.model}</h1>
          <p className="text-lg text-text-secondary mt-2">{vehicle.year}</p>
          <div className="mt-6 border-t border-border pt-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4 text-text-secondary">
              <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>{vehicle.transmission}</span></div>
              <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z"></path></svg><span>{vehicle.fuelType}</span></div>
              <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span>{vehicle.seatingCapacity} Seats</span></div>
            </div>
          </div>
          <div className="mt-auto pt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-secondary">Price per day</span>
              <span className="text-3xl font-bold text-primary">${vehicle.pricePerDay}</span>
            </div>
            <button onClick={handleBookNow} className="w-full lg:w-auto lg:px-12 py-3 font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* --- ADD REVIEWS SECTION HERE --- */}
      <div className="mt-12 border-t border-border pt-8">
        <ReviewsList vehicleId={id} />
      </div>
    </div>
  );
};

export default VehicleDetailPage;