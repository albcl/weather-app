import { describe, expect, it, vi } from "vitest";
import {
  PlaceNotFound,
  ServiceDown,
  URLNotFound,
  Unauthorized,
} from "@errors/createErrorFactory";
import { getLocation } from "../getLocation";

describe("getLocation - services", () => {
  const cases = [
    { status: 401, expected: Unauthorized },
    { status: 404, expected: URLNotFound },
    { status: 500, expected: ServiceDown },
    { status: 0, expected: Error },
  ];
  it.each(cases)(
    "should throw handled $status status error",
    async ({ status, expected }) => {
      vi.spyOn(window, "fetch")
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        .mockResolvedValue({ ok: false, status } as Response);

      await expect(getLocation("http://")).rejects.toBeInstanceOf(expected);
    }
  );

  it("should throw error if location doesn't exist", async () => {
    // Mock successful response with no data
    vi.spyOn(window, "fetch")
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: () => ({}),
      } as Response);

    await expect(getLocation("http://")).rejects.toBeInstanceOf(PlaceNotFound);
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

    await expect(getLocation("http://")).resolves.toEqual(response);

    expect(spy).toBeCalled();
  });
});
