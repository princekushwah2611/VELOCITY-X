'use client';

import { useState, useEffect } from 'react';
import { subscribeChapter, progressState } from '../../lib/progressStore';
import { CHAPTERS_DATA } from '../../lib/content';
import { Gauge, Navigation } from 'lucide-react';

/**
 * VELOCITY X — Dynamic Speed HUD & Chapter Indicator (FR-11)
 * Displays active chapter [01..05], live simulated velocity, and chapter title.
 */
export default function ChapterHud() {
  const [currentChapterNum, setCurrentChapterNum] = useState(1);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    // Subscribe to chapter changes
    const unsub = subscribeChapter((chap) => {
      setCurrentChapterNum(chap);
    });

    // Update speed display at a light interval
    const interval = setInterval(() => {
      setSpeed(progressState.speedKmh);
    }, 80);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const currentChapter = CHAPTERS_DATA[currentChapterNum - 1] || CHAPTERS_DATA[0];

  return (
    <div className="fixed bottom-6 left-4 sm:left-8 z-30 pointer-events-none select-none flex flex-col gap-2">
      {/* Chapter Indicator Pill */}
      <div className="flex items-center space-x-3 bg-[#0d0d0d]/85 border border-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-mono shadow-2xl">
        <div className="flex items-center space-x-1.5 text-[#c6ff00] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-ping"></span>
          <span>CHAPTER {currentChapter.number}</span>
        </div>
        <span className="text-white/20">//</span>
        <span className="text-white font-semibold tracking-wider">
          {currentChapter.title}
        </span>
      </div>

      {/* Speed & Downforce Telemetry HUD */}
      <div className="flex items-center space-x-4 bg-[#0d0d0d]/85 border border-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-mono text-[#9a9a9a] shadow-2xl">
        <div className="flex items-center space-x-1.5 text-white">
          <Gauge className="w-3.5 h-3.5 text-[#c6ff00]" />
          <span>VELOCITY:</span>
          <span className="text-[#c6ff00] font-bold text-sm tracking-tight">
            {speed} KM/H
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 border-l border-white/10 pl-4">
          <Navigation className="w-3.5 h-3.5 text-white/50" />
          <span>STAGE:</span>
          <span className="text-white font-medium">{currentChapter.subtitle.split('//')[0]}</span>
        </div>
      </div>
    </div>
  );
}
