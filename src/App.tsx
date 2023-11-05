import { useState } from "react";

import { Card } from "@components/Card";
import { LocationSearch } from "@components/LocationSearch";

import type { CoordsType } from "./type";

function App() {
  const [location, setLocation] = useState<CoordsType>();

  return (
    <Card>
      <LocationSearch setLocation={setLocation} />
      <p>{`lat: ${location?.lat}, lon: ${location?.lon}`}</p>
    </Card>
  );
}

export default App;
