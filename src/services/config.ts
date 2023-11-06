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
    lat: coords.lat,
    lon: coords.lon,
    limit: "1",
    appid: import.meta.env.VITE_API_KEY ?? "",
  };
  const queryParams = new URLSearchParams(params).toString();

  return `${VITE_API_URL}${VITE_GEOCODING_REVERSE_URL}?${queryParams}`;
}
