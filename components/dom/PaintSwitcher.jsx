'use client';

import { useState, useEffect } from 'react';
import { PAINT_COLORS } from '../../lib/content';
import { progressState, setPaintColor, subscribePaint } from '../../lib/progressStore';
import { Palette, Check } from 'lucide-react';

/**
 * VELOCITY X — Bespoke Paint Finish Switcher (FR-09)
 * Keyboard-accessible color picker triggering real-time 3D MeshPhysicalMaterial updates.
 */
export default function PaintSwitcher({ className = '' }) {
  const [activeColor, setActiveColor] = useState(progressState.paintColor);

  useEffect(() => {
    return subscribePaint((hex) => setActiveColor(hex));
  }, []);

  const handleSelect = (hex) => {
    setActiveColor(hex);
    setPaintColor(hex);
  };

  return (
    <div
      role="region"
      aria-label="Vehicle Paint Finish Selector"
      className={`bg-[#0d0d0d]/90 border border-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-2xl flex flex-col items-start gap-2.5 ${className}`}
    >
      <div className="flex items-center justify-between w-full text-[10px] font-mono tracking-widest text-[#9a9a9a] uppercase">
        <span className="flex items-center gap-1.5 text-white">
          <Palette className="w-3.5 h-3.5 text-[#c6ff00]" />
          BESPOKE LIVERY
        </span>
        <span className="text-[#c6ff00]">CLEARCOAT</span>
      </div>

      <div className="flex items-center gap-2" role="radiogroup" aria-label="Paint colors">
        {PAINT_COLORS.map((paint) => {
          const isSelected = activeColor.toLowerCase() === paint.hex.toLowerCase();
          return (
            <button
              key={paint.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={paint.name}
              onClick={() => handleSelect(paint.hex)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#c6ff00] focus:ring-offset-2 focus:ring-offset-black ${
                isSelected
                  ? 'border-[#c6ff00] scale-110 shadow-[0_0_12px_rgba(198,255,0,0.4)]'
                  : 'border-white/20 hover:border-white/50'
              }`}
              style={{ backgroundColor: paint.hex }}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    paint.id === 'white' || paint.id === 'lime' || paint.id === 'chrome'
                      ? 'text-black'
                      : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
