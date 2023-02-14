import * as calcRatio from "../src/js/helpers/calcRatio";

describe("calcaute EPS for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive eps", () => {
    expect(calcRatio.epsArr([10, 20], [5, 5], [1000, 1000])).toEqual([
      0.01, 0.01,
    ]);
  });

  test("Case 2 -> Negative EPS", () => {
    expect(calcRatio.epsArr([-10, -20], [5, 5], [1000, 1000])).toEqual([
      -0.01, -0.03,
    ]);
  });
});

describe("calcaute BPS for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive BPS", () => {
    expect(calcRatio.bpsArr([50, 100], [200, 200])).toEqual([0.25, 0.5]);
  });

  test("Case 2 -> Negative BPS", () => {
    expect(calcRatio.bpsArr([-50, -100], [200, 200])).toEqual([-0.25, -0.5]);
  });
});

describe("calcaute TBVPS for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive TBVPS", () => {
    expect(calcRatio.tbvpsArr([200, 150], [50, 50], [1000, 1000])).toEqual([
      0.15, 0.1,
    ]);
  });

  test("Case 2 -> Negative TBVPS", () => {
    expect(calcRatio.tbvpsArr([100, 50], [150, 150], [1000, 1000])).toEqual([
      -0.05, -0.1,
    ]);
  });
});

describe("calcaute FCF per share for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive FCF", () => {
    expect(calcRatio.tbvpsArr([100, 150], [50, 50], [1000, 1000])).toEqual([
      0.05, 0.1,
    ]);
  });

  test("Case 2 -> Negative FCF", () => {
    expect(calcRatio.tbvpsArr([-100, -50], [50, 50], [1000, 1000])).toEqual([
      -0.15, -0.1,
    ]);
  });
});

describe.only("Divide values in one array by another and return result in an array, rounding to 2 decimals", () => {
  test("Case 1 -> postive values", () => {
    expect(calcRatio.basic([100, 150], [1000, 1000])).toEqual([0.1, 0.15]);
  });

  test("Case 2 -> Negative values", () => {
    expect(calcRatio.basic([-100, -150], [1000, 1000])).toEqual([-0.1, -0.15]);
  });
});
