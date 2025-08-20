import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordApiCall } from '../../services/AuthService';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequest = () => {
    setMessage('');
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }

    forgotPasswordApiCall(email)
      .then(() => {
        setMessage('If an account with that email exists, a password reset link has been sent.');
      })
      .catch((err) => {
        // For security, we show a generic message even on error,
        // as per the backend's design.
        console.error('Forgot password error:', err);
        setMessage('If an account with that email exists, a password reset link has been sent.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          Forgot Your Password?
        </h2>
        <p className="text-center text-text-secondary text-sm">
          No problem. Enter your email address below and we'll send you a link to reset it.
        </p>
        
        {message && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-400 rounded-md">
            {message}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-md shadow-sm text-text-primary focus:ring-primary focus:border-primary"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          onClick={handleRequest}
          className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover"
        >
          Send Reset Link
        </button>

        <div className="text-sm text-center">
            <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
              Back to Login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;