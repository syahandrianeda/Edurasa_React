
export type MinMaxResult<T> = {
  max: T | null;
  min: T | null;
};

export function getMinMax<T extends object>(
  data: T[],
  key: keyof T
): MinMaxResult<T> {
  if (data.length === 0) {
    return {
      max: null,
      min: null,
    };
  }

  const validData = data.filter((item) => {
    const value = item[key];
    return typeof value === "number" && Number.isFinite(value);
  });

  if (validData.length === 0) {
    return {
      max: null,
      min: null,
    };
  }

  return validData.reduce(
    (result, item) => {
      const value = item[key] as number;
      const maxValue = result.max![key] as number;
      const minValue = result.min![key] as number;

      if (value > maxValue) {
        result.max = item;
      }

      if (value < minValue) {
        result.min = item;
      }

      return result;
    },
    {
      max: validData[0],
      min: validData[0],
    } as MinMaxResult<T>
  );
}
