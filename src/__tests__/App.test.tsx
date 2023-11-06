/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "src/App";
import { afterEach, describe, expect, it, vi } from "vitest";

import locationMock from "./__mocks__/location.json";
import weatherMock from "./__mocks__/weather.json";

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", () => {
    render(<App />);

    expect(screen.getByRole("search")).toBeDefined();
  });

  it("should search and get current weather", async () => {
    vi.spyOn(window, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => locationMock,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => weatherMock,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          list: [weatherMock],
        }),
      } as Response);

    render(<App />);

    const searchForm = screen.getByRole("search");

    fireEvent.change(searchForm, { target: { value: "London" } });
    fireEvent.submit(searchForm);

    expect(fetch).toHaveBeenCalledWith(expect.stringMatching("q=London"));

    await waitFor(() => {
      const weatherDescription = screen.getAllByText("light rain");

      // We have used the same weather data for the current and forecast api response
      expect(weatherDescription.length).toBe(2);
    });

    expect(fetch).toBeCalledTimes(3);
  });
});
