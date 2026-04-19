'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CityTemp {
  name: string;
  temp: number;
}

interface Props {
  onCitySelect: (city: string) => void;
  currentCity: string;
}

const STRIP_CITIES = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Dubai'];

export default function QuickCitiesStrip({ onCitySelect, currentCity }: Props) {
  const [cityTemps, setCityTemps] = useState<CityTemp[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.allSettled(
        STRIP_CITIES.map(async (city) => {
          const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, { cache: 'no-store' });
          const data = await res.json();
          return { name: city, temp: Math.round(data.current.temp_c) } as CityTemp;
        })
      );
      setCityTemps(
        results
          .filter((r): r is PromiseFulfilledResult<CityTemp> => r.status === 'fulfilled')
          .map((r) => r.value)
      );
    };
    fetchAll();
  }, []);

  if (cityTemps.length === 0) return null;

  return (
    <motion.div
      className="w-full overflow-x-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center min-w-max md:min-w-0 md:flex-wrap gap-0 border-t border-white/10">
        {cityTemps.map((city, i) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`
              flex flex-col items-center gap-0.5 px-6 py-4 transition-colors border-r border-white/10 last:border-r-0
              ${city.name === currentCity
                ? 'bg-white/5 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <span className="text-2xl md:text-3xl font-light tabular-nums">
              {city.temp}°
            </span>
            <span className="text-[10px] uppercase tracking-widest whitespace-nowrap">
              {city.name}
            </span>
            {city.name === currentCity && (
              <span className="w-4 h-px bg-lime mt-1" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
