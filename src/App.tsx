import { useState } from "react";

import { LocationSearch } from "@components/LocationSearch";
import { Forecast } from "@components/Forecast";
import { CurrentWeather } from "@components/CurrentWeather";
import { Card } from "@components/Card";

import type { CoordsType } from "./type";

function App() {
  const [location, setLocation] = useState<CoordsType>();

  return (
    <>
      <Card.CurrentWeather>
        <LocationSearch setLocation={setLocation} />
        <CurrentWeather location={location} />
      </Card.CurrentWeather>
      <Forecast location={location} />
    </>
  );
}

export default App;
