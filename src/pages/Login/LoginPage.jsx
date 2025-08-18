import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginModel } from '../../Models/LoginModel';
import { LoginErrorModel } from '../../Models/LoginErrorModel';
import { loginApiCall } from '../../services/AuthService';
import { userLogin } from '../../rxjs/UserService';

const LoginPage = () => {
  const [user, setUser] = useState(new LoginModel());
  const [errors, setErrors] = useState(new LoginErrorModel());
  const [apiError, setApiError] = useState(''); // <-- NEW: State for server error messages

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // Clear errors when the user starts typing again
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
        // <-- NEW: Set the specific error message from the backend
        console.error('Login failed:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign in to your account
        </h2>

        {/* <-- NEW: Display the API error message here */}
        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">
            {apiError}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;