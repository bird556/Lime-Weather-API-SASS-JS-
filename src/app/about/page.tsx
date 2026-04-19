import type { Metadata } from 'next';
import StaticPageShell from '@/components/StaticPageShell';

export const metadata: Metadata = {
  title: 'About — Lime Weather',
  description: 'Why Lime Weather was built, the tech stack, and the testing strategy.',
};

export default function AboutPage() {
  return (
    <StaticPageShell>
      <div className="flex flex-col gap-12">

        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            About <span className="text-lime">Lime Weather</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            A modern, animated real-time weather experience built to feel as alive as the weather itself.
          </p>
        </div>

        {/* Why */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-white/90">Why I Built This</h2>
          <div className="glass rounded-2xl p-6 flex flex-col gap-3 text-white/70 leading-relaxed">
            <p>
              Most weather apps do one thing: show you the forecast. They&apos;re functional, predictable,
              forgettable. I wanted to build something different — an interface that{' '}
              <span className="text-white/90">responds to the weather</span>, where opening the app on
              a rainy evening actually feels like a rainy evening.
            </p>
            <p>
              Lime Weather is my exploration of what a weather app <em>could</em> feel like: full-screen
              animated backgrounds that shift with conditions, smooth Framer Motion transitions, and a
              glassmorphism UI that layers beautifully over the dynamic scene.
            </p>
            <p>
              It&apos;s also a deliberate practice in modern frontend architecture — server components,
              strict TypeScript, CSS-based Tailwind v4 config, and a security-first API proxy pattern
              so credentials never reach the client.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-white/90">Tech Stack</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {STACK.map(({ name, description }) => (
              <div key={name} className="glass rounded-2xl p-5 flex flex-col gap-1">
                <span className="text-sm font-medium text-lime">{name}</span>
                <span className="text-sm text-white/60 leading-relaxed">{description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testing */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-white/90">Testing</h2>
          <div className="glass rounded-2xl p-6 flex flex-col gap-4 text-white/70 leading-relaxed">
            <p>
              This project uses <span className="text-white/90 font-medium">Playwright</span> for
              end-to-end testing. Tests run against a live dev server so they exercise the full
              stack — API proxy, data fetching, skeleton loading states, and animations — exactly
              the way a real user would.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-white/90 text-sm font-medium">Test coverage includes:</span>
              <ul className="list-disc list-inside text-sm flex flex-col gap-1.5">
                {TEST_COVERAGE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2 rounded-xl bg-white/5 border border-white/10 px-5 py-4 font-mono text-xs text-lime/80 flex flex-col gap-1">
              <span>npm run test:e2e       <span className="text-white/40"># run all E2E tests</span></span>
              <span>npm run test:e2e:ui    <span className="text-white/40"># open Playwright UI</span></span>
              <span>npm run test:e2e:report <span className="text-white/40"># view HTML report</span></span>
            </div>
          </div>
        </section>

      </div>
    </StaticPageShell>
  );
}

const STACK = [
  {
    name: 'Next.js 15 (App Router)',
    description:
      'Server components by default. The WeatherAPI key lives in a server-side API route — never shipped to the client.',
  },
  {
    name: 'TypeScript — strict mode',
    description:
      'Every component, hook, and API response is typed. No any shortcuts.',
  },
  {
    name: 'Tailwind CSS v4',
    description:
      'CSS-based configuration via @theme in globals.css. No tailwind.config.js needed.',
  },
  {
    name: 'Framer Motion',
    description:
      'Staggered entrance animations, AnimatePresence crossfades on weather change, spring-based hover interactions.',
  },
  {
    name: 'WeatherAPI.com',
    description:
      'Current conditions endpoint. condition.code drives the background image, gradient overlay, and particle effect.',
  },
  {
    name: 'Playwright',
    description:
      'End-to-end test suite covering core user flows — search, weather display, navigation, and error states.',
  },
];

const TEST_COVERAGE = [
  'Home page loads with real weather data',
  'Search panel opens and closes (keyboard + click)',
  'City search returns and displays results',
  'Skeleton loading states appear while fetching',
  'Error state shown for invalid cities',
  'About, Privacy, and Terms pages render correctly',
  'Navigation links work across all pages',
];
