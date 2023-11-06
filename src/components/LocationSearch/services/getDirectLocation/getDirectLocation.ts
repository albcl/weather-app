import { getGeocodingDirectURL } from "@services/config";
import { getLocation } from "@services/getLocation";

import type { LocationType } from "src/type";

export async function getDirectLocation(search: string): Promise<LocationType> {
  const url = getGeocodingDirectURL(search);
  return await getLocation(url);
}
