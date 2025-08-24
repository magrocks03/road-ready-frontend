import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBookingsApiCall } from '../../../services/AdminService';
import { updateBookingStatusApiCall } from '../../../services/OperationsService';
import ProcessRefundModal from './ProcessRefundModal'; // <-- Import new modal
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
    if (window.confirm("Are you sure you want to mark this booking as completed?")) {
      updateBookingStatusApiCall(bookingId, 'Completed')
        .then(() => {
          alert('Booking status updated to "Completed".');
          forceRefetch();
        })
        .catch(err => alert(err.response?.data?.message || 'Failed to update status.'));
    }
  };

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <ProcessRefundModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onActionSuccess={forceRefetch} booking={selectedBooking} />
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-8">All Bookings</h1>
        <div className="bg-card p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Booking ID</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Vehicle</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Dates</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Total Cost</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Status</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.bookingId} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-text-primary font-semibold">{booking.bookingId}</td>
                    <td className="p-4 text-text-secondary">{booking.vehicleName}</td>
                    <td className="p-4 text-text-secondary">{format(new Date(booking.startDate), 'd MMM')} - {format(new Date(booking.endDate), 'd MMM yyyy')}</td>
                    <td className="p-4 text-text-secondary">${booking.totalCost.toFixed(2)}</td>
                    <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded-full ${ booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : booking.status.includes('Cancelled') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800' }`}>{booking.status}</span></td>
                    <td className="p-4 text-center">
                      {/* --- NEW: Conditional Action Buttons --- */}
                      {booking.status === 'Confirmed' && (
                        <button onClick={() => handleMarkAsCompleted(booking.bookingId)} className="text-primary hover:underline text-sm font-semibold">
                          Mark as Completed
                        </button>
                      )}
                      {booking.status === 'Cancelled - Refund Pending' && (
                        <button onClick={() => handleOpenRefundModal(booking)} className="text-green-600 hover:underline text-sm font-semibold">
                          Process Refund
                        </button>
                      )}
                      {/* If no action is needed, this cell will be empty */}
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

export default AllBookingsPage;