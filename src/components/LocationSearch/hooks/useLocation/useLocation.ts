import { useState } from "react";

import { ERROR_MESSAGES } from "@errors/errors";
import { NoEmptySearch } from "@errors/createErrorFactory";

import {
  getCurrentCoordinates,
  getDirectLocation,
  getLocationByCoords,
} from "../../services";

import type { CoordsType, LocationType } from "src/type";

export function useLocation() {
  const [loadingGeolocation, setLoadingGeolocation] = useState(false);

  const getCoords = async (search: string): Promise<CoordsType> => {
    if (!search || search === "") {
      throw new NoEmptySearch(ERROR_MESSAGES.NO_EMPTY_SEARCH);
    }

    return await getDirectLocation(search).then((location) => {
      const { lat, lon } = location;
      return { lat, lon };
    });
  };

  const getGeolocation = async (): Promise<LocationType> => {
    setLoadingGeolocation(true);
    try {
      const { lat, lon } = await getCurrentCoordinates();
      const locationData = await getLocationByCoords({ lat, lon });

      setLoadingGeolocation(false);
      return locationData;
    } catch (error) {
      setLoadingGeolocation(false);
      throw error;
    }
  };

  return { getCoords, getGeolocation, loadingGeolocation };
}
