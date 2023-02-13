import * as perShareCalc from "../src/js/helpers/perShareCalc";

describe("calcaute EPS for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive eps", () => {
    expect(perShareCalc.epsArr([10, 20], [5, 5], [1000, 1000])).toEqual([
      0.01, 0.01,
    ]);
  });

  test("Case 2 -> Negative EPS", () => {
    expect(perShareCalc.epsArr([-10, -20], [5, 5], [1000, 1000])).toEqual([
      -0.01, -0.03,
    ]);
  });
});

describe("calcaute BPS for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive BPS", () => {
    expect(perShareCalc.bpsArr([50, 100], [200, 200])).toEqual([0.25, 0.5]);
  });

  test("Case 2 -> Negative BPS", () => {
    expect(perShareCalc.bpsArr([-50, -100], [200, 200])).toEqual([-0.25, -0.5]);
  });
});

describe("calcaute TBVPS for each arr position, rounding to 2 decimals", () => {
  test("Case 1 -> postive TBVPS", () => {
    expect(perShareCalc.tbvpsArr([200, 150], [50, 50], [1000, 1000])).toEqual([
      0.15, 0.1,
    ]);
  });

  test("Case 2 -> Negative TBVPS", () => {
    expect(perShareCalc.tbvpsArr([100, 50], [150, 150], [1000, 1000])).toEqual([
      -0.05, -0.1,
    ]);
  });
});
