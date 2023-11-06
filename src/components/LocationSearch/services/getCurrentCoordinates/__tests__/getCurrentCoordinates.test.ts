import { describe, expect, it, vi } from "vitest";

import {
  GeolocationError,
  NoNavigatorAvailable,
} from "@errors/createErrorFactory";

import { getCurrentCoordinates } from "..";

describe("getCurrentCoordinates - services", () => {
  it("should throw if 'navigator' isn't available", async () => {
    const prevNavigator = window.navigator;

    // Get rid of navigator
    Object.defineProperty(window, "navigator", {
      get() {
        return null;
      },
    });

    await expect(getCurrentCoordinates()).rejects.toBeInstanceOf(
      NoNavigatorAvailable
    );

    // Set back navigator
    Object.defineProperty(window, "navigator", {
      get() {
        return prevNavigator;
      },
    });
  });

  it("should throw geolocation errors", async () => {
    // Mock the geolocation object
    const mockedGeolocation = {
      getCurrentPosition: vi.fn((success, error) => {
        success({});
        error({
          error: {
            code: 1,
          },
        });
      }),
    };

    // Define 'geolocation' for the test
    Object.defineProperty(window.navigator, "geolocation", {
      writable: true,
      value: mockedGeolocation,
    });

    await expect(getCurrentCoordinates()).rejects.toBeInstanceOf(
      GeolocationError
    );
  });

  it("should return latitud and longitude", async () => {
    const expected = {
      latitude: 1,
      longitude: 2,
    };

    // Mock the geolocation object
    const mockedGeolocation = {
      getCurrentPosition: vi.fn((success) => {
        success({
          coords: {
            ...expected,
            accuracy: 3,
            speed: 4,
          },
        });
      }),
    };

    // Define 'geolocation' for the test
    Object.defineProperty(window.navigator, "geolocation", {
      writable: true,
      value: mockedGeolocation,
    });

    await expect(getCurrentCoordinates()).resolves.toEqual({
      lat: expected.latitude,
      lon: expected.longitude,
    });

    // Get rid of geolocation and leave navigator as it was
    Object.defineProperty(window.navigator, "geolocation", {
      value: null,
    });
  });
});
