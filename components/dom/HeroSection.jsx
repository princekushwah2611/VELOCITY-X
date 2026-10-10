'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_CONTENT, STATS_DATA, CALLOUT_SPECS } from '../../lib/content';
import { setProgress, subscribeChapter, progressState } from '../../lib/progressStore';
import { audioEngine } from '../../lib/audioEngine';
import StatsCard from '../StatsCard';
import PaintSwitcher from './PaintSwitcher';
import ChapterHud from './ChapterHud';
import SoundToggle from './SoundToggle';
import { ChevronDown, Sparkles, SlidersHorizontal } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection({ isLoaded }) {
  const stageRef = useRef(null);
  const pinContentRef = useRef(null);
  const headlineRef = useRef(null);
  const statsContainerRef = useRef(null);
  const calloutsRef = useRef(null);
  const paintContainerRef = useRef(null);

  const [activeChapter, setActiveChapter] = useState(1);

  // Subscribe to chapter updates for DOM visibility
  useEffect(() => {
    return subscribeChapter((chap) => {
      setActiveChapter(chap);
    });
  }, []);

  // GSAP ScrollTrigger Master Pin & Scrub Timeline (FR-04)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? '+=350%' : '+=500%';

      // Master Scroll Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: scrollDistance,
          pin: pinContentRef.current,
          scrub: 1.0,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const velocity = self.getVelocity();

            // Write progress and velocity to shared store (Zero React re-renders)
            setProgress(progress, velocity);

            // Update audio engine frequency if enabled
            if (audioEngine && progressState.soundEnabled) {
              audioEngine.updateVelocity(velocity);
            }
          },
        },
      });

      // Chapter 01 fade out of headline and stats (0.00 -> 0.20)
      masterTl.to(
        headlineRef.current,
        {
          opacity: 0,
          y: -30,
          ease: 'power2.out',
          duration: 0.18,
        },
        0.02
      );

      masterTl.to(
        statsContainerRef.current,
        {
          opacity: 0,
          y: -20,
          ease: 'power2.out',
          duration: 0.16,
        },
        0.04
      );

      // Chapter 03 Callouts appearance (0.45 -> 0.65)
      masterTl.fromTo(
        calloutsRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, ease: 'power2.inOut', duration: 0.15 },
        0.48
      );
      masterTl.to(
        calloutsRef.current,
        { opacity: 0, scale: 1.05, ease: 'power2.inOut', duration: 0.1 },
        0.62
      );

      // Chapter 04 Paint Switcher appearance (0.65 -> 0.85)
      masterTl.fromTo(
        paintContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.inOut', duration: 0.12 },
        0.68
      );
      masterTl.to(
        paintContainerRef.current,
        { opacity: 0, y: -20, ease: 'power2.inOut', duration: 0.1 },
        0.84
      );
    }, stageRef);

    return () => ctx.revert();
  }, []);

  // Intro load animation (FR-03)
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0 }
      );

      introTl.fromTo(
        '.stat-card-intro',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 },
        '-=0.6'
      );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section ref={stageRef} id="hero" className="relative w-full bg-[#050505]">
      {/* Pinned Viewport Container */}
      <div
        ref={pinContentRef}
        className="h-screen w-full relative flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 lg:px-12 overflow-hidden z-10 pointer-events-none"
      >
        {/* TOP: Headline and brand subheader (FR-01) */}
        <div
          ref={headlineRef}
          className="relative w-full max-w-7xl mx-auto flex flex-col items-center text-center pointer-events-auto"
        >
          {/* Studio Protocol Tag */}
          <div className="flex items-center space-x-3 text-[10px] sm:text-xs font-mono tracking-widest text-[#9a9a9a] uppercase mb-2">
            <span className="flex items-center gap-1.5 text-[#c6ff00] bg-[#c6ff00]/10 px-2.5 py-0.5 rounded-full border border-[#c6ff00]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-ping"></span>
              {HERO_CONTENT.studioLabel}
            </span>
            <span className="hidden sm:inline">//</span>
            <span className="hidden sm:inline text-white/70">
              {HERO_CONTENT.subheading}
            </span>
          </div>

          {/* Large Letter-spaced Headline: WELCOME ITZFIZZ */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-[0.16em] sm:tracking-[0.24em] text-white select-none transition-all duration-200 mt-1 mb-2 font-sans">
            {HERO_CONTENT.headline}
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#9a9a9a] uppercase max-w-xl mx-auto">
            {HERO_CONTENT.tagline}
          </p>
        </div>

        {/* CENTER INTERACTIVE OVERLAYS: Callouts (Chapter 3) & Paint Switcher (Chapter 4) */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
          {/* Chapter 03 Detail Callout Badges */}
          <div
            ref={calloutsRef}
            className="opacity-0 pointer-events-auto flex flex-col gap-3 max-w-xs"
          >
            {CALLOUT_SPECS.map((spec, i) => (
              <div
                key={i}
                className="bg-[#0d0d0d]/85 border border-[#c6ff00]/40 backdrop-blur-md rounded-lg p-3 text-left shadow-2xl"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#c6ff00] uppercase">
                  <span>{spec.title}</span>
                  <span>[SPEC 0{i + 1}]</span>
                </div>
                <div className="text-base font-bold text-white font-sans mt-0.5">
                  {spec.value}
                </div>
                <p className="text-[11px] text-[#9a9a9a] mt-1 leading-snug">
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Chapter 04 Bespoke Paint Finish Switcher */}
          <div
            ref={paintContainerRef}
            className="opacity-0 pointer-events-auto ml-auto"
          >
            <PaintSwitcher />
          </div>
        </div>

        {/* BOTTOM: Demonstration Metrics & Global HUD (FR-01, FR-11) */}
        <div className="relative w-full max-w-7xl mx-auto pointer-events-auto">
          {/* Four Metrics Grid */}
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
          >
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className="stat-card-intro">
                <StatsCard
                  id={stat.id}
                  number={stat.number}
                  label={stat.label}
                  sector={stat.sector}
                  trend={stat.trend}
                  isActive={activeChapter === stat.chapter}
                />
              </div>
            ))}
          </div>

          {/* Chapter HUD & Audio Controls */}
          <ChapterHud />

          <div className="fixed bottom-6 right-4 sm:right-8 z-30 pointer-events-auto flex items-center gap-3">
            <SoundToggle />
          </div>
        </div>
      </div>
    </section>
  );
}
