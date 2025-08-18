import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterModel } from '../../Models/RegisterModel';
import { RegisterErrorModel } from '../../Models/RegisterErrorModel';
import { registerApiCall } from '../../services/AuthService';
import { userLogin } from '../../rxjs/UserService';

const RegisterPage = () => {
  const [user, setUser] = useState(new RegisterModel());
  const [errors, setErrors] = useState(new RegisterErrorModel());
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setApiError('');
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    registerApiCall(user)
      .then((response) => {
        // After successful registration, log the user in automatically
        const { token, firstName } = response.data;
        userLogin(firstName, token);
        navigate('/'); // Redirect to home page
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        if (error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('An unexpected error occurred. Please try again.');
        }
      });
  };

  const validateForm = () => {
    let validationErrors = new RegisterErrorModel();
    let isValid = true;

    if (!user.firstName.trim()) {
      validationErrors.firstName = 'First name is required.';
      isValid = false;
    }
    if (!user.lastName.trim()) {
      validationErrors.lastName = 'Last name is required.';
      isValid = false;
    }
    if (!user.email.trim()) {
      validationErrors.email = 'Email is required.';
      isValid = false;
    }
    // Basic password validation (matches backend)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!user.password) {
      validationErrors.password = 'Password is required.';
      isValid = false;
    } else if (!passwordRegex.test(user.password)) {
      validationErrors.password = 'Password must be 8+ characters with uppercase, lowercase, number, and special character.';
      isValid = false;
    }
    
    setErrors(validationErrors);
    return isValid;
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create your account
        </h2>
        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">
            {apiError}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input name="firstName" type="text" value={user.firstName} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input name="lastName" type="text" value={user.lastName} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" type="email" value={user.email} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input name="password" type="password" value={user.password} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
          <input name="phoneNumber" type="tel" value={user.phoneNumber} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
        </div>
        <button onClick={handleRegister} className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;