import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmBookingApiCall } from '../../services/BookingService';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, totalCost } = location.state || {}; // Get data passed from booking page

  const [paymentDetails, setPaymentDetails] = useState({
    mockCardNumber: '1234 5678 9101 1121',
    mockExpiryDate: '12/26',
    mockCvc: '123',
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingId || !totalCost) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-text-secondary mt-2">Booking details are missing. Please start the booking process again.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPayment = () => {
    setError('');
    setIsProcessing(true);

    confirmBookingApiCall(bookingId, paymentDetails)
      .then(() => {
        alert("Payment successful! Your booking is confirmed.");
        navigate('/my-bookings'); // We will create this page next
      })
      .catch(err => {
        console.error("Payment failed:", err);
        setError(err.response?.data?.message || "Payment failed. Please check your details and try again.");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-lg">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Confirm Payment</h1>
      <p className="text-text-secondary mb-8">You are about to pay <span className="font-bold text-primary">${totalCost.toFixed(2)}</span></p>

      <div className="bg-card p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary">Card Number</label>
          <input type="text" name="mockCardNumber" value={paymentDetails.mockCardNumber} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-secondary">Expiry Date</label>
            <input type="text" name="mockExpiryDate" value={paymentDetails.mockExpiryDate} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-secondary">CVC</label>
            <input type="text" name="mockCvc" value={paymentDetails.mockCvc} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
          </div>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <button 
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full mt-6 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition disabled:bg-slate-gray"
        >
          {isProcessing ? 'Processing...' : `Pay $${totalCost.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;