import * as calcGrowth from "../src/js/helpers/calcGrowth";

describe("Calcualte Compound Annual Growth Rate, using an arrays of values, and number of years", () => {
  test("(Case 1) Returns 'N/A' if the array length is smaller than the number of years", () => {
    expect(calcGrowth.compoundAnnual([10, 20, 30, 40], 5)).toBe("N/A");
  });

  test("(Case 2) Returns 'N/A' if the Starting value is zero", () => {
    expect(calcGrowth.compoundAnnual([10, 20, 0, 40, 50], 3)).toBe("N/A");
  });

  test("(Case 3) Returns 'N/A' if the Ending value is zero", () => {
    expect(calcGrowth.compoundAnnual([10, 20, 30, 40, 0], 3)).toBe("N/A");
  });

  test("(Case 4) Returns a Postive number when (Starting < Ending) && (Both > 0)", () => {
    expect(calcGrowth.compoundAnnual([30, 40, 50], 3)).toBeCloseTo(0.19);
  });

  test("(Case 5) Returns a Negative number when (Starting > Ending) && (Both < 0)", () => {
    expect(calcGrowth.compoundAnnual([-30, -40, -50], 3)).toBeCloseTo(-0.19);
  });

  test("(Case 6) Returns a Positive number when Starting < 0 && Ending > 0", () => {
    expect(calcGrowth.compoundAnnual([-10, 20, 30], 3)).toBeCloseTo(0.71);
  });

  test("(Case 7) Returns a Negative number when Starting > 0 && Ending < 0", () => {
    expect(calcGrowth.compoundAnnual([10, -10, -30], 3)).toBeCloseTo(-0.71);
  });

  test("(Case 8) Returns a Positive number when (Starting < Ending) && (Both < 0)", () => {
    expect(calcGrowth.compoundAnnual([-30, -20, -10], 3)).toBeCloseTo(0.31);
  });

  test("(Case 9) Returns a Negative number when (Starting > Ending) && (Both > 0)", () => {
    expect(calcGrowth.compoundAnnual([30, 20, 10], 3)).toBeCloseTo(-0.31);
  });
});
