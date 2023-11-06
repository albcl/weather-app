import { getWeatherData } from "src/components/CurrentWeather/services";

import type { CoordsType } from "src/type";

export function useWeather() {
  const getWeather = async (location: CoordsType | undefined): Promise<any> => {
    if (location) {
      return await getWeatherData(location);
    }
  };
  return { getWeather };
}
