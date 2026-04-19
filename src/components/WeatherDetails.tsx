'use client';

import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, Cloud, type LucideIcon } from 'lucide-react';
import type { WeatherData } from '@/types/weather';

interface Props { weather: WeatherData }

function Stat({ icon: Icon, label, value, delay }: { icon: LucideIcon; label: string; value: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      <Icon size={14} className="text-lime shrink-0" />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-white">{value}</span>
        <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
      </div>
    </motion.div>
  );
}

export default function WeatherDetails({ weather }: Props) {
  const { current } = weather;
  const stats = [
    { icon: Droplets,    label: 'Humidity',  value: `${current.humidity}%` },
    { icon: Wind,        label: 'Wind',       value: `${current.wind_kph} km/h` },
    { icon: Thermometer, label: 'Feels Like', value: `${Math.round(current.feelslike_c)}°C` },
    { icon: Cloud,       label: 'Cloud',      value: `${current.cloud}%` },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {stats.map((s, i) => (
        <Stat key={s.label} {...s} delay={i * 0.07} />
      ))}
    </div>
  );
}
