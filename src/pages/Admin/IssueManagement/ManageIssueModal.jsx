import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateIssueStatusApiCall } from '../../../services/OperationsService';
import { processRefundApiCall } from '../../../services/AdminService';

const ManageIssueModal = ({ isOpen, onClose, onActionSuccess, issue }) => {
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (issue) {
      setStatus(issue.status);
      setAdminNotes(issue.adminNotes || '');
      setReason('');
      setAmount('');
      setError('');
      setSuccess('');
    }
  }, [issue]);

  if (!issue) return null;

  const handleUpdateStatus = () => {
    updateIssueStatusApiCall(issue.issueId, { status, adminNotes })
      .then(() => {
        setSuccess('Status updated successfully!');
        onActionSuccess();
        setTimeout(() => onClose(), 1500);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to update status.'));
  };

  const handleProcessRefund = () => {
    if (!reason) {
      setError('A reason is required to process a refund.');
      return;
    }
    const refundData = {
      bookingId: issue.bookingId,
      reason: reason,
      amount: amount ? parseFloat(amount) : null,
    };
    processRefundApiCall(refundData)
      .then(() => {
        setSuccess('Refund processed successfully!');
        onActionSuccess();
        setTimeout(() => onClose(), 1500);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to process refund.'));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Manage Issue #{issue.issueId}</Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Update Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
                <option>Open</option>
                <option>Under Investigation</option>
                <option>Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Admin Notes</label>
              <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} className="w-full p-2 bg-background border border-border text-text-primary rounded-md" />
            </div>
            <button onClick={handleUpdateStatus} className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Update Issue</button>
          </div>
          <hr className="my-6 border-border"/>
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">Process a Refund (Optional)</h3>
            {/* --- THIS IS THE FIX --- */}
            <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for refund" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`Partial Amount (Optional, Full: $${issue.bookingTotalCost})`} className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
            <button onClick={handleProcessRefund} className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Process Refund</button>
          </div>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ManageIssueModal;
