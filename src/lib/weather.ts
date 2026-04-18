import type { WeatherData, WeatherError } from "@/types/weather";

export async function fetchWeather(city: string): Promise<WeatherData> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
    cache: "no-store",
  });

  const data: WeatherData | WeatherError = await res.json();

  if ("error" in data) {
    throw new Error(data.error);
  }

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return data;
}
