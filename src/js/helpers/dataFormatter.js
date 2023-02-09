export const capitaliseFirstLetter = (string, onlyFirstWord = true) => {
  const stringLowerTrim = string.toLowerCase().trim();
  return onlyFirstWord
    ? stringLowerTrim[0].toUpperCase() + stringLowerTrim.slice(1)
    : stringLowerTrim
        .split(" ")
        .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join(" ");
};
