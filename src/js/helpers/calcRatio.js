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

export const tbvpsArr = (equityArr, intangibleArr, numSharesArr) => {
  return equityArr.map((equityDataPoint, index) =>
    formatter.roundDecimals(
      (equityDataPoint - intangibleArr[index]) / numSharesArr[index],
      2
    )
  );
};

export const fcfpsArr = (operatingCashArr, capExpArr, numSharesArr) => {
  return operatingCashArr.map((operatingCashDataPoint, index) =>
    formatter.roundDecimals(
      (operatingCashDataPoint - capExpArr[index]) / numSharesArr[index],
      2
    )
  );
};

export const basic = (numeratorArr, denominatorArr) => {
  return numeratorArr.map((numDataPoint, i) =>
    formatter.roundDecimals(numDataPoint / denominatorArr[i], 2)
  );
};
