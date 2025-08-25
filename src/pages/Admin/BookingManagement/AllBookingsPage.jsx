import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBookingsApiCall } from '../../../services/AdminService';
import { updateBookingStatusApiCall } from '../../../services/OperationsService';
import ProcessRefundModal from './ProcessRefundModal';
import { format } from 'date-fns';

const AllBookingsPage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const forceRefetch = () => setRefetchIndex(prev => prev + 1);

  const { data: response, isLoading, error } = useFetch(
    () => getAllBookingsApiCall(page),
    [page, refetchIndex]
  );

  const bookings = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOpenRefundModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleMarkAsCompleted = (bookingId) => {
    if (window.confirm("Mark this booking as completed?")) {
      updateBookingStatusApiCall(bookingId, 'Completed')
        .then(() => {
          alert('Status updated.');
          forceRefetch();
        })
        .catch(err => alert(err.response?.data?.message || 'Failed to update status.'));
    }
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading bookings...</p></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-500">{error}</p></div>;

  return (
    <>
      <ProcessRefundModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onActionSuccess={forceRefetch} 
        booking={selectedBooking} 
      />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-text-primary mb-8">All Bookings</h1>
        <div className="bg-card p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-background">
                <th className="p-4 text-sm font-semibold text-text-primary">Booking ID</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Vehicle</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Dates</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Total Paid</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Status</th>
                <th className="p-4 text-sm font-semibold text-text-primary text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map(booking => (
                  <tr key={booking.bookingId} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-text-primary font-semibold">{booking.bookingId}</td>
                    <td className="p-4 text-text-secondary">{booking.vehicleName}</td>
                    <td className="p-4 text-text-secondary">
                      {format(new Date(booking.startDate), 'd MMM')} - {format(new Date(booking.endDate), 'd MMM yyyy')}
                    </td>
                    <td className="p-4 text-text-secondary">
                      ${booking.totalCost.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status.includes('Cancelled')
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {booking.status === 'Confirmed' && (
                        <button 
                          onClick={() => handleMarkAsCompleted(booking.bookingId)} 
                          className="text-primary hover:underline text-sm font-semibold"
                        >
                          Mark as Completed
                        </button>
                      )}
                      {booking.status === 'Cancelled - Refund Pending' && (
                        <button 
                          onClick={() => handleOpenRefundModal(booking)} 
                          className="text-green-600 hover:underline text-sm font-semibold"
                        >
                          Process Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-20 text-text-secondary">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page <= 1} 
              className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-text-primary">Page {page} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page >= totalPages} 
              className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBookingsPage;
