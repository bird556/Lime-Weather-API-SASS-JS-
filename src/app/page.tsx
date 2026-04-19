'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, CloudSun } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import WeatherHero from '@/components/WeatherHero';
import WeatherDetails from '@/components/WeatherDetails';
import RecentCities from '@/components/RecentCities';
import WeatherHeroSkeleton from '@/components/skeletons/WeatherHeroSkeleton';
import WeatherDetailsSkeleton from '@/components/skeletons/WeatherDetailsSkeleton';
import SearchPanel from '@/components/SearchPanel';
import { fetchWeather } from '@/lib/weather';
import type { WeatherData } from '@/types/weather';

const DEFAULT_CITY = 'Toronto';
const MAX_RECENT = 2;

export default function Home() {
  const [weather, setWeather]           = useState<WeatherData | null>(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentCities, setRecentCities] = useState<WeatherData[]>([]);

  const loadWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      // Add to recent list (dedupe by name, max 2)
      setRecentCities((prev) => {
        const filtered = prev.filter((w) => w.location.name !== data.location.name);
        return [data, ...filtered].slice(0, MAX_RECENT);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadWeather(DEFAULT_CITY); }, [loadWeather]);

  const handleCitySelect = useCallback((city: string) => {
    setIsSearchOpen(false);
    loadWeather(city);
  }, [loadWeather]);

  // Fallback bg while no weather loaded
  const conditionCode = weather?.current.condition.code ?? 1000;
  const isDay         = weather?.current.is_day ?? 1;

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg">
      {/* Animated photo background */}
      <AnimatedBackground conditionCode={conditionCode} isDay={isDay} />

      <div className="relative z-10 mx-auto max-w-350 px-6 py-6 lg:px-10 lg:py-8 min-h-screen flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl glass">
              <CloudSun className="h-5 w-5 text-lime" />
            </div>
            <span className="text-lg font-medium tracking-wide text-white">Lime Weather</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/50">
            <Link href="/about"   className="hover:text-white/90 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white/90 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-white/90 transition-colors">Terms</Link>
          </nav>

          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open city search"
            className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/10 transition text-white"
          >
            <Search className="h-4 w-4" />
          </button>
        </header>

        {/* Main content — centered single column */}
        <div className="mt-10 flex-1 flex flex-col items-center justify-center gap-8">
          {loading && (
            <>
              <WeatherHeroSkeleton />
              <WeatherDetailsSkeleton />
            </>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-white/60 text-lg">Couldn&apos;t find that city.</p>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-5 py-2 rounded-xl border border-lime/50 text-lime text-sm hover:bg-lime/10 transition-colors"
              >
                Search again
              </button>
            </div>
          )}

          {!loading && !error && weather && (
            <>
              <AnimatePresence mode="wait">
                <WeatherHero key={weather.location.name} weather={weather} />
              </AnimatePresence>

              <WeatherDetails key={`d-${weather.location.name}`} weather={weather} />

              <RecentCities
                cities={recentCities.filter((w) => w.location.name !== weather.location.name)}
                onSelect={handleCitySelect}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/30 md:flex-row">
          <span>© {new Date().getFullYear()} Lime Weather. Forecasts you can feel.</span>
          <div className="flex items-center gap-6">
            <Link href="/about"   className="hover:text-white/60 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-white/60 transition-colors">Terms</Link>
            <span className="text-lime/60">Powered by WeatherAPI</span>
          </div>
        </footer>
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
