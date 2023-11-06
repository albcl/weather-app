import { useState } from "react";

import { ERROR_MESSAGES } from "@errors/errors";
import {
  NoEmptySearch,
  NoNavigatorAvailable,
} from "@errors/createErrorFactory";

import {
  getCurrentCoordinates,
  getDirectLocation,
  getLocationByCoords,
} from "../../services";

import type { CoordsType } from "src/type";

export function useLocation() {
  const [loadingGeolocation, setLoadingGeolocation] = useState(false);

  const getCoords = async (search: string): Promise<CoordsType> => {
    if (!search || search === "") {
      throw new NoEmptySearch(ERROR_MESSAGES.NO_EMPTY_SEARCH);
    }

    return await getDirectLocation(search).then((location) => {
      const { lat, lon } = location;
      return { lat: lat.toString(), lon: lon.toString() };
    });
  };

  const getGeolocation = async (): Promise<any> => {
    setLoadingGeolocation(true);
    try {
      const { lat, lon } = await getCurrentCoordinates();
      const locationData = await getLocationByCoords({ lat, lon });

      setLoadingGeolocation(false);
      return locationData;
    } catch (error) {
      setLoadingGeolocation(false);

      if (error instanceof NoNavigatorAvailable) return;
      throw error;
    }
  };

  return { getCoords, getGeolocation, loadingGeolocation };
}
