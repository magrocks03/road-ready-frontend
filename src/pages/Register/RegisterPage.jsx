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
        const { token, firstName } = response.data;
        userLogin(firstName, token);
        navigate('/');
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
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          Create your account
        </h2>
        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">
            {apiError}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-text-secondary">First Name</label>
            <input name="firstName" type="text" value={user.firstName} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Last Name</label>
            <input name="lastName" type="text" value={user.lastName} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Email</label>
          <input name="email" type="email" value={user.email} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Password</label>
          <input name="password" type="password" value={user.password} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Phone Number (Optional)</label>
          <input name="phoneNumber" type="tel" value={user.phoneNumber} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-background border border-border text-text-primary rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
        </div>
        <button 
          onClick={handleRegister} 
          className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;