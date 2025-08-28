import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Assuming you have a logo image

const Footer = () => {
  return (
    <footer className="bg-card text-text-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="RoadReady Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-text-primary">RoadReady</span>
            </Link>
            <p>Your journey, your car, your way. Premium car rentals at unbeatable prices.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/vehicles" className="hover:text-primary transition-colors">Our Fleet</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RoadReady. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
