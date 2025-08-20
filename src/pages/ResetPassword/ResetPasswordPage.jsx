import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPasswordApiCall } from '../../services/AuthService';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // On component load, get the token from the URL query parameter
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('No reset token found. Please request a new link.');
    }
  }, [searchParams]);

  const handleReset = () => {
    setError('');
    setMessage('');

    // --- Validation ---
    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be 8+ characters with uppercase, lowercase, number, and special character.');
      return;
    }
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    const resetData = { token, newPassword };

    resetPasswordApiCall(resetData)
      .then(() => {
        setMessage('Your password has been reset successfully! You can now log in.');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect to login after 3 seconds
      })
      .catch((err) => {
        console.error('Reset password error:', err);
        setError(err.response?.data?.message || 'Failed to reset password. The link may have expired.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          Reset Your Password
        </h2>

        {message && <div className="p-3 text-sm text-green-800 bg-green-100 rounded-md">{message}</div>}
        {error && <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-text-secondary">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-md text-text-primary focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-md text-text-primary focus:ring-primary focus:border-primary"
          />
        </div>
        
        <button
          onClick={handleReset}
          disabled={!token}
          className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover disabled:bg-slate-gray disabled:cursor-not-allowed"
        >
          Reset Password
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

export default ResetPasswordPage;