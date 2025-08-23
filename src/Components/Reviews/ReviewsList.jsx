import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getVehicleReviewsApiCall } from '../../services/ReviewService';
import { format } from 'date-fns';

// A small component to display star ratings
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewsList = ({ vehicleId }) => {
  const [page, setPage] = useState(1);
  const { data: response, isLoading, error } = useFetch(
    () => getVehicleReviewsApiCall(vehicleId, page),
    [vehicleId, page]
  );

  const reviews = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <p className="text-text-secondary">Loading reviews...</p>;
  if (error) return <p className="text-red-500">Could not load reviews.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-6">Customer Reviews</h2>
      {reviews.length > 0 ? (
        <>
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.reviewId} className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{review.customerFirstName}</span>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-sm text-text-secondary">{format(new Date(review.reviewDate), 'd MMM yyyy')}</span>
                </div>
                <p className="text-text-secondary">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* --- NEW: Pagination Controls --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-text-primary">
                Page {page} of {totalPages}
              </span>
              <button 
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg border border-border">
          <p className="text-text-secondary">No reviews yet for this vehicle.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
