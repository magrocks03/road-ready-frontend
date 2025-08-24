import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { processRefundApiCall } from '../../../services/AdminService';

const ProcessRefundModal = ({ isOpen, onClose, onActionSuccess, booking }) => {
  const [reason, setReason] = useState('Customer cancelled within the eligible refund period.');
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking) {
      setReason('Customer cancelled within the eligible refund period.');
    }
  }, [booking]);

  if (!booking) return null;

  const handleProcessRefund = () => {
    if (!reason) {
      setError('A reason is required to process a refund.');
      return;
    }
    setError('');

    const refundData = {
      bookingId: booking.bookingId,
      reason: reason,
    };

    processRefundApiCall(refundData)
      .then(() => {
        onActionSuccess();
        onClose();
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to process refund.'));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Process Refund for Booking #{booking.bookingId}</Dialog.Title>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Reason for Refund</label>
              {/* --- THIS IS THE FIX --- */}
              <textarea 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                rows={3} 
                className="w-full p-2 bg-background border border-border text-text-primary rounded-md" 
              />
            </div>
            <p className="text-sm text-text-secondary">The full amount of <span className="font-bold text-text-primary">${booking.totalCost.toFixed(2)}</span> will be refunded.</p>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">Cancel</button>
            <button onClick={handleProcessRefund} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Confirm Refund</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProcessRefundModal;