import { handleError } from "@errors/errorHandling";

import type { APIResults } from "./type";
import type { WeatherType } from "src/services/type";

function mapFromApiToWeather(data: APIResults): WeatherType {
  return {
    id: data.dt,
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

export async function getWeatherData(url: string): Promise<WeatherType[]> {
  return await fetch(url)
    .then((response) => {
      if (!response.ok) {
        handleError(response.status);
      }
      return response;
    })
    .then(async (response) => await response.json())
    .then((data) => {
      if (data.list) return data.list.slice(0, 3);
      return [data];
    })
    .then((dataList) =>
      dataList.map((singleHour: APIResults) => mapFromApiToWeather(singleHour))
    );
}
