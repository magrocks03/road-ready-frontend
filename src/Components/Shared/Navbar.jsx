import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { user$, userLogout } from '../../rxjs/UserService';
import ThemeToggle from './ThemeToggle';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = user$.subscribe(setCurrentUser);
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = () => {
    userLogout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-card shadow-md md:bg-card/80 md:backdrop-blur-md dark:shadow-lg dark:shadow-slate-900/50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={logo} alt="RoadReady Logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-primary">RoadReady</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/vehicles" className="text-slate-gray hover:text-primary">Vehicles</Link>
          {currentUser && (
            <>
              <Link to="/my-bookings" className="text-slate-gray hover:text-primary">My Bookings</Link>
              <Link to="/my-issues" className="text-slate-gray hover:text-primary">My Issues</Link>
              <Link to="/my-profile" className="text-slate-gray hover:text-primary">My Profile</Link>
            </>
          )}
          <Link to="/about" className="text-slate-gray hover:text-primary">About</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {currentUser ? (
            <>
              <span className="text-text-primary">Welcome, {currentUser}!</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-gray hover:text-primary">Login</Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-primary-hover">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={toggleMenu} className="text-text-secondary focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-card absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/vehicles" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">Vehicles</Link>
            {currentUser && (
              <>
               <Link to="/my-bookings" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">My Bookings</Link>
               <Link to="/my-issues" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">My Issues</Link>
               <Link to="/my-profile" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">My Profile</Link>
              </>
            )}
            <Link to="/about" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">About</Link>
            <hr className="border-border"/>
            {currentUser ? (
               <div className="px-3 py-2">
                 <span className="block text-text-primary">Welcome, {currentUser}!</span>
                 <button onClick={handleLogout} className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-left">Logout</button>
               </div>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">Login</Link>
                <Link to="/register" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-border">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;