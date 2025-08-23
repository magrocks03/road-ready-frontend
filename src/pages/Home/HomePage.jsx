import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DateRangePickerModal from '../../Components/Home/DateRangePickerModal';
import heroBackground from '../../assets/images/hero-background.jpg';
import { getAllLocationsApiCall } from '../../services/HelperService';
import { updateSearchState } from '../../rxjs/SearchService';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLocationsApiCall()
      .then(res => setLocations(res.data))
      .catch(err => console.error("Failed to fetch locations:", err));
  }, []);

  const handleDateSelect = (selectedRange) => {
    setDateRange(selectedRange);
  };

  const handleSearch = () => {
    // Update the global search state with all criteria
    updateSearchState({
      criteria: { locationId },
      dateRange: dateRange,
    });
    navigate('/vehicles');
  };

  const formatTime = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour} ${period}`;
  };

  return (
    <>
      <DateRangePickerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleDateSelect}
      />
      <div>
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
              Your{' '}
              <span className="relative inline-block before:absolute before:-inset-2 before:block before:bg-primary before:-skew-y-3">
                <span className="relative text-white">Journey</span>
              </span>
              {' '}Starts Here.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
              Unbeatable prices, unlimited miles, and flexible bookings.
            </p>
            <div className="bg-card/20 backdrop-blur-lg p-6 rounded-lg shadow-2xl border border-white/20 md:flex md:items-center md:gap-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label htmlFor="location" className="block text-sm font-medium text-white text-left mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <select id="location" value={locationId} onChange={(e) => setLocationId(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    <option value="">Select a location</option>
                    {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.storeName}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white text-left mb-1">Pick-up & Return</label>
                <button onClick={() => setIsModalOpen(true)} className="w-full pl-10 pr-4 py-2 bg-background border border-border text-text-primary rounded-md shadow-sm text-left relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  {dateRange ? (
                    <span>{`${format(dateRange.from, "d MMM")} ${formatTime(dateRange.startTime)} - ${format(dateRange.to, "d MMM")} ${formatTime(dateRange.endTime)}`}</span>
                  ) : (
                    <span className="text-text-secondary">Select your dates</span>
                  )}
                </button>
              </div>
              <button onClick={handleSearch} className="w-full md:w-auto mt-4 md:mt-0 self-end px-6 py-2 h-[42px] font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover">
                Search
              </button>
            </div>
          </div>
        </section>
        <section className="py-20">
          <h2 className="text-center text-3xl font-bold text-text-primary">How It Works</h2>
        </section>
      </div>
    </>
  );
};

export default HomePage;