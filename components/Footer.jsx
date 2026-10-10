'use client';

import { ArrowUp, Github, Code2, Sparkles, Terminal } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-7 h-7 flex items-center justify-center bg-black border border-white/20 rounded-sm">
                <span className="w-2 h-2 bg-[#D6FF5F] rotate-45"></span>
              </div>
              <span className="text-xl font-black tracking-[0.2em] text-white uppercase font-sans">
                VELOCITY <span className="text-[#D6FF5F]">X</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#8E8E93] max-w-md">
              Feel the Motion. Control the Experience. High-performance scroll-driven automotive digital showcase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#8E8E93]">
              <span className="w-2 h-2 rounded-full bg-[#D6FF5F]"></span>
              <span className="text-white">GSAP SCROLLTRIGGER</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#8E8E93]">
              <span className="text-white">NEXT.JS 14</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#8E8E93]">
              <span className="text-white">TAILWIND CSS</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 rounded-sm bg-white/10 hover:bg-[#D6FF5F] hover:text-black transition-all duration-200 text-white font-mono text-xs uppercase"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8E8E93] gap-4">
          <div className="flex items-center space-x-2">
            <span>VELOCITY X &copy; 2026</span>
            <span>//</span>
            <span>FRONTEND DEVELOPMENT ASSIGNMENT</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-500">
              INSPIRED BY ITZFIZZ MOTION ARCHITECTURE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
