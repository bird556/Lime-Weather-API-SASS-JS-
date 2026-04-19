'use client';

import { motion } from 'framer-motion';

export default function WeatherHeroSkeleton() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Time */}
      <div className="skeleton h-3 w-28 mb-2" />
      {/* Date */}
      <div className="skeleton h-3 w-40 mb-8" />
      {/* Temperature */}
      <div className="skeleton h-40 w-56 rounded-2xl mb-4" />
      {/* City */}
      <div className="skeleton h-10 w-44 rounded-xl mb-3" />
      {/* Condition */}
      <div className="skeleton h-6 w-36 rounded-lg mb-8" />
    </motion.div>
  );
}
