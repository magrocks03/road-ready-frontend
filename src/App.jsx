import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Shared/Layout';
import MinimalLayout from './Components/Shared/MinimalLayout'; // <-- Import new layout
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home/HomePage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage';

function App() {
  return (
    <div className="bg-background text-text-primary min-h-screen">
        <Routes>
          {/* --- CHANGE IS HERE --- */}
          {/* This route group now uses the minimal layout */}
          <Route element={<MinimalLayout />}>
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Main routes with the full navbar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="vehicles" element={<h1>Vehicles Page</h1>} />
            <Route path="about" element={<h1>About Page</h1>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;