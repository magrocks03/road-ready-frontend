import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getMyIssuesApiCall } from '../../services/IssueService';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const MyIssuesPage = () => {
  const [page, setPage] = useState(1);
  const { data: response, isLoading, error } = useFetch(
    () => getMyIssuesApiCall(page),
    [page]
  );

  const issues = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading your issues...</p></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-text-primary mb-8">My Reported Issues</h1>
      {issues.length > 0 ? (
        <>
          <div className="space-y-6">
            {issues.map(issue => (
              <div key={issue.issueId} className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {/* --- NEW: Added Issue ID --- */}
                    <p className="text-sm font-semibold text-primary">Issue ID: {issue.issueId}</p>
                    <p className="text-sm text-text-secondary mt-1">For Booking ID: {issue.bookingId} on <span className="font-semibold text-text-primary">{issue.vehicleName}</span></p>
                    <p className="text-sm text-text-secondary">Reported on: {format(new Date(issue.reportedAt), 'd MMM yyyy')}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <p className="text-text-primary bg-background p-3 rounded-md border border-border">{issue.issueDescription}</p>
                {issue.adminNotes && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-sm font-semibold text-text-primary">Admin Notes:</p>
                    <p className="text-sm text-text-secondary italic">{issue.adminNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">Next</button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg">
          <p className="text-lg text-text-secondary">You have not reported any issues.</p>
        </div>
      )}
    </div>
  );
};

export default MyIssuesPage;