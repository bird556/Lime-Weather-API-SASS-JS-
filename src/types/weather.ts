export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherCurrent {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  cloud: number;
  is_day: number;
  condition: WeatherCondition;
}

export interface WeatherLocation {
  name: string;
  country: string;
  localtime: string;
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface WeatherError {
  error: string;
}

export type WeatherResponse = WeatherData | WeatherError;
