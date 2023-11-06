import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import { LocationSearch } from "@components/LocationSearch";
import { CurrentWeather } from "@components/CurrentWeather";
import { useWeather } from "@components/CurrentWeather/hooks";

import type { CoordsType } from "./type";
import type { WeatherType } from "@components/CurrentWeather/type";

import * as S from "./style";

function App() {
  const [location, setLocation] = useState<CoordsType>();
  const [weather, setWeather] = useState<WeatherType>();
  const { getWeather } = useWeather();

  useEffect(() => {
    getWeather(location)
      .then((r) => {
        setWeather(r);
      })
      .catch((e) => console.error(e));
  }, [location]);

  return (
    <Card>
      <S.Main>
        <LocationSearch setLocation={setLocation} />
        <CurrentWeather data={weather} />
      </S.Main>
    </Card>
  );
}

export default App;
