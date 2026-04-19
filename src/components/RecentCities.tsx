'use client';

import { motion } from 'framer-motion';
import type { WeatherData } from '@/types/weather';

interface Props {
  cities: WeatherData[];
  onSelect: (city: string) => void;
}

function getLocalIconPath(iconUrl: string): string {
  const match = iconUrl.match(/\/(day|night)\/(\d+\.png)$/);
  if (match) return `/icons1/${match[1]}/${match[2]}`;
  return iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;
}

export default function RecentCities({ cities, onSelect }: Props) {
  if (cities.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-col gap-3"
    >
      <div className="flex justify-center">
        <span className="text-xs text-white/40 uppercase tracking-widest">Recently Searched</span>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {cities.map((w) => (
          <motion.button
            key={w.location.name}
            onClick={() => onSelect(w.location.name)}
            className="group flex items-center gap-3 rounded-2xl glass p-3 text-left"
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.10)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 22 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 shrink-0">
              <img
                src={getLocalIconPath(w.current.condition.icon)}
                alt={w.current.condition.text}
                width={36}
                height={36}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-light leading-none">{Math.round(w.current.temp_c)}°</span>
              <span className="mt-1 text-xs font-medium text-white/80">{w.location.name}</span>
              <span className="text-[10px] text-white/40">{w.current.condition.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
