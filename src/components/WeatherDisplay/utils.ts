const enum LEVELS {
  "HEAVY" = "HEAVY",
  "BAD" = "BAD",
  "OK" = "OK",
  "GOOD" = "GOOD",
}

const colors: Record<LEVELS, string> = {
  [LEVELS.HEAVY]: "#f56b00",
  [LEVELS.BAD]: "#f7a300",
  [LEVELS.OK]: "#adcb03",
  [LEVELS.GOOD]: "#9fe56a",
};

function getLevelColor(
  currentValue: number,
  colorScale: Record<string, string>
) {
  let nearestValue = Object.values(colorScale)[0];

  for (const key in colorScale) {
    const value = parseFloat(key);
    if (currentValue >= value) {
      nearestValue = colorScale[key];
    } else {
      break;
    }
  }

  return nearestValue;
}

export function getWindLevel(windSpeed: number) {
  const colorScale: Record<string, string> = {
    "32": colors.HEAVY,
    "19": colors.BAD,
    "4": colors.OK,
    "0": colors.GOOD,
  };

  return getLevelColor(windSpeed, colorScale);
}

export function getRainfallLevel(rainfall: number) {
  const colorScale: Record<string, string> = {
    "8": colors.HEAVY,
    "4": colors.BAD,
    "0.5": colors.OK,
    "0": colors.GOOD,
  };

  return getLevelColor(rainfall, colorScale);
}

export function getHumidityLevel(humidity: number) {
  const colorScale: Record<string, string> = {
    "100": colors.HEAVY,
    "80": colors.BAD,
    "70": colors.OK,
    "31": colors.GOOD,
    "30": colors.OK,
    "20": colors.BAD,
    "0": colors.HEAVY,
  };

  return getLevelColor(humidity, colorScale);
}

export function getPressureLevel(pressure: number) {
  const colorScale: Record<string, string> = {
    "1050": colors.GOOD,
    "1000": colors.OK,
    "950": colors.BAD,
    "0": colors.HEAVY,
  };

  return getLevelColor(pressure, colorScale);
}
