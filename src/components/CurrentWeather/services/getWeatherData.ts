import { getWeatherURL } from "@services/config";
import { handleError } from "@errors/errorHandling";

import type { CoordsType } from "src/type";
import type { WeatherType } from "../type";
import type { WeatherAPIResultsProps } from "./type";

function mapFromApiToWeather(data: WeatherAPIResultsProps): WeatherType {
  return {
    clouds: data.clouds.all,
    temp: {
      current: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
      humidity: Math.round(data.main.humidity),
      pressure: Math.round(data.main.pressure),
    },
    rain: data.rain?.["1h"],
    windSpeed: data.wind.speed,
    weather: {
      current: data.weather[0].description,
      icon: data.weather[0].icon,
      id: data.weather[0].id,
    },
  };
}

export async function getWeatherData(location: CoordsType): Promise<any> {
  const url = getWeatherURL(location);

  return await fetch(url)
    .then((response) => {
      if (!response.ok) {
        handleError(response.status);
      }
      return response;
    })
    .then(async (response) => await response.json())
    .then(mapFromApiToWeather);
}
