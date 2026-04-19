'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import type { WeatherData } from '@/types/weather';

interface Props {
  weather: WeatherData;
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const item = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function formatLiveTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function WeatherHero({ weather }: Props) {
  const { location, current } = weather;

  const apiTimeRef   = useRef<number>(new Date(location.localtime).getTime());
  const receivedAt   = useRef<number>(Date.now());
  const [cityTime, setCityTime] = useState<Date>(new Date(location.localtime));

  useEffect(() => {
    apiTimeRef.current = new Date(location.localtime).getTime();
    receivedAt.current = Date.now();
    setCityTime(new Date(location.localtime));
  }, [location.localtime]);

  useEffect(() => {
    const id = setInterval(() => {
      setCityTime(new Date(apiTimeRef.current + (Date.now() - receivedAt.current)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Split "Partly cloudy" → line 1; or "Storm with Heavy Rain" → "Storm" + "with Heavy Rain"
  const words = current.condition.text.split(/\s+(with|and)\s+/i);
  const line1 = words[0];
  const line2 = words.length > 1 ? `${words[1]} ${words[2] ?? ''}`.trim() : null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-6 items-center text-center"
    >
      {/* Location + date line */}
      <motion.div variants={item} className="flex items-center gap-2 text-sm text-white/60">
        <MapPin className="h-4 w-4 text-lime shrink-0" />
        <span className="font-medium text-white/80">{location.name}, {location.country}</span>
        <span className="text-white/40">·</span>
        <span className="tabular-nums">{formatLiveTime(cityTime)}</span>
        <span className="text-white/40 hidden md:inline">·</span>
        <span className="text-white/40 hidden md:inline">{formatDate(cityTime)}</span>
      </motion.div>

      {/* Temperature row */}
      <motion.div variants={item} className="flex items-start gap-6">
        <div className="flex items-start leading-none">
          <span className="text-7xl lg:text-8xl font-light tracking-tight text-glow">
            {Math.round(current.temp_c)}°
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <div className="rounded-full glass px-3 py-1 text-xs flex items-center gap-1.5">
            <span className="text-white/40">Feels</span>
            <span>{Math.round(current.feelslike_c)}°</span>
          </div>
          <div className="rounded-full glass px-3 py-1 text-xs flex items-center gap-1.5">
            <span className="text-white/40">Wind</span>
            <span>{current.wind_kph} km/h</span>
          </div>
        </div>
      </motion.div>

      {/* Condition headline — the editorial centrepiece */}
      <motion.div variants={item}>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-glow">
          {line1}
        </h1>
        {line2 && (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-white/60">
            {line2}
          </h1>
        )}
      </motion.div>
    </motion.div>
  );
}
