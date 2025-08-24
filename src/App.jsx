import { Routes, Route } from 'react-router-dom';

// Layout Components
import Layout from './Components/Shared/Layout';
import MinimalLayout from './Components/Shared/MinimalLayout';
import ProtectedRoute from './Components/Shared/ProtectedRoute';
import AdminProtectedRoute from './Components/Shared/AdminProtectedRoute';
import AdminLayout from './pages/Admin/Shared/AdminLayout';

// Page Components
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage';
import VehiclesPage from './pages/Vehicles/VehiclesPage';
import VehicleDetailPage from './pages/Vehicles/VehicleDetailPage';
import BookingPage from './pages/Booking/BookingPage';
import PaymentPage from './pages/Payment/PaymentPage';
import MyBookingsPage from './pages/MyBookings/MyBookingsPage';
import BookingDetailsPage from './pages/BookingDetails/BookingDetailsPage';
import MyProfilePage from './pages/MyProfile/MyProfilePage';
import MyIssuesPage from './pages/MyIssues/MyIssuesPage';
import AdminDashboardPage from './pages/Admin/Dashboard/AdminDashboardPage';
import UserManagementPage from './pages/Admin/UserManagement/UserManagementPage';

function App() {
  return (
    <div className="bg-background text-text-primary min-h-screen">
        <Routes>
          {/* Layout for pages without the main navbar */}
          <Route element={<MinimalLayout />}>
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Main Layout for all other pages */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="vehicles" element={<VehiclesPage />} />
            <Route path="vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="about" element={<h1>About Page</h1>} />

            {/* Protected Routes for logged-in customers */}
            <Route element={<ProtectedRoute />}>
              <Route path="booking/:id" element={<BookingPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="my-bookings" element={<MyBookingsPage />} />
              <Route path="booking-details/:id" element={<BookingDetailsPage />} />
              <Route path="my-profile" element={<MyProfilePage />} />
              <Route path="my-issues" element={<MyIssuesPage />} />
            </Route>

            {/* Protected Routes for Admins */}
            <Route path="admin" element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="users" element={<UserManagementPage />} />
                {/* Other admin pages will be added here */}
              </Route>
            </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
