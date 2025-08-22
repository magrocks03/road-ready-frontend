import { useState } from 'react';
import { getMyBookingsApiCall } from '../../services/BookingService';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const MyBookingsPage = () => {
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 5 });

  const { data: response, isLoading, error } = useFetch(
    () => getMyBookingsApiCall(pagination.pageNumber, pagination.pageSize),
    [pagination]
  );
  
  const bookings = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPagination(prev => ({ ...prev, pageNumber: newPage }));
    }
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading your bookings...</p></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-text-primary mb-8">My Bookings</h1>
      {bookings.length > 0 ? (
        <>
          <div className="space-y-6">
            {bookings.map(booking => (
              <Link to={`/booking-details/${booking.bookingId}`} state={{ booking }} key={booking.bookingId} className="block">
                <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-border pb-3 mb-3">
                    <div>
                      <h2 className="text-lg font-bold text-text-primary">{booking.vehicleName} {booking.vehicleModel}</h2>
                    </div>
                    <span className={`mt-2 sm:mt-0 text-xs font-bold px-3 py-1 rounded-full ${ booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800' }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><p className="text-text-secondary">Pickup</p><p className="font-semibold text-text-primary">{format(new Date(booking.startDate), 'd MMM yyyy')}</p></div>
                    <div><p className="text-text-secondary">Return</p><p className="font-semibold text-text-primary">{format(new Date(booking.endDate), 'd MMM yyyy')}</p></div>
                    <div><p className="text-text-secondary">Location</p><p className="font-semibold text-text-primary truncate">{booking.pickupLocation}</p></div>
                    <div><p className="text-text-secondary">Total Paid</p><p className="font-bold text-primary">${booking.totalCost.toFixed(2)}</p></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button onClick={() => handlePageChange(pagination.pageNumber - 1)} disabled={pagination.pageNumber <= 1} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Previous</button>
              <span>Page {pagination.pageNumber} of {totalPages}</span>
              <button onClick={() => handlePageChange(pagination.pageNumber + 1)} disabled={pagination.pageNumber >= totalPages} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Next</button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg">
          <p className="text-lg text-text-secondary">You have no bookings yet.</p>
          <Link to="/vehicles" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover">Find a Car</Link>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
