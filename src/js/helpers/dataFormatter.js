export const roundDecimals = (number, numDecimals) => {
  return parseFloat((+number).toFixed(numDecimals));
};

export const capitaliseFirstLetter = (string, onlyFirstWord = true) => {
  const stringLowerTrim = string.toLowerCase().trim();
  return onlyFirstWord
    ? stringLowerTrim[0].toUpperCase() + stringLowerTrim.slice(1)
    : stringLowerTrim
        .split(" ")
        .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join(" ");
};

export const formatLargeNumber = (number) => {
  // Twelwe Zeros for Trillions
  return number >= 1.0e12
    ? (number / 1.0e12).toFixed(2) + "T"
    : // Six Zeroes for Millions
    number >= 1.0e9
    ? (number / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    number >= 1.0e6
    ? (number / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    number >= 1.0e3
    ? (number / 1.0e3).toFixed(2) + "K"
    : number;
};

export const appendSign = (number, sign, append = true) => {
  return append ? number + sign : sign + number;
};
