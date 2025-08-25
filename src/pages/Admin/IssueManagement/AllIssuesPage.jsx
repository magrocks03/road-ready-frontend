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
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading issues...</p></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-500">{error}</p></div>;

  return (
    <>
      <ManageIssueModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onActionSuccess={forceRefetch} 
        issue={selectedIssue} 
      />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Reported Issues</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-background text-left">
                <th className="p-4 text-sm font-semibold text-text-primary">Issue ID</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Customer</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Vehicle</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Reported On</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Status</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.length > 0 ? (
                issues.map(issue => (
                  <tr key={issue.issueId} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-text-primary font-semibold">{issue.issueId}</td>
                    <td className="p-4 text-text-secondary">{issue.customerName}</td>
                    <td className="p-4 text-text-secondary">{issue.vehicleName}</td>
                    <td className="p-4 text-text-secondary">{format(new Date(issue.reportedAt), 'd MMM yyyy')}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        issue.status === 'Resolved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleOpenModal(issue)} 
                        className="text-primary hover:underline text-sm"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-20 text-text-secondary">
                    No issues reported.
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
              className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page >= totalPages} 
              className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllIssuesPage;
