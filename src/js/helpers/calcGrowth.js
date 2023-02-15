export const compoundAnnual = (arr, years) => {
  // Either value is 0 or Not enough data
  if (arr.at(-years) === 0 || arr.at(-1) === 0 || arr.length < years)
    return "N/A";

  // Base case
  if (arr.at(-years) > 0 && arr.at(-1) > 0)
    return (arr.at(-1) / arr.at(-years)) ** (1 / years) - 1;

  // Both negative
  if (arr.at(-years) < 0 && arr.at(-1) < 0)
    return (
      -1 *
      ((Math.abs(arr.at(-1)) / Math.abs(arr.at(-years))) ** (1 / years) - 1)
    );

  // From Negative to Positive
  if (arr.at(-years) < 0 && arr.at(-1) > 0)
    return (
      ((arr.at(-1) + 2 * Math.abs(arr.at(-years))) /
        Math.abs(arr.at(-years))) **
        (1 / years) -
      1
    );

  // From Positve to Negative
  if (arr.at(-years) > 0 && arr.at(-1) < 0)
    return (
      -1 *
      (((Math.abs(arr.at(-1)) + 2 * arr.at(-years)) / arr.at(-years)) **
        (1 / years) -
        1)
    );
};
