export type LocationAPIResults = {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type LocationType = Omit<LocationAPIResults, "local_names">;

export type CoordsType = {
  lat: string;
  lon: string;
};
