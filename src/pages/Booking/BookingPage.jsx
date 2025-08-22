import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleByIdApiCall } from '../../services/VehicleService';
import { getAllExtrasApiCall } from '../../services/HelperService';
import { initiateBookingApiCall } from '../../services/BookingService';
import { differenceInCalendarDays, format } from 'date-fns';
import DateRangePickerModal from '../../Components/Home/DateRangePickerModal';
import { getCurrentSearchState } from '../../rxjs/SearchService'; // <-- Import new service

const placeholderImage = 'https://placehold.co/800x600/e2e8f0/e2e8f0?text=';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialSearchState = getCurrentSearchState(); // <-- Get initial state

  const [vehicle, setVehicle] = useState(null);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState(new Set());
  const [dateRange, setDateRange] = useState(initialSearchState.dateRange); // <-- Set initial date
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInitiating, setIsInitiating] = useState(false);

  useEffect(() => {
    Promise.all([
      getVehicleByIdApiCall(id),
      getAllExtrasApiCall()
    ]).then(([vehicleRes, extrasRes]) => {
      setVehicle(vehicleRes.data);
      setExtras(extrasRes.data);
    }).catch(err => {
      console.error("Failed to load booking data:", err);
      setError("Could not load booking details. Please go back and try again.");
    }).finally(() => setIsLoading(false));
  }, [id]);

  const handleExtraChange = (extraId) => {
    setSelectedExtras(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(extraId)) newSelection.delete(extraId);
      else newSelection.add(extraId);
      return newSelection;
    });
  };

  const priceSummary = useMemo(() => {
    if (!vehicle || !dateRange?.from || !dateRange?.to) {
      return { rentalDays: 0, basePrice: 0, extrasPrice: 0, totalPrice: 0 };
    }
    const rentalDays = differenceInCalendarDays(new Date(dateRange.to), new Date(dateRange.from)) || 1;
    const basePrice = rentalDays * vehicle.pricePerDay;
    let extrasPrice = 0;
    selectedExtras.forEach(extraId => {
      const extra = extras.find(e => e.extraId === extraId);
      if (extra) {
        extrasPrice += extra.priceType === 'PerDay' ? extra.price * rentalDays : extra.price;
      }
    });
    const totalPrice = basePrice + extrasPrice;
    return { rentalDays, basePrice, extrasPrice, totalPrice };
  }, [vehicle, dateRange, selectedExtras, extras]);

  const handleInitiateBooking = () => {
    if (!dateRange?.from || !dateRange?.to) {
      setError("Please select your rental dates.");
      return;
    }
    setError('');
    setIsInitiating(true);
    const bookingData = {
      vehicleId: parseInt(id),
      startDate: dateRange.from,
      endDate: dateRange.to,
      extraIds: Array.from(selectedExtras),
    };
    initiateBookingApiCall(bookingData).then(response => {
      const { bookingId, totalCost } = response.data;
      navigate('/payment', { state: { bookingId, totalCost } });
    }).catch(err => {
      console.error("Booking initiation failed:", err);
      setError(err.response?.data?.message || "There was an error initiating your booking.");
    }).finally(() => setIsInitiating(false));
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading Booking Details...</p></div>;

  return (
    <>
      <DateRangePickerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={(range) => setDateRange(range)}
      />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Confirm Your Booking</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md flex items-center gap-6">
              <img src={vehicle?.imageUrl || placeholderImage} alt={vehicle?.name} className="w-32 h-20 object-cover rounded-md"/>
              <div>
                <p className="text-sm text-text-secondary">{vehicle?.brandName}</p>
                <h2 className="text-xl font-bold text-text-primary">{vehicle?.name} {vehicle?.model}</h2>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-text-primary mb-4">Rental Period</h3>
              <button onClick={() => setIsModalOpen(true)} className="w-full p-3 bg-background border border-border text-text-primary rounded-md text-left">
                {dateRange ? (
                  <span>{`${format(new Date(dateRange.from), "EEE, d MMM yyyy")} - ${format(new Date(dateRange.to), "EEE, d MMM yyyy")}`}</span>
                ) : (
                  <span className="text-text-secondary">Select your dates</span>
                )}
              </button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-text-primary mb-4">Optional Extras</h3>
              <div className="space-y-3">
                {extras.map(extra => (
                  <label key={extra.extraId} className="flex items-center justify-between p-3 bg-background rounded-md border border-border has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                    <div>
                      <p className="font-semibold text-text-primary">{extra.name}</p>
                      <p className="text-sm text-text-secondary">${extra.price} / {extra.priceType === 'PerDay' ? 'day' : 'trip'}</p>
                    </div>
                    <input type="checkbox" checked={selectedExtras.has(extra.extraId)} onChange={() => handleExtraChange(extra.extraId)} className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"/>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-border pb-4">Price Summary</h3>
              <div className="space-y-3 text-text-secondary">
                <div className="flex justify-between"><p>${vehicle?.pricePerDay} x {priceSummary.rentalDays} days</p><p>${priceSummary.basePrice.toFixed(2)}</p></div>
                <div className="flex justify-between"><p>Extras</p><p>${priceSummary.extrasPrice.toFixed(2)}</p></div>
                <hr className="border-border"/>
                <div className="flex justify-between font-bold text-text-primary text-lg"><p>Total Price</p><p>${priceSummary.totalPrice.toFixed(2)}</p></div>
              </div>
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              <button onClick={handleInitiateBooking} disabled={isInitiating} className="w-full mt-6 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition disabled:bg-slate-gray">
                {isInitiating ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
