import * as calcRatio from "../src/js/helpers/calcRatio";
import { toBeDeepCloseTo } from "jest-matcher-deep-close-to";

expect.extend({ toBeDeepCloseTo });

describe("Return an array of ratios between elements in two arrays with corresponding indexes", () => {
  test("Case 1 -> postive values", () => {
    expect(calcRatio.basic([100, 150], [1000, 1000])).toBeDeepCloseTo([
      0.1, 0.15,
    ]);
  });

  test("Case 2 -> Negative values", () => {
    expect(calcRatio.basic([-100, -150], [1000, 1000])).toBeDeepCloseTo([
      -0.1, -0.15,
    ]);
  });
});

describe("Return an array of ratios between a resulting operation of elements in two numerator arrays and a denominator array with corresponding indexes", () => {
  test("Addition sign", () => {
    expect(
      calcRatio.additionalNumeratorOperand["+"](
        [100, 150],
        [50, 50],
        [1000, 1000]
      )
    ).toBeDeepCloseTo([0.15, 0.2]);
  });

  test("Subtraction sign", () => {
    expect(
      calcRatio.additionalNumeratorOperand["-"](
        [100, 150],
        [50, 50],
        [1000, 1000]
      )
    ).toBeDeepCloseTo([0.05, 0.1]);
  });
});

describe("Return an array of ratios between a numerator array and a resulting operation of elements in two denominator arrays with corresponding indexes", () => {
  test("Addition sign", () => {
    expect(
      calcRatio.additionalDenominatorOperand["+"](
        [100, 150],
        [1000, 1000],
        [50, 50]
      )
    ).toBeDeepCloseTo([0.1, 0.14]);
  });

  test("Subtraction sign", () => {
    expect(
      calcRatio.additionalDenominatorOperand["-"](
        [100, 150],
        [1000, 1000],
        [50, 50]
      )
    ).toBeDeepCloseTo([0.11, 0.16]);
  });
});
