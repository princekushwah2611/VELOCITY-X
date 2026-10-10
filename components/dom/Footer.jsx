'use client';

import { ArrowUp, Github, Sparkles } from 'lucide-react';

/**
 * VELOCITY X — Footer Component (FR-14)
 * Project branding, GitHub repository link, technology credits, and model licence attribution.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 lg:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-7 h-7 flex items-center justify-center bg-black border border-white/20 rounded-sm">
                <span className="w-2 h-2 bg-[#c6ff00] rotate-45"></span>
              </div>
              <span className="text-xl font-black tracking-[0.2em] text-white uppercase font-sans">
                VELOCITY <span className="text-[#c6ff00]">X</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#9a9a9a] max-w-md">
              Feel the Motion. Control the Experience. Real-time 3D automotive campaign engineered with WebGL, GSAP ScrollTrigger, and Next.js.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#9a9a9a]">
              <span className="w-2 h-2 rounded-full bg-[#c6ff00]"></span>
              <span className="text-white">THREE.JS / R3F</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#9a9a9a]">
              <span className="text-white">GSAP SCROLLTRIGGER</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#9a9a9a]">
              <span className="text-white">LENIS SMOOTH SCROLL</span>
            </div>

            <a
              href="https://github.com/princekushwah2611/VELOCITY-X"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm bg-white/10 hover:bg-[#c6ff00] hover:text-black transition-colors duration-200 text-white font-mono text-xs uppercase"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/20 text-[#9a9a9a] hover:text-white transition-colors duration-200 text-xs font-mono uppercase"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Licence Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#9a9a9a] gap-4">
          <div className="flex items-center space-x-2">
            <span>VELOCITY X &copy; 2026</span>
            <span>//</span>
            <span>ENGINEERED BY @PRINCE SINGH KUSHWAH</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/40">
              ORIGINAL 3D ASSET ARCHITECTURE // CC0 PROCEDURAL LICENCE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
