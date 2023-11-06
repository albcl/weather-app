import type { CoordsType } from "src/type";

export function getGeocodingDirectURL(search: string) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const VITE_GEOCODING_DIRECT_URL = import.meta.env.VITE_GEOCODING_DIRECT_URL;

  const params = {
    q: search,
    limit: "1",
    appid: import.meta.env.VITE_API_KEY ?? "",
  };
  const queryParams = new URLSearchParams(params).toString();

  return `${VITE_API_URL}${VITE_GEOCODING_DIRECT_URL}?${queryParams}`;
}

export function getGeocodingReverseURL(coords: CoordsType) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const VITE_GEOCODING_REVERSE_URL = import.meta.env.VITE_GEOCODING_REVERSE_URL;

  const params = {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
    limit: "1",
    appid: import.meta.env.VITE_API_KEY ?? "",
  };
  const queryParams = new URLSearchParams(params).toString();

  return `${VITE_API_URL}${VITE_GEOCODING_REVERSE_URL}?${queryParams}`;
}

export function getWeatherURL(coords: CoordsType) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const VITE_WEATHER_URL = import.meta.env.VITE_WEATHER_URL;

  const params = {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
    units: "metric",
    appid: import.meta.env.VITE_API_KEY ?? "",
  };
  const queryParams = new URLSearchParams(params).toString();

  return `${VITE_API_URL}${VITE_WEATHER_URL}?${queryParams}`;
}

export function getForecastURL(coords: CoordsType) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const VITE_FORECAST_URL = import.meta.env.VITE_FORECAST_URL;

  const params = {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
    units: "metric",
    appid: import.meta.env.VITE_API_KEY ?? "",
  };
  const queryParams = new URLSearchParams(params).toString();

  return `${VITE_API_URL}${VITE_FORECAST_URL}?${queryParams}`;
}
