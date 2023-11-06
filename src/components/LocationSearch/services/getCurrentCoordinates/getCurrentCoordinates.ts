import {
  GeolocationError,
  NoNavigatorAvailable,
} from "@errors/createErrorFactory";
import { GEOLOCATION_ERRORS } from "@errors/errors";

import type { CoordsType } from "src/type";

function errorCallback(error: GeolocationPositionError) {
  if (error.code === 1) {
    return new GeolocationError(GEOLOCATION_ERRORS.PERMISSION_DENIED);
  } else if (error.code === 2) {
    return new GeolocationError(GEOLOCATION_ERRORS.POSITION_UNAVAILABLE);
  } else if (error.code === 3) {
    return new GeolocationError(GEOLOCATION_ERRORS.TIMEOUT);
  } else {
    return new GeolocationError(GEOLOCATION_ERRORS.GENERIC);
  }
}

export async function getCurrentCoordinates(): Promise<CoordsType> {
  return await new Promise((resolve, reject) => {
    if (!(navigator && "geolocation" in navigator))
      reject(new NoNavigatorAvailable(GEOLOCATION_ERRORS.NOT_SUPPORTED));

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude: lat, longitude: lon } = position.coords;
        resolve({ lat, lon });
      },
      (error: GeolocationPositionError) => {
        reject(errorCallback(error));
      }
    );
  });
}
