import type { ChangeEvent, FormEvent } from "react";

import {
  useLocation,
  useGeolocation,
  useSearch,
} from "@components/LocationSearch/hooks";

import * as S from "./style";

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
      getCoords(search)
        .then(setLocation)
        .catch((e) => {
          setError(e.message);
        });
    }
  };

  const handleGeoLocation = () => {
    setSearch("");

    getGeolocation()
      .then((location) => {
        const { lat, lon, name } = location;
        setSearch(name);
        setLocation({ lat, lon });
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <S.Header>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          aria-invalid={!!error}
          aria-describedby={"error"}
          name="query"
          type="text"
          placeholder="London"
          required
          value={search}
          onChange={handleChange}
        />
        <button type="submit">
          <span className="material-symbols-outlined">search</span>
        </button>
        {displayGeolocation && (
          <button
            disabled={loadingGeolocation}
            type="button"
            onClick={handleGeoLocation}
          >
            {!loadingGeolocation ? (
              <span className="material-symbols-outlined">
                location_searching
              </span>
            ) : (
              <S.LoadingIcon className="material-symbols-outlined">
                sync
              </S.LoadingIcon>
            )}
          </button>
        )}
      </S.Form>
      {error && <S.ErrorMessage id="error">{error}</S.ErrorMessage>}
    </S.Header>
  );
};
