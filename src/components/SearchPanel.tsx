'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { QUICK_CITIES } from '@/lib/constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCitySelect: (city: string) => void;
  error: string | null;
}

const chipVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: 'easeOut' as const },
  }),
};

export default function SearchPanel({ isOpen, onClose, onCitySelect, error }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = () => {
    const city = query.trim();
    if (!city) return;
    onCitySelect(city);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 z-30 h-full w-full sm:w-80 bg-black/80 backdrop-blur-xl border-l border-white/10 flex flex-col p-6 gap-6"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-lg">Search City</span>
              <button
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search input */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter city name..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-colors"
              />
              <button
                onClick={handleSubmit}
                aria-label="Search"
                className="px-4 py-3 bg-lime rounded-xl text-black font-semibold text-sm hover:bg-lime/80 transition-colors flex items-center gap-1.5"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-400 text-sm -mt-2"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Quick cities */}
            <div className="flex flex-col gap-3">
              <span className="text-white/40 text-xs uppercase tracking-widest">Quick Cities</span>
              <div className="flex flex-wrap gap-2">
                {QUICK_CITIES.map((city, i) => (
                  <motion.button
                    key={city}
                    custom={i}
                    variants={chipVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => onCitySelect(city)}
                    className="bg-white/5 hover:bg-lime/10 border border-white/10 hover:border-lime/30 rounded-full px-4 py-1.5 text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {city}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
