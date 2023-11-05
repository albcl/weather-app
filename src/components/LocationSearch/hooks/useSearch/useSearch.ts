import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "@errors/errors";

export function useSearch() {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (search === " ") {
      setError(ERROR_MESSAGES.NO_EMPTY_SEARCH);
      return;
    }

    if (search.match(/[0-9]/) !== null) {
      setError(ERROR_MESSAGES.NO_NUMBERS_ALLOWED);
      return;
    }

    setError(undefined);
  }, [search]);

  return { search, setSearch, error, setError };
}
