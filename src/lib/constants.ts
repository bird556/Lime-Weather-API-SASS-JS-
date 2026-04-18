export const QUICK_CITIES = [
  "Toronto",
  "New York",
  "London",
  "Tokyo",
  "Sydney",
  "Paris",
  "Dubai",
  "Los Angeles",
];

export interface GradientConfig {
  gradient: string;
  particles: "none" | "stars" | "clouds" | "fog" | "rain" | "storm" | "snow";
}

export const CONDITION_GRADIENTS: Record<string, GradientConfig> = {
  sunny: {
    gradient: "linear-gradient(135deg, #f59e0b 0%, #1e3a5f 100%)",
    particles: "none",
  },
  clear_night: {
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
    particles: "stars",
  },
  partly_cloudy: {
    gradient: "linear-gradient(135deg, #4b6cb7 0%, #1e2a3a 100%)",
    particles: "clouds",
  },
  overcast: {
    gradient: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    particles: "fog",
  },
  rain: {
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #0a0a0f 100%)",
    particles: "rain",
  },
  thunderstorm: {
    gradient: "linear-gradient(135deg, #2d1b69 0%, #0a0a0f 100%)",
    particles: "storm",
  },
  snow: {
    gradient: "linear-gradient(135deg, #bfdbfe 0%, #6b7280 100%)",
    particles: "snow",
  },
  fog: {
    gradient: "linear-gradient(135deg, #9ca3af 0%, #374151 100%)",
    particles: "fog",
  },
  default: {
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #0a0a0f 100%)",
    particles: "none",
  },
};

export function getGradientConfig(code: number, isDay: number): GradientConfig {
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return CONDITION_GRADIENTS.thunderstorm;
  // Snow
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return CONDITION_GRADIENTS.snow;
  // Rain / Drizzle
  if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) return CONDITION_GRADIENTS.rain;
  // Fog / Mist
  if ([1030, 1135, 1147].includes(code)) return CONDITION_GRADIENTS.fog;
  // Overcast
  if (code === 1009) return CONDITION_GRADIENTS.overcast;
  // Partly Cloudy / Cloudy
  if ([1003, 1006].includes(code)) return CONDITION_GRADIENTS.partly_cloudy;
  // Clear / Sunny
  if (code === 1000) return isDay ? CONDITION_GRADIENTS.sunny : CONDITION_GRADIENTS.clear_night;

  return CONDITION_GRADIENTS.default;
}
