'use client';

import { getAssetPath } from '../../utils/assetPath';
import { Wind, Activity, Shield, ArrowUpRight } from 'lucide-react';

/**
 * VELOCITY X — Intro Statement Section (FR-13)
 * Below the hero, enters as hero pin releases with large editorial statement,
 * blueprint visual, and aerodynamic architecture pillars.
 */
export default function IntroSection() {
  return (
    <section id="statement" className="relative w-full bg-[#050505] text-white py-24 sm:py-36 px-4 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden z-20">
      {/* Background outlined graphic watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 text-[26rem] font-black text-white/[0.02] select-none pointer-events-none font-sans">
        X
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Headline and Brand Manifesto */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#c6ff00] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#c6ff00]"></span>
              <span>// 02 KINETIC PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-sans leading-[1.08]">
              SYNCHRONIZED KINETICS.{' '}
              <span className="text-[#9a9a9a]">CONTROLLED BY CODE.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#9a9a9a] max-w-md leading-relaxed font-normal">
            VELOCITY X unifies high-frequency physics models with responsive scroll interpolation. Every millimeter of camera motion and vehicle displacement reflects pure aerodynamic intention.
          </p>
        </div>

        {/* Blueprint & Engineering Showcase */}
        <div className="relative rounded-2xl bg-[#0d0d0d] border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl mb-16">
          <div className="flex items-center justify-between pb-6 border-b border-white/5 text-[11px] font-mono text-[#9a9a9a]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-pulse"></span>
              AERODYNAMIC BLUEPRINT // CHASSIS V-X
            </span>
            <span className="hidden sm:inline">CFD TUNNEL: 0.235 Cd LOW DRAG COEFFICIENT</span>
          </div>

          {/* Blueprint Graphic */}
          <div className="relative my-8 sm:my-12 flex items-center justify-center">
            <img
              src={getAssetPath('/images/velocity-x-profile.jpg')}
              alt="VELOCITY X Aerodynamic Blueprint Showcase"
              className="w-full max-w-5xl rounded-lg object-cover shadow-2xl brightness-90 contrast-110"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs font-mono text-[#9a9a9a]">
            <span>STRUCTURAL STIFFNESS: 50,000 NM/DEG</span>
            <span className="text-[#c6ff00]">FULL AUTOCLAVE CARBON PRE-PREG</span>
          </div>
        </div>

        {/* 3 Core Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-xl bg-[#0d0d0d] border border-white/10 hover:border-[#c6ff00]/50 transition-colors duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00] mb-6">
              <Wind className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-widest mb-2">
              01 // VENTURI GROUND EFFECT
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Dynamic Venturi Tunnels
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">
              Underbody contours generate 620 kg of suction downforce without the drag penalty of oversized rear aerofoils.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#0d0d0d] border border-white/10 hover:border-[#c6ff00]/50 transition-colors duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00] mb-6">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-widest mb-2">
              02 // SENSOR BUS
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Sub-Millisecond Feedback
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">
              Inertial sensors link driver inputs directly to active dampening and torque vectoring within 1.2 milliseconds.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#0d0d0d] border border-white/10 hover:border-[#c6ff00]/50 transition-colors duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00] mb-6">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-widest mb-2">
              03 // CARBON RIGIDITY
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              T1000G Monocoque Tub
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">
              Ultra-high modulus aerospace carbon composite cell delivering surgical steering precision and FIA-grade occupant safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
