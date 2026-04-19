'use client';

import { motion } from 'framer-motion';
import { CloudSun, Navigation } from 'lucide-react';
import type { WeatherData } from '@/types/weather';

interface Props {
  weather: WeatherData | null;
}

export default function SidebarCard({ weather }: Props) {
  return (
    <motion.aside
      className="glass-strong rounded-3xl p-6 flex flex-col gap-5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
    >
      {/* Branding */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full glass">
            <CloudSun className="h-4 w-4 text-lime" />
          </div>
          <span className="text-base font-medium tracking-wide">Lime Weather</span>
        </div>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Select area label */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Select Area</span>
        <div className="flex items-center gap-1.5">
          <Navigation className="h-3 w-3 text-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Globe */}
      <div className="flex justify-center">
        <div className="relative h-44 w-44 animate-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/globe.jpg"
            alt="Globe"
            className="h-full w-full rounded-full object-cover"
            aria-hidden="true"
          />
          {/* Pulsing location dots */}
          <span className="absolute left-[42%] top-[38%] h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_2px_#a3e635] animate-pulse-slow" />
          <span className="absolute left-[56%] top-[54%] h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_2px_#a3e635] animate-pulse-slow" style={{ animationDelay: '1.2s' }} />
          <span className="absolute left-[30%] top-[60%] h-1.5 w-1.5 rounded-full bg-lime/70 animate-pulse-slow" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>

      {/* City pill */}
      <div className="flex justify-center">
        <div className="rounded-full glass px-4 py-1.5 text-xs text-white/80">
          {weather ? `${weather.location.name}, ${weather.location.country}` : '—'}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10" />

      {/* Quick condition summary */}
      {weather && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs uppercase tracking-wider">Condition</span>
            <span className="text-white/80 text-xs">{weather.current.condition.text}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs uppercase tracking-wider">Humidity</span>
            <span className="text-white/80 text-xs">{weather.current.humidity}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs uppercase tracking-wider">Wind</span>
            <span className="text-white/80 text-xs">{weather.current.wind_kph} km/h</span>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
