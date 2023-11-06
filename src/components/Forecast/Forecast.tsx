import { WeatherDisplay } from "../WeatherDisplay";

import * as S from "./style";
import type { CoordsType } from "src/type";

import { useWeather } from "src/hooks";
import { getForecast } from "./services";
import { Card } from "../Card";

export function Forecast({ location }: { location: CoordsType | undefined }) {
  const { weather, error } = useWeather(location, getForecast);
  return (
    <Card.Forecast>
      <h3>3 hours forecast</h3>
      {weather && !error && (
        <S.HoursList>
          {weather.map((singleHour) => (
            <WeatherDisplay
              key={singleHour.id}
              data={singleHour}
              isLoading={!location}
            />
          ))}
        </S.HoursList>
      )}
    </Card.Forecast>
  );
}
