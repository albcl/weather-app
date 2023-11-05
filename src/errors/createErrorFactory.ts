const createErrorFactory = function (name: string) {
  return class CustomError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
};

export const PlaceNotFound = createErrorFactory("PlaceNotFound");
export const URLNotFound = createErrorFactory("URLNotFound");
export const Unauthorized = createErrorFactory("Unauthorized");
export const ServiceDown = createErrorFactory("ServiceDown");
export const NoEmptySearch = createErrorFactory("NoEmptySearch");
