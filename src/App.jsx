import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Shared/Layout';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage'; // <-- Corrected path

function App() {
  return (
    <div className="bg-background text-text-primary min-h-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home Page</h1>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="vehicles" element={<h1>Vehicles Page</h1>} />
            <Route path="about" element={<h1>About Page</h1>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;