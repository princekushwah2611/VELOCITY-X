'use client';

import { useState } from 'react';
import { getAssetPath } from '../utils/assetPath';
import { Wind, Shield, Activity, Compass, ArrowRight } from 'lucide-react';

const AERO_HOTSPOTS = [
  {
    id: 'aero-1',
    x: '18%',
    y: '58%',
    label: 'GROUND VENTURI',
    detail: 'Carbon splitter generates 320kg downforce at 200 km/h with negative lift vortex.',
  },
  {
    id: 'aero-2',
    x: '52%',
    y: '48%',
    label: 'T1000 MONOCOQUE',
    detail: 'Full autoclave carbon tub ensuring 50,000 Nm/deg torsional rigidity.',
  },
  {
    id: 'aero-3',
    x: '84%',
    y: '38%',
    label: 'ACTIVE WING AIRBRAKE',
    detail: 'Hydraulic dual-stage actuator with DRS mode reducing drag by 42% on straights.',
  },
];

export default function EngineeringSection() {
  const [selectedHotspot, setSelectedHotspot] = useState(AERO_HOTSPOTS[0]);

  return (
    <section id="aerodynamics" className="relative w-full bg-[#090909] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D6FF5F]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#D6FF5F] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D6FF5F]"></span>
              <span>// 02 AERODYNAMIC ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-sans max-w-2xl leading-[1.08]">
              SYNCHRONIZED KINETICS.{' '}
              <span className="text-[#8E8E93]">UNCOMPROMISING PRECISION.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base font-normal text-[#8E8E93] max-w-md leading-relaxed">
            Engineered at the intersection of mechanical power and digital fluid motion. Every millimeter of movement reflects pure aerodynamic intention.
          </p>
        </div>

        {/* Feature Hero Car Showcase with Interactive Hotspots */}
        <div className="relative rounded-2xl bg-[#121214] border border-white/10 p-4 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
          {/* Top metadata row */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5 text-[11px] font-mono text-[#8E8E93]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF5F] animate-pulse"></span>
              AERODYNAMIC PROFILE // CHASSIS VIEW V-X
            </span>
            <span className="hidden sm:inline">CFD SIMULATION: 0.235 Cd OPTIMIZED</span>
          </div>

          {/* Hypercar Side-Profile Graphic with Hotspot markers */}
          <div className="relative my-8 sm:my-12 flex items-center justify-center">
            <img
              src={getAssetPath('/images/velocity-x-profile.jpg')}
              alt="VELOCITY X Carbon Hypercar Side Profile View"
              className="w-full max-w-5xl rounded-lg object-cover shadow-2xl brightness-95 contrast-105"
            />

            {/* Interactive Hotspot pins */}
            {AERO_HOTSPOTS.map((spot) => {
              const isCurrent = selectedHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  style={{ left: spot.x, top: spot.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none transition-transform duration-200 ${
                    isCurrent ? 'scale-125' : 'hover:scale-110'
                  }`}
                  aria-label={spot.label}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isCurrent
                          ? 'bg-[#D6FF5F] border-black text-black'
                          : 'bg-black/80 border-[#D6FF5F]/80 text-[#D6FF5F]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                    </span>
                    <span
                      className={`absolute inset-0 rounded-full border border-[#D6FF5F] ${
                        isCurrent ? 'animate-ping' : 'opacity-0'
                      }`}
                    ></span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Detail Panel */}
          <div className="bg-[#090909]/90 border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#D6FF5F] uppercase mb-1">
                <span>SYSTEM COMPONENT</span>
                <span>//</span>
                <span>{selectedHotspot.label}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-3xl">
                {selectedHotspot.detail}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#8E8E93] self-end md:self-center shrink-0">
              <span>SELECT COMPONENT TO INSPECT</span>
            </div>
          </div>
        </div>

        {/* 3 Core Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          <div className="p-6 sm:p-8 rounded-xl bg-[#121214]/60 border border-white/10 hover:border-[#D6FF5F]/50 transition-colors duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-[#D6FF5F]/10 flex items-center justify-center text-[#D6FF5F] mb-6 group-hover:scale-110 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#8E8E93] uppercase tracking-widest mb-2">
              01 // AERO FLOW
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Dynamic Downforce Vectoring
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              Adaptive aerodynamic surfaces calculate lateral vehicle load 500 times per second to maximize mechanical grip through high-velocity corners.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#121214]/60 border border-white/10 hover:border-[#D6FF5F]/50 transition-colors duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-[#D6FF5F]/10 flex items-center justify-center text-[#D6FF5F] mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#8E8E93] uppercase tracking-widest mb-2">
              02 // TELEMETRY BUS
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Zero-Latency Kinetic Feedback
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              Sub-millisecond driver sensory synchronization links physical road dynamics directly to intuitive digital feedback with surgical precision.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#121214]/60 border border-white/10 hover:border-[#D6FF5F]/50 transition-colors duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-[#D6FF5F]/10 flex items-center justify-center text-[#D6FF5F] mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#8E8E93] uppercase tracking-widest mb-2">
              03 // CARBON MATRIX
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              T1000G Structural Rigidity
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              High-modulus carbon composite architecture delivers the stiffness needed for hyper-responsive steering and total passenger cell integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
