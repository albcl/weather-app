import { useEffect, useState } from "react";

import type { CoordsType } from "src/type";
import type { WeatherType } from "@services/type";

export function useWeather(
  location: CoordsType | undefined,
  service: (location: CoordsType) => Promise<WeatherType[]>
) {
  const [weather, setWeather] = useState<WeatherType[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (location) {
      setError(undefined);
      getWeather(location)
        .then(setWeather)
        .catch((e) => {
          setError(e.message);
        });
    }
  }, [location]);

  const getWeather = async (location: CoordsType): Promise<WeatherType[]> => {
    return await service(location);
  };

  return { weather, error };
}
