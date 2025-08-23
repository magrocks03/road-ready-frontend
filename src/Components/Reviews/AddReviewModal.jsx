import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { addReviewApiCall } from '../../services/ReviewService';

// Star component for rating input
const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => setRating(starValue)}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

const AddReviewModal = ({ isOpen, onClose, bookingId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    setError('');

    const reviewData = { bookingId, rating, comment };

    addReviewApiCall(reviewData)
      .then(() => {
        onReviewSubmitted(); // Notify parent component
        onClose();
      })
      .catch(err => {
        console.error("Failed to submit review:", err);
        setError(err.response?.data?.message || "An error occurred. You may have already reviewed this booking.");
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4 text-center">Leave a Review</Dialog.Title>
          <div className="space-y-4">
            <StarRatingInput rating={rating} setRating={setRating} />
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Comment (Optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full p-2 bg-background border border-border text-text-primary rounded-md"
                placeholder="How was your experience?"
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">
              Submit Review
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddReviewModal;