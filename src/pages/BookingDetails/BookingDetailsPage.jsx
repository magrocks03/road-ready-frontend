import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AddReviewModal from '../../Components/Reviews/AddReviewModal';
import ReportIssueModal from '../../Components/Issues/ReportIssueModal';
import { cancelBookingApiCall } from '../../services/BookingService';

const BookingDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState(location.state?.booking);
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [error, setError] = useState('');

  if (!booking) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-text-secondary mt-2">Could not load booking details.</p>
        <Link to="/my-bookings" className="mt-4 inline-block text-primary hover:underline">Go back to My Bookings</Link>
      </div>
    );
  }

  // --- NEW LOGIC: Check if the booking start date is in the future ---
  const canCancelBooking = new Date(booking.startDate) > new Date();

  const handleReviewSubmitted = () => {
    alert("Thank you for your review!");
    navigate('/my-bookings');
  }

  const handleIssueSubmitted = () => {
    alert("Your issue has been reported. Our team will look into it shortly.");
    navigate('/my-issues');
  }

  const handleCancelBooking = () => {
    if (window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      setError('');
      cancelBookingApiCall(booking.bookingId)
        .then(response => {
          setBooking(response.data);
          alert("Your booking has been successfully cancelled.");
        })
        .catch(err => {
          console.error("Failed to cancel booking:", err);
          setError(err.response?.data?.message || "An error occurred while cancelling the booking.");
        });
    }
  };

  return (
    <>
      <AddReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} bookingId={booking.bookingId} onReviewSubmitted={handleReviewSubmitted} />
      <ReportIssueModal isOpen={isIssueModalOpen} onClose={() => setIsIssueModalOpen(false)} bookingId={booking.bookingId} onIssueSubmitted={handleIssueSubmitted} />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Booking Details</h1>
              <p className="text-text-secondary">Booking ID: {booking.bookingId}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${ booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800' }`}>
              {booking.status}
            </span>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md space-y-6">
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Vehicle</h2>
              <p className="text-text-secondary">{booking.vehicleName} {booking.vehicleModel}</p>
            </div>
            <hr className="border-border"/>
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Rental Period</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary">Pickup Date</p>
                  <p className="font-semibold">{format(new Date(booking.startDate), 'EEE, d MMM yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Return Date</p>
                  <p className="font-semibold">{format(new Date(booking.endDate), 'EEE, d MMM yyyy')}</p>
                </div>
              </div>
            </div>
            <hr className="border-border"/>
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Pickup Location</h2>
              <p className="text-text-secondary">{booking.pickupLocation}</p>
            </div>
            {booking.selectedExtras && booking.selectedExtras.length > 0 && (
              <>
                <hr className="border-border"/>
                <div>
                  <h2 className="text-xl font-bold text-text-primary mb-2">Selected Extras</h2>
                  <ul className="list-disc list-inside text-text-secondary space-y-1">
                    {booking.selectedExtras.map(extra => (
                      <li key={extra.extraId}>{extra.name}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <hr className="border-border"/>
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Payment Summary</h2>
              <div className="flex justify-between text-text-secondary">
                <p>Total Amount Paid</p>
                <p className="font-bold text-lg text-primary">${booking.totalCost.toFixed(2)}</p>
              </div>
              <p className="text-sm text-text-secondary mt-1">Paid on {format(new Date(booking.payment.paymentDate), 'd MMM yyyy')} via {booking.payment.paymentMethod}</p>
            </div>
            
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* --- CONDITION UPDATED HERE --- */}
              {booking.status === 'Confirmed' && canCancelBooking && (
                <button onClick={handleCancelBooking} className="px-6 py-2 font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">
                  Cancel Booking
                </button>
              )}
              {booking.status !== 'Cancelled' && (
                <button onClick={() => setIsIssueModalOpen(true)} className="px-6 py-2 font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">
                  Report an Issue
                </button>
              )}
              {booking.status === 'Completed' && (
                <button onClick={() => setIsReviewModalOpen(true)} className="px-6 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-hover">
                  Leave a Review
                </button>
              )}
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsPage;