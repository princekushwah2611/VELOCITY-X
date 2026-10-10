'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '../utils/assetPath';
import StatsCard from './StatsCard';
import { ChevronDown, Gauge, Cpu, Navigation, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  {
    id: 'stat-1',
    sector: 'TELEMETRY // S-01',
    number: '58%',
    label: 'Increase in pickup point usage',
    trend: 'positive',
    checkpoint: 0.2,
  },
  {
    id: 'stat-2',
    sector: 'TELEMETRY // S-02',
    number: '23%',
    label: 'Reduction in customer phone calls',
    trend: 'negative',
    checkpoint: 0.45,
  },
  {
    id: 'stat-3',
    sector: 'TELEMETRY // S-03',
    number: '27%',
    label: 'Improvement in pickup experience',
    trend: 'positive',
    checkpoint: 0.7,
  },
  {
    id: 'stat-4',
    sector: 'TELEMETRY // S-04',
    number: '40%',
    label: 'Reduction in delivery friction',
    trend: 'negative',
    checkpoint: 0.9,
  },
];

const HEADLINE_TEXT = 'WELCOME ITZFIZZ';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);

  const [activeCheckpoint, setActiveCheckpoint] = useState(-1);
  const [scrollSpeedKmh, setScrollSpeedKmh] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const ctx = gsap.context(() => {
      // 1. Initial page load intro animations (FR-02)
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Reveal headline with vertical movement and opacity
      introTl.fromTo(
        lettersRef.current,
        {
          opacity: 0,
          y: 35,
          scale: 0.92,
        },
        {
          opacity: 0.55,
          y: 0,
          scale: 1,
          stagger: 0.035,
          duration: 0.9,
          delay: 0.2,
        }
      );

      // Reveal statistics sequentially with staggered timing
      introTl.fromTo(
        '.stat-card-intro',
        {
          opacity: 0,
          y: 25,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
        },
        '-=0.5'
      );

      // Reveal car initial stance
      introTl.fromTo(
        carRef.current,
        {
          opacity: 0,
          x: -60,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        },
        '-=0.7'
      );

      // 2. Scroll-driven car animation with ScrollTrigger (FR-03)
      if (!mediaQuery.matches && roadRef.current && carRef.current) {
        const getEndDistance = () => {
          const roadWidth = roadRef.current ? roadRef.current.offsetWidth : window.innerWidth;
          const carWidth = carRef.current ? carRef.current.offsetWidth : 240;
          return Math.max(roadWidth - carWidth - 20, 200);
        };

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1800',
            pin: pinContainerRef.current,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;

              // Compute simulated telemetry speed (0 to 348 km/h)
              const simulatedSpeed = Math.round(progress * 348);
              setScrollSpeedKmh(simulatedSpeed);

              // Update active checkpoint
              let currentActive = -1;
              if (progress >= 0.15 && progress < 0.38) currentActive = 0;
              else if (progress >= 0.38 && progress < 0.62) currentActive = 1;
              else if (progress >= 0.62 && progress < 0.85) currentActive = 2;
              else if (progress >= 0.85) currentActive = 3;
              setActiveCheckpoint(currentActive);

              // Dynamically illuminate letters as car progresses
              if (lettersRef.current && lettersRef.current.length > 0) {
                const totalLetters = lettersRef.current.length;
                const activeIndex = Math.floor(progress * totalLetters * 1.1);

                lettersRef.current.forEach((el, idx) => {
                  if (!el) return;
                  if (idx <= activeIndex) {
                    el.style.opacity = '1';
                    el.style.color = '#D6FF5F';
                    el.style.textShadow = '0 0 15px rgba(214, 255, 95, 0.6)';
                  } else {
                    el.style.opacity = '0.55';
                    el.style.color = '#ffffff';
                    el.style.textShadow = 'none';
                  }
                });
              }
            },
          },
        });

        // Car horizontal motion, subtle vertical aerodynamic drift, and subtle scale
        scrollTimeline.to(
          carRef.current,
          {
            x: () => getEndDistance(),
            y: (i, target) => {
              // subtle undulating aerodynamic elevation changes
              return 0;
            },
            scale: 1.04,
            ease: 'none',
          },
          0
        );

        // Electric lime velocity trail extending behind the car
        scrollTimeline.to(
          trailRef.current,
          {
            width: () => {
              const carWidth = carRef.current ? carRef.current.offsetWidth : 240;
              return getEndDistance() + carWidth * 0.45;
            },
            ease: 'none',
          },
          0
        );

        // Subtle aerodynamic elevation wave on car
        scrollTimeline.to(
          carRef.current,
          {
            keyframes: [
              { y: -6, duration: 0.25 },
              { y: 8, duration: 0.25 },
              { y: -4, duration: 0.25 },
              { y: 0, duration: 0.25 },
            ],
            ease: 'sine.inOut',
          },
          0
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger on window resize to ensure precision
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMediaChange);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-[#090909] overflow-hidden"
    >
      {/* Pinned viewport container */}
      <div
        ref={pinContainerRef}
        className="h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-grid-pattern"
      >
        {/* Subtle radial lighting for cinematic atmosphere */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none"></div>

        {/* TOP: Sub-header and large letter-spaced headline (FR-01, FR-02) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Studio protocol badge */}
          <div className="flex items-center space-x-3 text-[10px] sm:text-xs font-mono tracking-widest text-[#8E8E93] uppercase mb-2">
            <span className="flex items-center gap-1.5 text-[#D6FF5F] bg-[#D6FF5F]/10 px-2.5 py-0.5 rounded-full border border-[#D6FF5F]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF5F] animate-ping"></span>
              SYS.V-X PROTOCOL
            </span>
            <span className="hidden sm:inline">//</span>
            <span className="hidden sm:inline text-white/70">
              KINETIC SCROLL SYNCHRONIZATION
            </span>
          </div>

          {/* Large Letter-spaced Headline: WELCOME ITZFIZZ */}
          <h1
            ref={headlineRef}
            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-[0.15em] sm:tracking-[0.22em] text-white select-none transition-all duration-200 mt-1 mb-2 font-sans"
            style={{ wordBreak: 'keep-all' }}
          >
            {HEADLINE_TEXT.split('').map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="headline-char inline-block transition-colors duration-150"
                style={{ opacity: 0 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#8E8E93] uppercase max-w-xl mx-auto">
            FEEL THE MOTION. CONTROL THE EXPERIENCE.
          </p>
        </div>

        {/* CENTER: Automotive Track with Animated Car (FR-01, FR-03) */}
        <div className="relative z-20 w-full my-auto py-2 sm:py-4">
          <div
            ref={roadRef}
            className="relative w-full h-32 sm:h-40 md:h-48 lg:h-52 bg-[#121215] border-y border-white/10 rounded-lg overflow-hidden flex items-center shadow-2xl shadow-black"
          >
            {/* Track background detailing: asphalt texture & center guide line */}
            <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Center dashed line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] border-b border-dashed border-white/20 z-0"></div>

            {/* Checkpoint track markers with telemetry labels */}
            <div className="absolute inset-0 flex justify-between items-center px-4 sm:px-12 pointer-events-none z-10 text-[9px] sm:text-[10px] font-mono text-white/30">
              <span className="flex items-center gap-1 border-l border-white/20 pl-2">
                00.00 KM <span className="text-[#D6FF5F]">// START</span>
              </span>
              <span className={`transition-colors duration-300 border-l border-white/20 pl-2 ${activeCheckpoint >= 0 ? 'text-[#D6FF5F]' : ''}`}>
                00.25 KM <span className="hidden sm:inline">// SEC 01</span>
              </span>
              <span className={`transition-colors duration-300 border-l border-white/20 pl-2 ${activeCheckpoint >= 1 ? 'text-[#D6FF5F]' : ''}`}>
                00.50 KM <span className="hidden sm:inline">// SEC 02</span>
              </span>
              <span className={`transition-colors duration-300 border-l border-white/20 pl-2 ${activeCheckpoint >= 2 ? 'text-[#D6FF5F]' : ''}`}>
                00.75 KM <span className="hidden sm:inline">// SEC 03</span>
              </span>
              <span className={`transition-colors duration-300 border-l border-white/20 pl-2 ${activeCheckpoint >= 3 ? 'text-[#D6FF5F]' : ''}`}>
                01.00 KM <span className="text-[#D6FF5F]">// FINISH</span>
              </span>
            </div>

            {/* Glowing electric lime velocity trail */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-transparent via-[#D6FF5F]/15 to-[#D6FF5F]/40 border-r-2 border-[#D6FF5F] z-10 transition-none pointer-events-none"
              style={{ width: 0 }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#D6FF5F]/30 blur-md"></div>
            </div>

            {/* Main car visual (McLaren 720S transparent top view) */}
            <div
              ref={carRef}
              className="absolute left-2 sm:left-6 z-30 select-none pointer-events-none transform-gpu flex items-center"
              style={{ willChange: 'transform' }}
            >
              {/* Car visual container */}
              <div className="relative group">
                <img
                  src={getAssetPath('/images/mclaren-720s.png')}
                  alt="Velocity X McLaren 720S high-performance automotive visual"
                  className="w-48 sm:w-64 md:w-80 lg:w-96 max-w-none h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
                  loading="eager"
                  priority="true"
                />
                {/* Subtle rear jet energy glow */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-12 bg-[#D6FF5F] opacity-75 blur-md rounded-full pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Telemetry live status HUD bar */}
          <div className="mt-2 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#8E8E93] px-2">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <span className="flex items-center gap-1.5 text-white">
                <Gauge className="w-3.5 h-3.5 text-[#D6FF5F]" />
                VELOCITY:{' '}
                <span className="text-[#D6FF5F] font-bold">
                  {scrollSpeedKmh} KM/H
                </span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#D6FF5F]" />
                TRACTION: <span className="text-white">ACTIVE AWD</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#D6FF5F]" />
                VECTORING: <span className="text-white">DYNAMIC 98%</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400">CHASSIS:</span>
              <span className="text-[#D6FF5F] font-semibold">T1000 CARBON</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Responsive Four Statistics Grid (FR-01, FR-02) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {STATS_DATA.map((stat, index) => (
              <div key={stat.id} className="stat-card-intro">
                <StatsCard
                  id={stat.id}
                  number={stat.number}
                  label={stat.label}
                  sector={stat.sector}
                  trend={stat.trend}
                  isActive={activeCheckpoint === index}
                />
              </div>
            ))}
          </div>

          {/* Scroll Down Instruction Tag */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-2 text-[10px] sm:text-xs font-mono text-[#8E8E93]">
            <ChevronDown className="w-3.5 h-3.5 text-[#D6FF5F] animate-bounce" />
            <span className="tracking-widest uppercase">
              SCROLL DOWN TO ADVANCE CAR & UNLOCK NEXT SECTION
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D6FF5F] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
