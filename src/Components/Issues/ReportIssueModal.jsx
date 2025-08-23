import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { reportIssueApiCall } from '../../services/IssueService';

const ReportIssueModal = ({ isOpen, onClose, bookingId, onIssueSubmitted }) => {
  const [issueDescription, setIssueDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (issueDescription.trim().length < 10) {
      setError('Please provide a description of at least 10 characters.');
      return;
    }
    setError('');

    const issueData = { bookingId, issueDescription };

    reportIssueApiCall(issueData)
      .then(() => {
        onIssueSubmitted();
        onClose();
      })
      .catch(err => {
        console.error("Failed to submit issue:", err);
        setError(err.response?.data?.message || "An error occurred while reporting your issue.");
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Report an Issue</Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Please describe the issue</label>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows={5}
                className="w-full p-2 bg-background border border-border text-text-primary rounded-md"
                placeholder="Describe the problem you encountered with your rental..."
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">
              Submit Issue
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReportIssueModal;