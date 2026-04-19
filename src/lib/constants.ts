export const QUICK_CITIES = [
  'Toronto', 'New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Dubai', 'Los Angeles',
];

export type ParticleType = 'none' | 'stars' | 'clouds' | 'fog' | 'rain' | 'storm' | 'snow';

export interface ConditionAssets {
  gradient: string;
  particles: ParticleType;
  bgDay: string;
  bgNight: string;
}

const ASSETS: Record<string, ConditionAssets> = {
  sunny: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(26,23,19,0.92))',
    particles: 'none',
    bgDay: '/img/day/clear2.jpg',
    bgNight: '/img/night/clear2.jpg',
  },
  clear_night: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(26,23,19,0.95))',
    particles: 'stars',
    bgDay: '/img/day/clear2.jpg',
    bgNight: '/img/night/clear1.jpg',
  },
  partly_cloudy: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(26,23,19,0.92))',
    particles: 'clouds',
    bgDay: '/img/day/cloudy.jpg',
    bgNight: '/img/night/cloudy.jpg',
  },
  overcast: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(26,23,19,0.9))',
    particles: 'fog',
    bgDay: '/img/day/overcast.jpg',
    bgNight: '/img/night/overcast.jpg',
  },
  rain: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(26,23,19,0.92))',
    particles: 'rain',
    bgDay: '/img/day/rain.jpg',
    bgNight: '/img/night/rain.jpg',
  },
  thunderstorm: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(26,23,19,0.95))',
    particles: 'storm',
    bgDay: '/img/day/thunder.jpg',
    bgNight: '/img/night/thunder.jpg',
  },
  snow: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(26,23,19,0.90))',
    particles: 'snow',
    bgDay: '/img/day/snow.jpg',
    bgNight: '/img/night/snow.jpg',
  },
  fog: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(26,23,19,0.9))',
    particles: 'fog',
    bgDay: '/img/day/overcast.jpg',
    bgNight: '/img/night/overcast.jpg',
  },
  default: {
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(26,23,19,0.9))',
    particles: 'none',
    bgDay: '/img/hero-cloud.jpg',
    bgNight: '/img/hero-cloud.jpg',
  },
};

function getKey(code: number, isDay: number): string {
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 'thunderstorm';
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return 'snow';
  if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) return 'rain';
  if ([1030, 1135, 1147].includes(code)) return 'fog';
  if (code === 1009) return 'overcast';
  if ([1003, 1006].includes(code)) return 'partly_cloudy';
  if (code === 1000) return isDay ? 'sunny' : 'clear_night';
  return 'default';
}

export function getConditionAssets(code: number, isDay: number): ConditionAssets {
  return ASSETS[getKey(code, isDay)] ?? ASSETS.default;
}

// Keep for backwards compat with any leftover imports
export function getGradientConfig(code: number, isDay: number) {
  const a = getConditionAssets(code, isDay);
  return { gradient: a.gradient, particles: a.particles };
}
