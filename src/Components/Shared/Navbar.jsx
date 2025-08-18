import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { user$, userLogout } from '../../rxjs/UserService'; // Import our user service

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to the user$ observable to get updates on the user's login state
    const subscription = user$.subscribe(setCurrentUser);

    // Unsubscribe when the component is unmounted to prevent memory leaks
    return () => {
      subscription.unsubscribe();
    };
  }, []); // The empty array ensures this effect runs only once

  const handleLogout = () => {
    userLogout(); // Call the logout function from our service
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          RoadReady
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/vehicles" className="text-gray-600 hover:text-blue-600">
            Vehicles
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
        </div>

        {/* This is the new, dynamic part of our Navbar */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            // If a user is logged in, show this:
            <>
              <span className="text-gray-800">Welcome, {currentUser}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            // If no user is logged in, show this:
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          {/* Mobile menu button will be implemented later */}
          <button className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;