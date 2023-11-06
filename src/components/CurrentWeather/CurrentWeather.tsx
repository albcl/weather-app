import type { CurrentWeatherProps } from "./type";

import { getPressureLevel, getRainfallLevel, getWindLevel } from "./utils";

import * as S from "./style";

export function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data) return;

  const { temp, weather, rain, windSpeed } = data;
  const rainfall = rain ?? 0;

  return (
    <S.Panel>
      <S.Section>
        <img
          src={`${import.meta.env.VITE_WEATHER_ICON_URL}/${
            weather.icon
          }@4x.png`}
          width={150}
          height={150}
        />
        {weather.current}
      </S.Section>
      <S.Section>
        <S.CurrentTemperature>{temp.current}</S.CurrentTemperature>
        <S.FeelsLike>{`Feels like ${temp.feelsLike} Cº`}</S.FeelsLike>
      </S.Section>
      <S.Details>
        <ul>
          <li>
            <span>Rain volume</span>
            <S.Value>
              <S.ScaleIcon color={getRainfallLevel(rainfall)} />
              {rainfall} mm
            </S.Value>
          </li>
          <li>
            <span>Wind speed</span>{" "}
            <S.Value>
              <S.ScaleIcon color={getWindLevel(windSpeed)} />
              {windSpeed} m/s
            </S.Value>
          </li>
          <li>
            <span>Humidity</span>
            <S.Value>
              <S.ScaleIcon color={getWindLevel(temp.humidity)} />
              {temp.humidity}%
            </S.Value>
          </li>
          <li>
            <span>Pressure</span>
            <S.Value>
              <S.ScaleIcon color={getPressureLevel(temp.pressure)} />
              {temp.pressure} hPa
            </S.Value>
          </li>
        </ul>
      </S.Details>
    </S.Panel>
  );
}
