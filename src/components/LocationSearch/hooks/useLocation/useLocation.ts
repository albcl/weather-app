import { ERROR_MESSAGES } from "@errors/errors";
import { NoEmptySearch } from "@errors/createErrorFactory";

import { getDirectLocation } from "../../services";

import type { CoordsType } from "src/type";

export function useLocation() {
  const getCoords = async (search: string): Promise<CoordsType> => {
    if (!search || search === "") {
      throw new NoEmptySearch(ERROR_MESSAGES.NO_EMPTY_SEARCH);
    }

    return await getDirectLocation(search).then((location) => {
      const { lat, lon } = location;
      return { lat: lat.toString(), lon: lon.toString() };
    });
  };

  return { getCoords };
}
