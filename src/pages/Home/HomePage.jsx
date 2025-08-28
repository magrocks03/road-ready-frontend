import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Search, Calendar, MapPin, Car, ShieldCheck, LifeBuoy, Star, Send } from 'lucide-react';
import DateRangePickerModal from '../../Components/Home/DateRangePickerModal';
import Footer from '../../Components/Layout/Footer';
import heroBackground from '../../assets/images/hero-background.jpg';
import carRentalImage from '../../assets/images/carrental.jpg';
// --- NEW IMAGE IMPORTS ---
import chennaiImage from '../../assets/images/Chennai.jpg';
import bangaloreImage from '../../assets/images/Bangalore.jpg';
import mumbaiImage from '../../assets/images/Mumbai.jpg';
import { getAllLocationsApiCall } from '../../services/HelperService';
import { getFeaturedVehiclesApiCall } from '../../services/VehicleService';
import { updateSearchState } from '../../rxjs/SearchService';

// --- Static data for location cards (UPDATED) ---
const popularLocations = [
    { id: 1, name: 'Chennai', image: chennaiImage },
    { id: 2, name: 'Bangalore', image: bangaloreImage },
    { id: 3, name: 'Mumbai', image: mumbaiImage },
];

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState([]);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const navigate = useNavigate();

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    getAllLocationsApiCall()
      .then(res => setLocations(res.data))
      .catch(err => console.error("Failed to fetch locations:", err));

    getFeaturedVehiclesApiCall()
      .then(res => {
        if (res.data && res.data.items) {
          setFeaturedVehicles(res.data.items);
        }
      })
      .catch(err => console.error("Failed to fetch featured vehicles:", err));
  }, []);

  const handleDateSelect = (selectedRange) => {
    setDateRange(selectedRange);
  };

  const handleSearch = () => {
    updateSearchState({
      criteria: { locationId },
      dateRange: dateRange,
    });
    navigate('/vehicles');
  };

  const handleLocationSelect = (selectedLocationId) => {
    updateSearchState({
        criteria: { locationId: selectedLocationId },
        dateRange: null,
    });
    navigate('/vehicles');
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const subject = `RoadReady Inquiry from ${contactForm.name}`;
    const body = `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
    window.location.href = `mailto:mageshkannan003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
        {/* --- Hero Section --- */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
              Your <span className="relative inline-block before:absolute before:-inset-2 before:block before:bg-primary before:-skew-y-3"><span className="relative text-white">Journey</span></span> Starts Here.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
              Unbeatable prices, unlimited miles, and flexible bookings.
            </p>
            <div className="bg-card/20 backdrop-blur-lg p-6 rounded-lg shadow-2xl border border-white/20 md:flex md:items-center md:gap-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label htmlFor="location" className="block text-sm font-medium text-white text-left mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="w-5 h-5 text-text-secondary" /></div>
                  <select id="location" value={locationId} onChange={(e) => setLocationId(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    <option value="">Select a location</option>
                    {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.storeName}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white text-left mb-1">Pick-up & Return</label>
                <button onClick={() => setIsModalOpen(true)} className="w-full pl-10 pr-4 py-2 bg-background border border-border text-text-primary rounded-md shadow-sm text-left relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="w-5 h-5 text-text-secondary" /></div>
                  {dateRange ? (<span>{`${format(dateRange.from, "d MMM")} ${formatTime(dateRange.startTime)} - ${format(dateRange.to, "d MMM")} ${formatTime(dateRange.endTime)}`}</span>) : (<span className="text-text-secondary">Select your dates</span>)}
                </button>
              </div>
              <button onClick={handleSearch} className="w-full md:w-auto mt-4 md:mt-0 self-end px-6 py-2 h-[42px] font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover">Search</button>
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">How It Works</h2>
            <p className="text-text-secondary mb-12 max-w-2xl mx-auto">Renting a car has never been easier. Follow these three simple steps to get on the road.</p>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center"><div className="bg-primary/10 text-primary p-4 rounded-full mb-4"><Search size={32} /></div><h3 className="text-xl font-bold text-text-primary mb-2">1. Choose & Book</h3><p className="text-text-secondary">Browse our wide selection of vehicles and book the one that fits your needs in just a few clicks.</p></div>
              <div className="flex flex-col items-center"><div className="bg-primary/10 text-primary p-4 rounded-full mb-4"><MapPin size={32} /></div><h3 className="text-xl font-bold text-text-primary mb-2">2. Pick Up Your Car</h3><p className="text-text-secondary">Visit your selected location at the designated time. Our process is quick and hassle-free.</p></div>
              <div className="flex flex-col items-center"><div className="bg-primary/10 text-primary p-4 rounded-full mb-4"><Car size={32} /></div><h3 className="text-xl font-bold text-text-primary mb-2">3. Hit the Road</h3><p className="text-text-secondary">Enjoy your journey with a reliable and well-maintained vehicle. Your adventure awaits!</p></div>
            </div>
          </div>
        </section>
        
        {/* --- Explore by Location Section --- */}
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-semibold text-text-primary mb-12 relative text-center">
                    <span className="relative inline-block px-4 bg-background z-10">
                        RoadReady around all over India
                    </span>
                    <span className="absolute left-0 top-1/2 w-full h-px bg-border -translate-y-1/2"></span>
                </h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {popularLocations.map(location => (
                        <div key={location.id} onClick={() => handleLocationSelect(location.id)} className="relative rounded-lg overflow-hidden cursor-pointer group w-full sm:w-1/2 md:w-1/4">
                            <img src={location.image} alt={location.name} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="text-white text-xl font-bold [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]">{location.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- Why Choose Us Section --- */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">Why Choose RoadReady?</h2>
                <p className="text-text-secondary mb-8">We provide a seamless car rental experience with benefits you won't find anywhere else. Your satisfaction is our top priority.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><ShieldCheck size={24} /></div><div><h3 className="font-bold text-text-primary">All-Inclusive Pricing</h3><p className="text-text-secondary">No hidden fees. The price you see is the price you pay, including insurance and taxes.</p></div></div>
                  <div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><LifeBuoy size={24} /></div><div><h3 className="font-bold text-text-primary">24/7 Customer Support</h3><p className="text-text-secondary">Our dedicated support team is here to help you anytime, day or night.</p></div></div>
                  <div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><Car size={24} /></div><div><h3 className="font-bold text-text-primary">Wide Vehicle Selection</h3><p className="text-text-secondary">From compact cars to luxury SUVs, find the perfect vehicle for any trip.</p></div></div>
                </div>
              </div>
              <div>
                <img src={carRentalImage} alt="Happy customer with a rental car" className="rounded-lg shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* --- Featured Vehicles Section --- */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Featured Vehicles</h2>
            <p className="text-text-secondary mb-12 max-w-2xl mx-auto">Explore our most popular vehicles, perfect for any occasion.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredVehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-card rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <img src={vehicle.imageUrl || 'https://placehold.co/600x400/1e293b/f8fafc?text=No+Image'} alt={`${vehicle.name} ${vehicle.model}`} className="w-full h-56 object-cover" />
                  <div className="p-6 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">{vehicle.name}</h3>
                        <p className="text-text-secondary">{vehicle.model}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                        <Star size={14} className="fill-current" />
                        <span>{vehicle.averageRating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary mt-4">${vehicle.pricePerDay.toFixed(2)}<span className="text-sm font-normal text-text-secondary">/day</span></p>
                    <Link to={`/vehicles/${vehicle.id}`} className="mt-6 block w-full text-center bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-hover transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Contact Us Section --- */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Get in Touch</h2>
            <p className="text-text-secondary mb-12 max-w-2xl mx-auto">Have questions or need assistance? Our team is here to help. Fill out the form below and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto bg-card p-8 rounded-lg shadow-lg text-left space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input type="text" name="name" id="name" required value={contactForm.name} onChange={handleContactChange} className="w-full p-3 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                <input type="email" name="email" id="email" required value={contactForm.email} onChange={handleContactChange} className="w-full p-3 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea name="message" id="message" rows="4" required value={contactForm.message} onChange={handleContactChange} className="w-full p-3 bg-background border border-border text-text-primary rounded-md focus:ring-primary focus:border-primary"></textarea>
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default HomePage;