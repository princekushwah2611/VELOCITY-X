'use client';

import { useState } from 'react';
import SmoothScroll from '../components/system/SmoothScroll';
import CapabilityGate from '../components/system/CapabilityGate';
import Loader from '../components/dom/Loader';
import Navbar from '../components/Navbar';
import HeroSection from '../components/dom/HeroSection';
import IntroSection from '../components/dom/IntroSection';
import SpecsSection from '../components/SpecsSection';
import Footer from '../components/dom/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#050505] text-white selection:bg-[#c6ff00] selection:text-black relative overflow-x-hidden">
        {/* Real-time WebGL 3D Canvas / Capability Gate */}
        <CapabilityGate />

        {/* Branded Asset & Shader Loader (FR-02) */}
        <Loader onLoaded={() => setIsLoaded(true)} />

        {/* Minimal Navigation with Telemetry */}
        <Navbar />

        {/* Pinned 5-Chapter Hero Section (FR-01 to FR-06) */}
        <HeroSection isLoaded={isLoaded} />

        {/* Below-the-fold statement section (FR-13) */}
        <IntroSection />

        {/* Interactive specs matrix */}
        <SpecsSection />

        {/* Footer with credits and licensing (FR-14) */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
