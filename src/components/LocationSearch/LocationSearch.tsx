import type { ChangeEvent, FormEvent, MouseEvent } from "react";

import {
  useLocation,
  useGeolocation,
  useSearch,
} from "@components/LocationSearch/hooks";

import type { CoordsType } from "src/type";

type LocationSearchProps = {
  setLocation: React.Dispatch<React.SetStateAction<CoordsType | undefined>>;
};

export const LocationSearch = ({ setLocation }: LocationSearchProps) => {
  const { search, setSearch, error, setError } = useSearch();
  const { getCoords, getGeolocation, loadingGeolocation } = useLocation();
  const { displayGeolocation } = useGeolocation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearch(search);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error) {
      getCoords(search).then(setLocation).catch(setError);
    }
  };

  const handleGeoLocation = () => {
    getGeolocation().then(setLocation).catch(setError);
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
        {displayGeolocation && (
          <button
            disabled={loadingGeolocation}
            type="button"
            onClick={handleGeoLocation}
          >
            {!loadingGeolocation ? "Icon" : "Loading"}
          </button>
        )}
      </form>
      {error && (
        <p id="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </>
  );
};
