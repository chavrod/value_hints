import * as formatter from "./formatter";

export const epsArr = (incomeArr, prefDivArr, numSharesArr) => {
  return incomeArr.map((incomeDataPoint, index) =>
    formatter.roundDecimals(
      (incomeDataPoint - prefDivArr[index]) / numSharesArr[index],
      2
    )
  );
};

export const bpsArr = (equityArr, numSharesArr) => {
  return equityArr.map((equityDataPoint, index) =>
    formatter.roundDecimals(equityDataPoint / numSharesArr[index], 2)
  );
};
