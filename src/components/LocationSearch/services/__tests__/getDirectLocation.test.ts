import { describe, expect, it, vi } from "vitest";
import { getDirectLocation } from "..";
import {
  PlaceNotFound,
  ServiceDown,
  URLNotFound,
  Unauthorized,
} from "@errors/createErrorFactory";

describe("getDirectLocation - services", () => {
  const cases = [
    { status: 401, expected: Unauthorized },
    { status: 404, expected: URLNotFound },
    { status: 500, expected: ServiceDown },
    { status: 0, expected: Error },
  ];
  it.each(cases)(
    "should throw handled $status status error - $expected",
    async ({ status, expected }) => {
      const spy = vi
        .spyOn(window, "fetch")
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        .mockResolvedValue({ ok: false, status } as Response);

      await expect(getDirectLocation("")).rejects.toBeInstanceOf(expected);
    }
  );

  it("should throw error if location doesn't exist", async () => {
    const spy = vi
      .spyOn(window, "fetch")
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: () => ({}),
      } as Response);

    await expect(getDirectLocation("")).rejects.toBeInstanceOf(PlaceNotFound);

    const VITE_GEOCODING_DIRECT_URL = import.meta.env.VITE_GEOCODING_DIRECT_URL;
    expect(spy).toBeCalledWith(
      expect.stringMatching(VITE_GEOCODING_DIRECT_URL)
    );
  });

  it("should return whole location", async () => {
    const response = {
      lat: 51.5073219,
      lon: -0.1276474,
      name: "London",
      country: "GB",
      state: "England",
    };

    const spy = vi
      .spyOn(window, "fetch")
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .mockResolvedValue({
        ok: true,
        json: async () => [response],
      } as Response);

    await expect(getDirectLocation(response.name)).resolves.toEqual(response);

    const VITE_GEOCODING_DIRECT_URL = import.meta.env.VITE_GEOCODING_DIRECT_URL;
    expect(spy).toBeCalledWith(
      expect.stringMatching(VITE_GEOCODING_DIRECT_URL)
    );

    expect(spy).toBeCalledWith(expect.stringMatching(response.name));
  });
});
