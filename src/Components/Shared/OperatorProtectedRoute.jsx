import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const OperatorProtectedRoute = () => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Allow access if the role is either 'Admin' or 'Rental Agent'
    if (userRole === 'Admin' || userRole === 'Rental Agent') {
      return <Outlet />;
    } else {
      // If they are not an operator, redirect them to the home page
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default OperatorProtectedRoute;