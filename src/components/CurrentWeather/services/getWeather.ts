import { getWeatherData } from "@services/getWeatherData";
import { getWeatherURL } from "@services/config";

import type { CoordsType } from "src/type";
import type { WeatherType } from "@services/type";

export async function getWeather(location: CoordsType): Promise<WeatherType[]> {
  const url = getWeatherURL(location);
  return await getWeatherData(url);
}
