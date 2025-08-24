import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminProtectedRoute = () => {
  const token = sessionStorage.getItem('token');

  // 1. If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // 2. Decode the token to get user details, including the role
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Assumes the role is stored in a 'role' claim

    // 3. Check if the user's role is 'Admin'
    if (userRole === 'Admin') {
      // If they are an admin, show the requested page
      return <Outlet />;
    } else {
      // If they are not an admin, redirect them to the home page
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // 4. If the token is invalid or expired, redirect to login
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
