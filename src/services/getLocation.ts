import { PlaceNotFound } from "@errors/createErrorFactory";
import { handleError } from "@errors/errorHandling";

import type { LocationAPIResults } from "src/type";

export async function getLocation(url: string) {
  return await fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        handleError(response.status);
      }

      return await response.json();
    })
    .then((data: Array<LocationAPIResults | never>) => {
      if (!data.length) {
        throw new PlaceNotFound(
          "Check again. That place doesn't seem to be on earth"
        );
      }

      const { lat, lon, name, country, state } = data[0];
      return { lat, lon, name, country, state };
    });
}
