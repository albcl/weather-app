import { getGeocodingReverseURL } from "@services/config";
import { getLocation } from "@services/getLocation";

import type { CoordsType, LocationType } from "src/type";

export async function getLocationByCoords(
  coords: CoordsType
): Promise<LocationType> {
  const url = getGeocodingReverseURL(coords);
  return await getLocation(url);
}
