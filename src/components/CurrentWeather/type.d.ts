export type WeatherType = {
  clouds: number;
  temp: {
    current: Main["temp"];
    feelsLike: Main["feels_like"];
    min: Main["temp_min"];
    max: Main["temp_max"];
    humidity: Main["humidity"];
    pressure: Main["pressure"];
  };
  rain?: number;
  windSpeed: number;
  weather: {
    current: Weather["description"];
    icon: Weather["icon"];
    id: Weather["id"];
  };
};

export type CurrentWeatherProps = {
  data?: WeatherType;
};
