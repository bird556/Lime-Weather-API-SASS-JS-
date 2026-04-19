'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import WeatherHero from '@/components/WeatherHero';
import WeatherHeroSkeleton from '@/components/skeletons/WeatherHeroSkeleton';
import SearchPanel from '@/components/SearchPanel';
import { fetchWeather } from '@/lib/weather';
import type { WeatherData } from '@/types/weather';

const DEFAULT_CITY = 'Toronto';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const loadWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const handleCitySelect = useCallback((city: string) => {
    setIsSearchOpen(false);
    loadWeather(city);
  }, [loadWeather]);

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated background */}
      {weather && (
        <AnimatedBackground
          conditionCode={weather.current.condition.code}
          isDay={weather.current.is_day}
        />
      )}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6">
        <span className="text-lime font-bold text-xl tracking-tight">Lime Weather</span>
        <button
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open city search"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <Search size={20} />
        </button>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {loading && <WeatherHeroSkeleton />}

        {error && !isSearchOpen && (
          <div className="text-center px-6">
            <p className="text-white/60 text-lg">{error}</p>
            <button
              onClick={() => loadWeather(DEFAULT_CITY)}
              className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && weather && (
          <AnimatePresence mode="wait">
            <WeatherHero key={weather.location.name} weather={weather} />
          </AnimatePresence>
        )}
      </div>

      {/* Search panel */}
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onCitySelect={handleCitySelect}
        error={error}
      />
    </main>
  );
}
