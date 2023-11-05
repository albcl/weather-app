import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSearch } from "src/hooks/useSearch/useSearch";
import { VALIDATION_ERRORS } from "src/errors";

describe("useSearch - hooks", () => {
  it("should return default search value", () => {
    const hook = renderHook(() => useSearch());
    const expected = "";
    expect(hook.result.current.search).toBe(expected);
  });

  it("should return no error", () => {
    const hook = renderHook(() => useSearch());
    const expected = undefined;
    expect(hook.result.current.error).toBe(expected);
  });

  it("should update search value", () => {
    const hook = renderHook(() => useSearch());
    const expected = "";
    expect(hook.result.current.search).toBe(expected);

    const newSearch = "a new search";
    hook.result.current.setSearch(newSearch);
    hook.rerender();

    expect(hook.result.current.search).toBe(newSearch);
  });

  const errorCases = [
    { search: "123", expected: VALIDATION_ERRORS.NO_NUMBERS_ALLOWED },
    { search: "abc1abc", expected: VALIDATION_ERRORS.NO_NUMBERS_ALLOWED },
    { search: " ", expected: VALIDATION_ERRORS.NO_EMPTY_SEARCH },
  ];
  it.each(errorCases)(
    "should return error - $expected",
    ({ search, expected }) => {
      const hook = renderHook(() => useSearch());
      hook.result.current.setSearch(search);
      hook.rerender();

      expect(hook.result.current.error).toBe(expected);
    }
  );

  it("should clear previous error", () => {
    const hook = renderHook(() => useSearch());

    hook.result.current.setSearch("123");
    hook.rerender();

    expect(hook.result.current.error).toBe(
      VALIDATION_ERRORS.NO_NUMBERS_ALLOWED
    );

    hook.result.current.setSearch("abc");
    hook.rerender();

    expect(hook.result.current.error).toBeUndefined();
  });
});
