'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  type: 'none' | 'stars' | 'clouds' | 'fog' | 'rain' | 'storm' | 'snow';
}

export default function WeatherParticles({ type }: Props) {
  const particles = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  if (type === 'none') return null;

  if (type === 'rain' || type === 'storm') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((i) => {
          const left = Math.random() * 100;
          const duration = 0.6 + Math.random() * 0.6;
          const delay = Math.random() * 2;
          const height = 12 + Math.random() * 20;
          return (
            <motion.div
              key={i}
              className="absolute w-px bg-white/20 rounded-full"
              style={{ left: `${left}%`, height: `${height}px`, top: -height }}
              animate={{ y: '110vh' }}
              transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
        {type === 'storm' && <ThunderFlash />}
      </div>
    );
  }

  if (type === 'snow') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((i) => {
          const left = Math.random() * 100;
          const duration = 4 + Math.random() * 6;
          const delay = Math.random() * 5;
          const size = 3 + Math.random() * 4;
          const drift = (Math.random() - 0.5) * 80;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/60"
              style={{ left: `${left}%`, width: size, height: size, top: -size }}
              animate={{ y: '110vh', x: drift }}
              transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
      </div>
    );
  }

  if (type === 'stars') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 80;
          const size = 1 + Math.random() * 2;
          const duration = 1.5 + Math.random() * 2.5;
          const delay = Math.random() * 3;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
              animate={{ opacity: [0.1, 1, 0.1] }}
              transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}
      </div>
    );
  }

  if (type === 'clouds' || type === 'fog') {
    const blobs = Array.from({ length: 8 }, (_, i) => i);
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {blobs.map((i) => {
          const top = 10 + Math.random() * 70;
          const width = 200 + Math.random() * 300;
          const duration = 30 + Math.random() * 40;
          const startX = -width;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                width,
                height: width * 0.4,
                background: type === 'fog'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(255,255,255,0.06)',
                filter: 'blur(40px)',
              }}
              initial={{ x: startX }}
              animate={{ x: '110vw' }}
              transition={{ duration, delay: i * 4, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
      </div>
    );
  }

  return null;
}

function ThunderFlash() {
  return (
    <motion.div
      className="fixed inset-0 bg-white pointer-events-none"
      animate={{ opacity: [0, 0, 0, 0.15, 0, 0.08, 0] }}
      transition={{ duration: 0.4, delay: 3, repeat: Infinity, repeatDelay: 5 + Math.random() * 8 }}
    />
  );
}
