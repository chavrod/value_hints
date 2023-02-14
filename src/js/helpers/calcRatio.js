export const basic = (numerArr, denomArr) => {
  return numerArr.map((numDataPoint, i) => numDataPoint / denomArr[i]);
};

export const additionalNumeratorOperand = {
  "+": function (firstNumerArr, secondNumerArr, denomArr) {
    return firstNumerArr.map(
      (firstNumVal, index) =>
        (firstNumVal + secondNumerArr[index]) / denomArr[index]
    );
  },
  "-": function (firstNumerArr, secondNumerArr, denomArr) {
    return firstNumerArr.map(
      (firstNumVal, index) =>
        (firstNumVal - secondNumerArr[index]) / denomArr[index]
    );
  },
};

export const additionalDenominatorOperand = {
  "+": function (NumerArr, firstDenomArr, secondDenomArr) {
    return NumerArr.map(
      (NumVal, index) => NumVal / (firstDenomArr[index] + secondDenomArr[index])
    );
  },
  "-": function (NumerArr, firstDenomArr, secondDenomArr) {
    return NumerArr.map(
      (NumVal, index) => NumVal / (firstDenomArr[index] - secondDenomArr[index])
    );
  },
};
