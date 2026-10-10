'use client';

import { TrendingUp, ArrowDownRight, Zap, CheckCircle2 } from 'lucide-react';

export default function StatsCard({
  id,
  number,
  label,
  sector,
  trend = 'positive',
  isActive = false,
  className = '',
}) {
  return (
    <div
      id={id}
      className={`stat-card relative transition-all duration-300 rounded-lg p-3.5 sm:p-4 md:p-5 backdrop-blur-md border ${
        isActive
          ? 'bg-[#18181c]/95 border-[#D6FF5F] shadow-lg shadow-[#D6FF5F]/15 scale-[1.02]'
          : 'bg-[#121214]/85 border-white/10 hover:border-white/20'
      } ${className}`}
    >
      {/* Corner bracket accent */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#D6FF5F]/60 rounded-tr-sm"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20 rounded-bl-sm"></div>

      {/* Sector header and telemetry indicator */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? 'bg-[#D6FF5F] animate-ping' : 'bg-white/40'
            }`}
          ></span>
          <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase">
            {sector}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[10px] font-mono text-[#8E8E93]">
          {trend === 'positive' ? (
            <span className="text-[#D6FF5F] flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> GAIN
            </span>
          ) : (
            <span className="text-[#D6FF5F] flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" /> REDUCE
            </span>
          )}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline space-x-1.5">
        <span
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
            isActive ? 'text-[#D6FF5F]' : 'text-white'
          }`}
        >
          {number}
        </span>
        <span className="text-xs font-mono text-[#8E8E93] uppercase">
          METRIC
        </span>
      </div>

      {/* Description */}
      <p className="mt-1 text-xs sm:text-sm text-gray-300 font-medium leading-snug line-clamp-2">
        {label}
      </p>

      {/* Active telemetry status bar */}
      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#8E8E93]">
        <span className="flex items-center gap-1">
          <Zap className={`w-2.5 h-2.5 ${isActive ? 'text-[#D6FF5F]' : 'text-gray-500'}`} />
          {isActive ? 'TELEMETRY LOCKED' : 'STANDBY'}
        </span>
        <span className="text-gray-500">SYS // OK</span>
      </div>
    </div>
  );
}
