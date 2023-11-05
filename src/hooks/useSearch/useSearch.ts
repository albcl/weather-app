import { useEffect, useState } from "react";
import { VALIDATION_ERRORS } from "src/errors";

export function useSearch() {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (search === " ") {
      setError(VALIDATION_ERRORS.NO_EMPTY_SEARCH);
      return;
    }

    if (search.match(/[0-9]/) !== null) {
      setError(VALIDATION_ERRORS.NO_NUMBERS_ALLOWED);
      return;
    }

    setError(undefined);
  }, [search]);

  return { search, setSearch, error };
}
