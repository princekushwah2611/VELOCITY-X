'use client';

import { useState, useEffect } from 'react';

/**
 * VELOCITY X — Branded Progress Loader (FR-02)
 * Ensures 3D compilation and asset readiness before unveiling the hero stage.
 */
export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Rapid acceleration simulation for snappy UX
      current += Math.floor(Math.random() * 18) + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onLoaded) onLoaded();
        }, 300);
      }
      setProgress(current);
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white transition-opacity duration-700 ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-sm px-6 flex flex-col items-center text-center">
        {/* Brand insignia */}
        <div className="flex items-center space-x-2.5 mb-6">
          <div className="w-6 h-6 flex items-center justify-center bg-black border border-white/20 rounded-sm">
            <span className="w-2 h-2 bg-[#c6ff00] rotate-45"></span>
          </div>
          <span className="text-sm font-black tracking-[0.25em] uppercase text-white font-sans">
            VELOCITY <span className="text-[#c6ff00]">X</span>
          </span>
        </div>

        {/* Loading status */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#9a9a9a] uppercase mb-2">
          <span>INITIALIZING 3D ENGINE</span>
          <span className="text-[#c6ff00] font-bold">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#c6ff00] transition-all duration-100 ease-out shadow-[0_0_12px_#c6ff00]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Subtitle */}
        <span className="mt-4 text-[10px] font-mono tracking-widest text-white/40 uppercase">
          KINETIC SCROLL ARCHITECTURE // V2.0
        </span>
      </div>
    </div>
  );
}
