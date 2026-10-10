'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.round((window.scrollY / totalScroll) * 100);
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/90'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center bg-black border border-white/20 rounded-sm overflow-hidden group-hover:border-[#c6ff00] transition-colors">
            <span className="w-2.5 h-2.5 bg-[#c6ff00] rotate-45 transform group-hover:scale-125 transition-transform"></span>
            <div className="absolute inset-0 bg-[#c6ff00]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold tracking-[0.25em] text-white uppercase flex items-center gap-1.5 font-sans">
              VELOCITY <span className="text-[#c6ff00]">X</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#9a9a9a] uppercase">
              3D KINETIC RIG // V2.0
            </span>
          </div>
        </div>

        {/* Studio / System label & Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest text-[#9a9a9a]">
          <a
            href="#hero"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#c6ff00] after:transition-all"
          >
            // 01 3D HERO
          </a>
          <a
            href="#statement"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#c6ff00] after:transition-all"
          >
            // 02 KINETICS
          </a>
          <a
            href="#specs"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#c6ff00] after:transition-all"
          >
            // 03 MATRIX
          </a>
        </nav>

        {/* Telemetry live indicator and CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Scroll progress pill */}
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-pulse"></span>
            <span className="text-[#9a9a9a] hidden xs:inline">SCROLL</span>
            <span className="text-white font-semibold">{scrollProgress}%</span>
          </div>

          <a
            href="#statement"
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase px-3.5 py-1.5 bg-[#c6ff00] hover:bg-[#b5ee00] text-black font-bold tracking-wider rounded-sm transition-all duration-200 transform hover:translate-y-[-1px] shadow-sm shadow-[#c6ff00]/20"
          >
            <span>EXPERIENCE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
