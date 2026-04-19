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

export default function SearchPanel({ isOpen, onClose, onCitySelect, error }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = () => {
    const city = query.trim();
    if (city) onCitySelect(city);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 z-30 h-full w-full sm:w-95 glass-strong flex flex-col p-7 gap-6"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold tracking-wide">Search City</span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter city name..."
                className="flex-1 rounded-xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-lime/60 focus:ring-1 focus:ring-lime/40 transition-colors"
              />
              <button
                onClick={handleSubmit}
                aria-label="Search"
                className="px-4 py-2.5 bg-lime rounded-xl text-black font-semibold text-sm hover:bg-lime/80 transition-colors"
              >
                <Search size={15} />
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-400 text-xs -mt-3"
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
              <span className="text-[10px] uppercase tracking-widest text-white/40">Quick Cities</span>
              <div className="flex flex-wrap gap-2">
                {QUICK_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => onCitySelect(city)}
                    className="rounded-full glass px-4 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
