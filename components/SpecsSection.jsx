'use client';

import { useState } from 'react';
import { Gauge, Zap, Flame, EyeOff, Check } from 'lucide-react';

const DRIVE_MODES = {
  TRACK: {
    name: 'TRACK MODE',
    icon: Flame,
    color: '#D6FF5F',
    description: 'Maximum aerodynamic downforce, stiffened damper curves, and aggressive yaw torque vectoring.',
    specs: {
      acceleration: '2.1s',
      topSpeed: '385 km/h',
      horsepower: '1,020 hp',
      lateralG: '1.85 G',
      downforce: '620 kg',
      regen: '92%',
    },
  },
  SPORT: {
    name: 'SPORT GT',
    icon: Gauge,
    color: '#60A5FA',
    description: 'Balanced road compliance with dynamic roll control and heightened throttle response.',
    specs: {
      acceleration: '2.4s',
      topSpeed: '350 km/h',
      horsepower: '880 hp',
      lateralG: '1.60 G',
      downforce: '450 kg',
      regen: '78%',
    },
  },
  HYPER: {
    name: 'HYPER-KINETIC',
    icon: Zap,
    color: '#F59E0B',
    description: 'Overboost active capacitor dump with unlimited discharge rate for drag runs.',
    specs: {
      acceleration: '1.95s',
      topSpeed: '410 km/h',
      horsepower: '1,150 hp',
      lateralG: '1.92 G',
      downforce: '710 kg',
      regen: '100%',
    },
  },
  STEALTH: {
    name: 'STEALTH SILENT',
    icon: EyeOff,
    color: '#9CA3AF',
    description: 'Pure acoustic suppression with closed wastegates and low-drag touring aero.',
    specs: {
      acceleration: '3.2s',
      topSpeed: '280 km/h',
      horsepower: '620 hp',
      lateralG: '1.35 G',
      downforce: '260 kg',
      regen: '60%',
    },
  },
};

export default function SpecsSection() {
  const [activeModeKey, setActiveModeKey] = useState('TRACK');
  const activeMode = DRIVE_MODES[activeModeKey];

  return (
    <section id="specs" className="relative w-full bg-[#090909] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#D6FF5F] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D6FF5F]"></span>
              <span>// 03 TELEMETRY MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
              CALIBRATED FOR SPEED.{' '}
              <span className="text-[#8E8E93]">CONTROLLED BY CODE.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-[#8E8E93] max-w-sm">
            SELECT DRIVETRAIN PROFILE TO SIMULATE KINETIC READOUTS.
          </p>
        </div>

        {/* Drive Mode Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {Object.entries(DRIVE_MODES).map(([key, mode]) => {
            const isSelected = activeModeKey === key;
            const Icon = mode.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveModeKey(key)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#18181c] border-[#D6FF5F] shadow-lg shadow-[#D6FF5F]/10 scale-[1.02]'
                    : 'bg-[#121214] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: isSelected ? `${mode.color}20` : '#27272a',
                      color: mode.color,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#D6FF5F] animate-ping"></span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase block">
                    PROFILE
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    {mode.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Telemetry Specs Display */}
        <div className="rounded-2xl bg-[#121214] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="text-xs font-mono text-[#D6FF5F] tracking-widest uppercase mb-1">
                ACTIVE CONFIGURATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeMode.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-2xl">
                {activeMode.description}
              </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 self-start md:self-auto text-xs font-mono text-[#D6FF5F]">
              SYSTEM HARMONIC: 100% NOMINAL
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
                0-100 KM/H
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                {activeMode.specs.acceleration}
              </div>
              <span className="text-[10px] font-mono text-[#D6FF5F]">LAUNCH CONTROL</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
                TOP SPEED
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                {activeMode.specs.topSpeed}
              </div>
              <span className="text-[10px] font-mono text-gray-400">UNRESTRICTED</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
                POWER OUTPUT
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                {activeMode.specs.horsepower}
              </div>
              <span className="text-[10px] font-mono text-[#D6FF5F]">DUAL AXLE</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
                LATERAL G
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                {activeMode.specs.lateralG}
              </div>
              <span className="text-[10px] font-mono text-gray-400">SKIDPAD PEAK</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
                AERO DOWNFORCE
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                {activeMode.specs.downforce}
              </div>
              <span className="text-[10px] font-mono text-[#D6FF5F]">@ 250 KM/H</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
                REGEN EFFICIENCY
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                {activeMode.specs.regen}
              </div>
              <span className="text-[10px] font-mono text-gray-400">KINETIC HARVEST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
