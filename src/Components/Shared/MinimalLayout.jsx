import { Link, Outlet } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../../assets/images/logo.png'; // <-- Import logo

const MinimalLayout = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-card shadow-md md:bg-card/80 md:backdrop-blur-md dark:shadow-lg dark:shadow-slate-900/50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Brand Name with Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="RoadReady Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-primary">RoadReady</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
      <main>
        {/* The page content will be rendered here */}
        <Outlet />
      </main>
    </>
  );
};

export default MinimalLayout;