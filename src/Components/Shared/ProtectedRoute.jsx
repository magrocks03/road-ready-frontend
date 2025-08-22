import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for the user token in session storage
  const token = sessionStorage.getItem('token');

  // If a token exists, allow access to the nested routes (using Outlet)
  // Otherwise, redirect the user to the /login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
