import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateIssueStatusApiCall } from '../../../services/OperationsService';
import { processRefundApiCall } from '../../../services/AdminService';
import { updateVehicleStatusApiCall } from '../../../services/OperationsService'; // Import vehicle status service
import { user$ } from '../../../rxjs/UserService'; // Import user service to check role

const ManageIssueModal = ({ isOpen, onClose, onActionSuccess, issue }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [isVehicleAvailable, setIsVehicleAvailable] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Subscribe to get the current user's role
    const subscription = user$.subscribe(setCurrentUser);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (issue) {
      setStatus(issue.status);
      setAdminNotes(issue.adminNotes || '');
      // We would ideally fetch the vehicle's current status, but for now we assume it's available
      setIsVehicleAvailable(true); 
      setError('');
      setSuccess('');
    }
  }, [issue]);

  if (!issue) return null;

  const handleUpdate = () => {
    // Combine both status updates into one action
    const issueUpdatePromise = updateIssueStatusApiCall(issue.issueId, { status, adminNotes });
    const vehicleUpdatePromise = updateVehicleStatusApiCall(issue.vehicleId, { isAvailable: isVehicleAvailable });

    Promise.all([issueUpdatePromise, vehicleUpdatePromise])
      .then(() => {
        setSuccess('Issue and vehicle status updated successfully!');
        onActionSuccess();
        setTimeout(() => onClose(), 1500);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to update status.'));
  };

  const handleProcessRefund = () => {
    // --- FIX: Add frontend validation to match backend rules ---
    if (!reason || reason.trim().length < 10) {
      setError('A detailed reason (minimum 10 characters) is required to process a refund.');
      return;
    }

    const refundData = {
      bookingId: parseInt(issue.bookingId, 10), 
      reason: reason,
      amount: amount ? parseFloat(amount) : null,
    };

    console.log('Sending Refund Data:', refundData);

    processRefundApiCall(refundData)
      .then(() => {
        setSuccess('Refund processed successfully!');
        onActionSuccess();
        setTimeout(() => onClose(), 1500);
      })
      .catch(err => {
        console.error('Full Refund API Error Response:', err.response); 
        console.error('Backend Validation Error:', err.response?.data);
        const detailedError = err.response?.data?.message || JSON.stringify(err.response?.data);
        setError(detailedError || 'Failed to process refund.');
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Manage Issue #{issue.issueId}</Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Update Issue Status</label>
              {/* Updated styling from second code */}
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 bg-background border border-border rounded-md text-text-primary">
                <option>Open</option><option>Under Investigation</option><option>Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Admin Notes</label>
              {/* Updated styling from second code */}
              <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} className="w-full p-2 bg-background border border-border rounded-md text-text-primary" />
            </div>
            {/* --- NEW: Vehicle Status Checkbox --- */}
            <div className="flex items-center gap-2">
                <input type="checkbox" id="isAvailable" checked={isVehicleAvailable} onChange={(e) => setIsVehicleAvailable(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="isAvailable" className="text-sm font-medium text-text-secondary">Mark Vehicle as Available</label>
            </div>
            <button onClick={handleUpdate} className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Update Issue</button>
          </div>

          {/* --- NEW: Conditional Refund Section --- */}
          {currentUser?.role === 'Admin' && (
            <>
              <hr className="my-6 border-border"/>
              <div className="space-y-4">
                <h3 className="font-semibold text-text-primary">Process a Refund (Optional)</h3>
                <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for refund" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`Partial Amount (Optional)`} className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
                <button onClick={handleProcessRefund} className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Process Refund</button>
              </div>
            </>
          )}

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ManageIssueModal;
