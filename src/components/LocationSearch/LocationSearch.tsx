import type { ChangeEvent, FormEvent } from "react";

import { useLocation, useSearch } from "@components/LocationSearch/hooks";

import type { CoordsType } from "src/type";

type LocationSearchProps = {
  setLocation: React.Dispatch<React.SetStateAction<CoordsType | undefined>>;
};

export const LocationSearch = ({ setLocation }: LocationSearchProps) => {
  const { search, setSearch, error, setError } = useSearch();
  const { getCoords } = useLocation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error) {
      getCoords(search).then(setLocation).catch(setError);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearch(search);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          aria-invalid={!!error}
          aria-describedby={"error"}
          name="query"
          type="text"
          placeholder="London"
          required
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && (
        <p id="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </>
  );
};
