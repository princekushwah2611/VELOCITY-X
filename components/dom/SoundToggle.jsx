'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../../lib/audioEngine';
import { progressState } from '../../lib/progressStore';

/**
 * VELOCITY X — Engine Audio Synthesizer Toggle (FR-12)
 * Remembers sound preference in localStorage, muted by default.
 */
export default function SoundToggle({ className = '' }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('velocity_x_sound');
    if (saved === 'enabled') {
      setIsMuted(false);
      progressState.soundEnabled = true;
      if (audioEngine) audioEngine.setMuted(false);
    }
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    progressState.soundEnabled = !nextState;

    if (audioEngine) {
      audioEngine.setMuted(nextState);
    }

    localStorage.setItem('velocity_x_sound', nextState ? 'muted' : 'enabled');
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={isMuted ? 'Enable engine kinetic audio' : 'Mute audio'}
      aria-pressed={!isMuted}
      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#c6ff00] ${
        !isMuted
          ? 'bg-[#c6ff00]/15 border-[#c6ff00] text-[#c6ff00] shadow-[0_0_12px_rgba(198,255,0,0.25)]'
          : 'bg-white/5 border-white/10 text-[#9a9a9a] hover:text-white'
      } ${className}`}
    >
      {!isMuted ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline">AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AUDIO MUTED</span>
        </>
      )}
    </button>
  );
}
