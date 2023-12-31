export const enum ERROR_MESSAGES {
  NO_EMPTY_SEARCH = "It can't be an empty search",
  NO_NUMBERS_ALLOWED = "Numbers are not allowed here",
  UNAUTHORIZED = "Oops! It seems we're not authorized to access the resource at the moment. We are fixing it!",
  URL_NOT_FOUND = "There was a problem with the request. Let us know if it persists",
  SERVICE_DOWN = "Uh-oh! The service doesn't seem to be currently available. Try a bit later!",
  REQUEST_ERROR = "There has been an error with your request. Please, try again later and let us know if it persists",
}

export const enum GEOLOCATION_ERRORS {
  PERMISSION_DENIED = "You've decided not to share your position, but it's OK. We won't ask you again.",
  POSITION_UNAVAILABLE = "The network is down or the positioning service can't be reached.",
  TIMEOUT = "The attempt timed out before it could get the location data.",
  GENERIC = "Geolocation failed due to unknown error.",
  NOT_SUPPORTED = "Your browser doesn't support this feature",
}
