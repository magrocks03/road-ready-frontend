import Footer from '../../Components/Layout/Footer';
import { FileText, Database, UserCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <>
      <div className="bg-background text-text-primary">
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-4 text-text-primary">Privacy Policy</h1>
          <p className="text-center text-text-secondary mb-12">Last Updated: August 28, 2025</p>

          <div className="space-y-8 text-text-secondary">
            <p>RoadReady ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2"><FileText size={20} className="text-primary"/> Information We Collect</h2>
              <p>We may collect personal information from you such as your name, email address, phone number, driver's license information, and payment details when you register for an account, make a booking, or contact us for support.</p>
            </div>

            {/* --- THIS SECTION IS FIXED --- */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2"><Database size={20} className="text-primary"/> How We Use Your Information</h2>
              <div> {/* Changed from <p> to <div> */}
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Process your bookings and payments.</li>
                  <li>Verify your identity and eligibility to rent a vehicle.</li>
                  <li>Communicate with you about your bookings, our services, and promotional offers.</li>
                  <li>Improve our website and services.</li>
                  <li>Comply with legal and regulatory requirements.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2"><UserCheck size={20} className="text-primary"/> Your Data Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us at <a href="mailto:mageshkannan003@gmail.com" className="text-primary hover:underline">mageshkannan003@gmail.com</a>.</p>
            </div>
            
            <p>We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;