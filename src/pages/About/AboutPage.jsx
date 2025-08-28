import Footer from '../../Components/Layout/Footer';
import aboutHeroImage from '../../assets/images/carrental.jpg'; 
import { Building, Rocket } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <div className="bg-background text-text-primary">
        {/* --- Hero Section --- */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutHeroImage})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">About RoadReady</h1>
            <p className="text-lg md:text-xl mt-4 text-gray-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
              More than just a rental service, we're your partners in adventure.
            </p>
          </div>
        </section>

        {/* --- Our Mission Section --- */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Building className="mx-auto text-primary mb-4" size={48} />
            <h2 className="text-3xl font-bold text-text-primary mb-4">Our Mission</h2>
            <p className="text-text-secondary text-lg">
              At RoadReady, our mission is simple: to make car rental a seamless, enjoyable, and transparent experience. We believe that getting the right vehicle for your journey shouldn't be a hassle. We're committed to providing a diverse fleet, fair pricing, and exceptional customer service to ensure your adventure starts the moment you turn the key.
            </p>
          </div>
        </section>

        {/* --- The Funny History / Easter Egg Section (UPDATED) --- */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Rocket className="mx-auto text-primary mb-4" size={48} />
            <h2 className="text-3xl font-bold text-text-primary mb-4">Our Not-So-Secret Origin Story</h2>
            <p className="text-text-secondary text-lg mb-6">
              It all started with a lost set of keys, a questionable map, and a road trip that went hilariously wrong. Our founders, stranded somewhere between Chennai and "Are We There Yet?", realized there had to be a better way to rent a car.
            </p>
            <p className="text-text-secondary text-lg">
              Fueled by too much coffee and a shared dream of never being stranded again, they launched RoadReady. The first "office" was a coffee shop, the first "fleet" was one very reliable (and slightly dented) hatchback, and the first business plan was scribbled on a napkin. Today, we're a little bigger, but that same spirit of adventure and problem-solving drives everything we do.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
