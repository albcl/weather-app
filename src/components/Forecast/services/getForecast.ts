import { getForecastURL } from "@services/config";
import { getWeatherData } from "@services/getWeatherData";

import type { WeatherType } from "src/services/type";
import type { CoordsType } from "src/type";

export async function getForecast(
  location: CoordsType
): Promise<WeatherType[]> {
  const url = getForecastURL(location);
  return await getWeatherData(url);
}
