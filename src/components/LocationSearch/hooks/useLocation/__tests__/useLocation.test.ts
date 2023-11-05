import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useLocation } from "..";

import { ERROR_MESSAGES } from "@errors/errors";
import { PlaceNotFound } from "@errors/createErrorFactory";

const mocks = vi.hoisted(() => {
  return {
    location: vi.fn(),
  };
});

vi.mock("@components/LocationSearch/services", () => ({
  getDirectLocation: mocks.location,
}));

describe("useLocation - hooks", () => {
  it("should throw error for empty search", async () => {
    const { result } = renderHook(() => useLocation());

    try {
      const res = await result.current.getCoords("");
      expect(res).toBeUndefined();
    } catch (error) {
      expect(error).toEqual(Error(ERROR_MESSAGES.NO_EMPTY_SEARCH));
    }
  });

  it("should return string lat/lon coordinates", async () => {
    const coords = { lat: 51.5073219, lon: -0.1276474 };

    mocks.location.mockResolvedValue({
      ...coords,
      name: "London",
      country: "GB",
      state: "England",
    });

    const { result } = renderHook(() => useLocation());

    const res = await result.current.getCoords("London").then((res) => res);

    expect(res).toEqual({
      lat: coords.lat.toString(),
      lon: coords.lon.toString(),
    });
  });

  it("should return 'Place not found' Error", async () => {
    mocks.location.mockRejectedValue(new PlaceNotFound(""));

    const { result } = renderHook(() => useLocation());

    try {
      const res = await result.current.getCoords("somewhere");
      expect(res).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(PlaceNotFound);
    }
  });
});
