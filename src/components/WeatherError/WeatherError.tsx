import * as S from "./style";

export function WeatherError({ errorMessage }: { errorMessage: string }) {
  const stormIcon = "11d";
  return (
    <S.Panel>
      <img
        src={`${import.meta.env.VITE_WEATHER_ICON_URL}/${stormIcon}@4x.png`}
        width={150}
        height={150}
      />

      <p>{errorMessage}</p>
    </S.Panel>
  );
}
