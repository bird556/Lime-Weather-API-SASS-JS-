'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getGradientConfig } from '@/lib/constants';
import WeatherParticles from './WeatherParticles';

interface Props {
  conditionCode: number;
  isDay: number;
}

export default function AnimatedBackground({ conditionCode, isDay }: Props) {
  const { gradient, particles } = getGradientConfig(conditionCode, isDay);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={gradient}
          className="fixed inset-0 -z-10"
          style={{ background: gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="fixed inset-0 -z-10">
        <WeatherParticles type={particles} />
      </div>
    </>
  );
}
