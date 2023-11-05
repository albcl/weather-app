import { ServiceDown, URLNotFound, Unauthorized } from "./createErrorFactory";
import { ERROR_MESSAGES } from "./errors";

export function handleError(code: number) {
  if (code === 401) {
    throw new Unauthorized(ERROR_MESSAGES.UNAUTHORIZED);
  }

  if (code === 404) {
    throw new URLNotFound(ERROR_MESSAGES.URL_NOT_FOUND);
  }

  if (code === 500) {
    throw new ServiceDown(ERROR_MESSAGES.SERVICE_DOWN);
  }

  throw new Error(ERROR_MESSAGES.REQUEST_ERROR);
}
