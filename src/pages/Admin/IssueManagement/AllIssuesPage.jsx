import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getAllIssuesApiCall } from '../../../services/AdminService';
import ManageIssueModal from './ManageIssueModal';
import { format } from 'date-fns';

const AllIssuesPage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const forceRefetch = () => setRefetchIndex(prev => prev + 1);

  const { data: response, isLoading, error } = useFetch(
    () => getAllIssuesApiCall(page),
    [page, refetchIndex]
  );

  const issues = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOpenModal = (issue) => {
    // We need the booking's total cost for the refund placeholder, let's find it.
    // This is a temporary solution; ideally the API would return this.
    // For now, we'll just pass a placeholder.
    const issueWithCost = { ...issue, bookingTotalCost: 'N/A' };
    setSelectedIssue(issueWithCost);
    setIsModalOpen(true);
  };

  if (isLoading) return <p>Loading issues...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <ManageIssueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onActionSuccess={forceRefetch} issue={selectedIssue} />
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-8">Reported Issues</h1>
        <div className="bg-card p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Issue ID</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Customer</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Vehicle</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Reported On</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Status</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => (
                  <tr key={issue.issueId} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-text-primary font-semibold">{issue.issueId}</td>
                    <td className="p-4 text-text-secondary">{issue.customerName}</td>
                    <td className="p-4 text-text-secondary">{issue.vehicleName}</td>
                    <td className="p-4 text-text-secondary">{format(new Date(issue.reportedAt), 'd MMM yyyy')}</td>
                    <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded-full ${ issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }`}>{issue.status}</span></td>
                    <td className="p-4"><button onClick={() => handleOpenModal(issue)} className="text-primary hover:underline text-sm">Manage</button></td>
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

export default AllIssuesPage;