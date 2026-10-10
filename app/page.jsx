import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EngineeringSection from '../components/EngineeringSection';
import SpecsSection from '../components/SpecsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-white selection:bg-[#D6FF5F] selection:text-black">
      {/* Fixed top navigation */}
      <Navbar />

      {/* Hero section with GSAP ScrollTrigger car animation */}
      <HeroSection />

      {/* Below-the-fold complementary aerodynamic architecture section */}
      <EngineeringSection />

      {/* Interactive telemetry specs matrix & drive mode switcher */}
      <SpecsSection />

      {/* Project footer */}
      <Footer />
    </main>
  );
}
