import { WeatherDisplay } from "../WeatherDisplay";
import { WeatherError } from "../WeatherError";

import { useWeather } from "@hooks/index";

import { getWeather } from "./services";

import type { CurrentWeatherProps } from "./type";

export function CurrentWeather({ location }: CurrentWeatherProps) {
  const { weather, error } = useWeather(location, getWeather);

  return !error ? (
    weather && <WeatherDisplay data={weather[0]} isLoading={!location} />
  ) : (
    <WeatherError
      errorMessage={
        "There has been an error with your request. Please, try again later and let us know if it persists"
      }
    />
  );
}
