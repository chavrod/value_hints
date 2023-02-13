import * as perShareCalc from "../src/js/helpers/perShareCalc";

describe("calcaute historic EPS, rounding to 2 decimals", () => {
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
