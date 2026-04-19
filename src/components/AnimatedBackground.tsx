'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getConditionAssets } from '@/lib/constants';
import WeatherParticles from './WeatherParticles';

interface Props {
  conditionCode: number;
  isDay: number;
}

export default function AnimatedBackground({ conditionCode, isDay }: Props) {
  const { gradient, particles, bgDay, bgNight } = getConditionAssets(conditionCode, isDay);
  const bgImage = isDay ? bgDay : bgNight;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Photo layer — crossfades on condition change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgImage}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay — keeps text readable */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Subtle warm glow at top */}
      <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-white/5 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Particles */}
      <WeatherParticles type={particles} />
    </div>
  );
}
