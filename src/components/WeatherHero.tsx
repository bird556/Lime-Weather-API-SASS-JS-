'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import type { WeatherData } from '@/types/weather';

interface Props {
  weather: WeatherData;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

function formatLiveTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getLocalIconPath(iconUrl: string): string {
  const match = iconUrl.match(/\/(day|night)\/(\d+\.png)$/);
  if (match) return `/icons1/${match[1]}/${match[2]}`;
  return iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;
}

export default function WeatherHero({ weather }: Props) {
  const { location, current } = weather;
  const iconPath = getLocalIconPath(current.condition.icon);

  // Seed the city's current time from the API, then tick it in real-time
  const apiTimeRef = useRef<number>(new Date(location.localtime).getTime());
  const receivedAtRef = useRef<number>(Date.now());
  const [cityTime, setCityTime] = useState<Date>(new Date(location.localtime));

  // Reset refs when city changes
  useEffect(() => {
    apiTimeRef.current = new Date(location.localtime).getTime();
    receivedAtRef.current = Date.now();
    setCityTime(new Date(location.localtime));
  }, [location.localtime]);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - receivedAtRef.current;
      setCityTime(new Date(apiTimeRef.current + elapsed));
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-6 py-12"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Live time */}
      <motion.p variants={item} className="text-white/60 text-sm tracking-widest uppercase mb-2 tabular-nums">
        {formatLiveTime(cityTime)}
      </motion.p>
      {/* Date */}
      <motion.p variants={item} className="text-white/40 text-xs tracking-wide mb-8">
        {formatDate(cityTime)}
      </motion.p>

      {/* Temperature */}
      <motion.div variants={item} className="flex items-start leading-none mb-4">
        <span className="text-[9rem] md:text-[12rem] font-thin text-white tracking-tighter">
          {Math.round(current.temp_c)}
        </span>
        <span className="text-4xl md:text-5xl font-light text-white/70 mt-8 ml-1">°C</span>
      </motion.div>

      {/* City */}
      <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold text-white mb-3">
        {location.name}
      </motion.h2>

      {/* Condition icon + text */}
      <motion.div variants={item} className="flex items-center gap-3 mb-8">
        <Image
          src={iconPath}
          alt={current.condition.text}
          width={40}
          height={40}
          unoptimized
        />
        <span className="text-white/80 text-lg">{current.condition.text}</span>
      </motion.div>
    </motion.div>
  );
}
