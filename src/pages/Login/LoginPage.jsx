import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Import Link
import { LoginModel } from '../../Models/LoginModel';
import { LoginErrorModel } from '../../Models/LoginErrorModel';
import { loginApiCall } from '../../services/AuthService';
import { userLogin } from '../../rxjs/UserService';

const LoginPage = () => {
  const [user, setUser] = useState(new LoginModel());
  const [errors, setErrors] = useState(new LoginErrorModel());
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setApiError('');
    setErrors(new LoginErrorModel());
  };

  const handleLogin = () => {
    let validationErrors = new LoginErrorModel();
    let isValid = true;
    if (!user.email) {
      validationErrors.email = 'Email is required.';
      isValid = false;
    }
    if (!user.password) {
      validationErrors.password = 'Password is required.';
      isValid = false;
    }
    setErrors(validationErrors);

    if (!isValid) return;

    loginApiCall(user)
      .then((response) => {
        const { token, firstName } = response.data;
        userLogin(firstName, token);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        if (error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          Sign in to your account
        </h2>

        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">
            {apiError}
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
            value={user.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-md shadow-sm text-text-primary focus:ring-primary focus:border-primary"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
              Password
            </label>
            {/* --- NEW LINK ADDED HERE --- */}
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-hover">
                Forgot password?
              </Link>
            </div>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-md shadow-sm text-text-primary focus:ring-primary focus:border-primary"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;