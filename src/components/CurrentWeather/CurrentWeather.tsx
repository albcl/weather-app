import { WeatherDisplay } from "../WeatherDisplay";
import { WeatherError } from "../WeatherError";

import { useWeather } from "@hooks/index";

import { getWeather } from "./services";

import type { CurrentWeatherProps } from "./type";
import { ERROR_MESSAGES } from "src/errors/errors";

export function CurrentWeather({ location }: CurrentWeatherProps) {
  const { weather, error } = useWeather(location, getWeather);

  return !error ? (
    weather && <WeatherDisplay data={weather[0]} isLoading={!location} />
  ) : (
    <WeatherError errorMessage={ERROR_MESSAGES.REQUEST_ERROR} />
  );
}
