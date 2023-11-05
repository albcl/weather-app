import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSearch } from "@components/LocationSearch/hooks";
import { ERROR_MESSAGES } from "@errors/errors";

describe("useSearch - hooks", () => {
  it("should return default search value", () => {
    const { result } = renderHook(() => useSearch());
    const expected = "";
    expect(result.current.search).toBe(expected);
  });

  it("should return no error", () => {
    const { result } = renderHook(() => useSearch());
    const expected = undefined;
    expect(result.current.error).toBe(expected);
  });

  it("should update search value", () => {
    const { result, rerender } = renderHook(() => useSearch());
    const expected = "";
    expect(result.current.search).toBe(expected);

    const newSearch = "a new search";
    result.current.setSearch(newSearch);
    rerender();

    expect(result.current.search).toBe(newSearch);
  });

  const errorCases = [
    { search: "123", expected: ERROR_MESSAGES.NO_NUMBERS_ALLOWED },
    { search: "abc1abc", expected: ERROR_MESSAGES.NO_NUMBERS_ALLOWED },
    { search: " ", expected: ERROR_MESSAGES.NO_EMPTY_SEARCH },
  ];
  it.each(errorCases)(
    "should return error - $expected",
    ({ search, expected }) => {
      const { result, rerender } = renderHook(() => useSearch());
      result.current.setSearch(search);
      rerender();

      expect(result.current.error).toBe(expected);
    }
  );

  it("should clear previous error", () => {
    const { result, rerender } = renderHook(() => useSearch());

    result.current.setSearch("123");
    rerender();

    expect(result.current.error).toBe(ERROR_MESSAGES.NO_NUMBERS_ALLOWED);

    result.current.setSearch("abc");
    rerender();

    expect(result.current.error).toBeUndefined();
  });
});
