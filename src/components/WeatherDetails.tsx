'use client';

import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, Cloud, type LucideIcon } from 'lucide-react';
import type { WeatherData } from '@/types/weather';

interface Props {
  weather: WeatherData;
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  index: number;
}

function StatCard({ icon: Icon, label, value, index }: StatCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 hover:border-white/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.04 }}
    >
      <Icon size={22} className="text-lime" />
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

export default function WeatherDetails({ weather }: Props) {
  const { current } = weather;

  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
    { icon: Wind, label: 'Wind', value: `${current.wind_kph} km/h` },
    { icon: Thermometer, label: 'Feels Like', value: `${Math.round(current.feelslike_c)}°` },
    { icon: Cloud, label: 'Cloud', value: `${current.cloud}%` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 w-full max-w-2xl mx-auto">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} index={i} {...stat} />
      ))}
    </div>
  );
}
