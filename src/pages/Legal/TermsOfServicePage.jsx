import Footer from '../../Components/Layout/Footer';
import { ShieldAlert, Rocket, Mic, Ghost } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <>
      <div className="bg-background text-text-primary">
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-4 text-text-primary">Terms of Service</h1>
          <p className="text-center text-text-secondary mb-12">The Not-So-Fine Print. Read this, it’s hilarious.</p>

          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3"><ShieldAlert className="text-primary"/> The Basics (The Boring Bit)</h2>
              <p className="text-text-secondary">By using a RoadReady vehicle, you agree you're a licensed driver, you'll obey traffic laws, and you won't try to teach the car to fly. We tried. It doesn't work, and the paperwork is a nightmare. You're renting the car, not adopting it. Please bring it back.</p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3"><Rocket className="text-primary"/> Prohibited Shenanigans</h2>
              <p className="text-text-secondary">Our cars are for terrestrial adventures only. Prohibited activities include, but are not limited to: entering a demolition derby, challenging a train to a race, using the car as a submarine, or attempting to parallel park on Mars. Also, no transporting anything that would make a sniffer dog faint.</p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3"><Mic className="text-primary"/> The Car Karaoke Clause</h2>
              <p className="text-text-secondary">You are encouraged to sing your heart out while driving. However, by accepting these terms, you agree that RoadReady is not responsible for any sudden downpours of rain caused by your off-key rendition of "Bohemian Rhapsody." Drive-thru attendants are not official judges of your talent.</p>
            </div>
            
            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3"><Ghost className="text-primary"/> The "Lost & Found" Anomaly</h2>
              <p className="text-text-secondary">Please check for your belongings before returning the car. We've found everything from a single sock to a rubber chicken. We are not a storage unit for rogue poultry. Any items left behind will be considered a donation to the car's personal collection of oddities.</p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
