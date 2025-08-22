import { useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';

const BookingDetailsPage = () => {
  const location = useLocation();
  const { booking } = location.state || {}; // Get the booking object from the link state

  // If for some reason the booking data is not available, show an error
  if (!booking) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-text-secondary mt-2">Could not load booking details.</p>
        <Link to="/my-bookings" className="mt-4 inline-block text-primary hover:underline">
          Go back to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Booking Details</h1>
            <p className="text-text-secondary">Booking ID: {booking.bookingId}</p>
          </div>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${
            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
            booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {booking.status}
          </span>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md space-y-6">
          {/* Vehicle Details */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Vehicle</h2>
            <p className="text-text-secondary">{booking.vehicleName} {booking.vehicleModel}</p>
          </div>
          <hr className="border-border"/>
          {/* Rental Period */}
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
          {/* Location */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Pickup Location</h2>
            <p className="text-text-secondary">{booking.pickupLocation}</p>
          </div>
          <hr className="border-border"/>
          {/* Extras */}
          {booking.selectedExtras && booking.selectedExtras.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Selected Extras</h2>
              <ul className="list-disc list-inside text-text-secondary">
                {booking.selectedExtras.map(extra => (
                  <li key={extra.extraId}>{extra.name}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Payment Details */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Payment Summary</h2>
            <div className="flex justify-between text-text-secondary">
              <p>Total Amount Paid</p>
              <p className="font-bold text-lg text-primary">${booking.totalCost.toFixed(2)}</p>
            </div>
            <p className="text-sm text-text-secondary mt-1">Paid on {format(new Date(booking.payment.paymentDate), 'd MMM yyyy')} via {booking.payment.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;