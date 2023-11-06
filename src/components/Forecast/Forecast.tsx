import { WeatherDisplay } from "../WeatherDisplay";
import { Card } from "../Card";

import { useWeather } from "src/hooks";

import { getForecast } from "./services";

import type { ForecastWeatherProps } from "./type";
import * as S from "./style";

export function Forecast({ location }: ForecastWeatherProps) {
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
