# Lime Weather

A modern, animated real-time weather app built with Next.js, Tailwind CSS v4, and Framer Motion — powered by WeatherAPI.

**Live Demo:** [lime-weather-api-sass-js.vercel.app](https://lime-weather-api-sass-js.vercel.app/)

---

## Features

- **Real-time weather** — temperature, condition, humidity, wind, feels like, cloud coverage
- **Dynamic animated backgrounds** — photo backgrounds + CSS gradient overlays that change with weather condition and time of day
- **Weather particles** — rain drops, snowflakes, stars, fog effects driven by live conditions
- **City search** — search any city worldwide with a slide-in panel
- **Quick cities** — one-click shortcuts for popular cities
- **Recently searched** — glass cards for previously viewed cities with spring hover animations
- **Live clock** — time ticks in real time, synced to the searched city's local timezone
- **Skeleton loading** — polished shimmer screens while data fetches
- **Framer Motion animations** — staggered entrance, weather-change crossfades, spring interactions
- **About / Privacy / Terms pages** — shared glassmorphism layout
- **Playwright E2E tests** — 32 tests across Chromium and Mobile Chrome

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript — strict mode |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Testing | Playwright |
| Weather API | WeatherAPI.com |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/bird556/Lime-Weather-API-SASS-JS-.git
cd Lime-Weather-API-SASS-JS-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your WeatherAPI key

Create a `.env.local` file in the root:

```bash
API_KEY=your_weatherapi_key_here
```

Get a free key at [weatherapi.com](https://www.weatherapi.com/).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `API_KEY` | WeatherAPI key — server-side only, never exposed to the client |

> The key is used exclusively in the Next.js API route at `/api/weather`. It is never sent to the browser.

---

## Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing across desktop and mobile viewports.

### Install browsers (first time only)

```bash
npx playwright install chromium
```

### Run tests

```bash
npm run test:e2e          # run all tests (headless)
npm run test:e2e:ui       # open Playwright interactive UI
npm run test:e2e:report   # view HTML test report
```

### Test coverage

- **home.spec.ts** — page load, weather data display, header/footer, stat cards
- **search.spec.ts** — search panel open/close (button, Escape, backdrop), city search, error state, quick cities
- **navigation.spec.ts** — About/Privacy/Terms pages render, nav links, cross-page routing

---

## Project Structure

```
src/
├── app/
│   ├── api/weather/route.ts     # Proxies WeatherAPI, keeps API_KEY server-side
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── layout.tsx
│   ├── page.tsx                 # Main weather page
│   └── globals.css              # Tailwind v4 @theme config + glass utilities
├── components/
│   ├── AnimatedBackground.tsx   # Photo layer + gradient overlay + particles
│   ├── WeatherParticles.tsx     # Rain, snow, star, fog effects
│   ├── WeatherHero.tsx          # Temperature, city, live clock, condition
│   ├── WeatherDetails.tsx       # Humidity, wind, feels like, cloud
│   ├── SearchPanel.tsx          # Slide-in search + quick cities
│   ├── RecentCities.tsx         # Recently searched glass cards
│   ├── StaticPageShell.tsx      # Shared layout for About/Privacy/Terms
│   └── skeletons/
│       ├── WeatherHeroSkeleton.tsx
│       └── WeatherDetailsSkeleton.tsx
├── lib/
│   ├── weather.ts               # Fetch helper
│   └── constants.ts             # Condition → background/gradient/particle map
└── types/
    └── weather.ts               # WeatherAPI response types
tests/
├── home.spec.ts
├── search.spec.ts
└── navigation.spec.ts
```
