import * as formatter from "../src/js/helpers/formatter";

describe.only("adjust a number to a specified number of decimal points", () => {
  test("two decimals", () => {
    expect(formatter.roundDecimals(12.345, 2)).toBe(12.35);
  });

  test("two decimals + works with a string", () => {
    expect(formatter.roundDecimals("12.345", 2)).toBe(12.35);
  });

  test("three decimals", () => {
    expect(formatter.roundDecimals(1.0035, 3)).toBe(1.004);
  });
});

describe("capitalise a string", () => {
  test("one word", () => {
    expect(formatter.capitaliseFirstLetter("TEST")).toBe("Test");
  });

  test("one word with empty spaces", () => {
    expect(formatter.capitaliseFirstLetter("  TEST  ")).toBe("Test");
  });

  test("two words + capitalise first only", () => {
    expect(formatter.capitaliseFirstLetter("tEst mE")).toBe("Test me");
  });

  test("two words + capitalise all", () => {
    expect(formatter.capitaliseFirstLetter("tEst mE", false)).toBe("Test Me");
  });
});

describe("format a large number", () => {
  test("Trillion to two decimals", () => {
    expect(formatter.formatLargeNumber(1556000000000)).toBe("1.56T");
  });

  test("Billion to two decimals", () => {
    expect(formatter.formatLargeNumber(1556000000)).toBe("1.56B");
  });

  test("Million to two decimals", () => {
    expect(formatter.formatLargeNumber(1556000)).toBe("1.56M");
  });

  test("Trillion to two decimals", () => {
    expect(formatter.formatLargeNumber(1556)).toBe("1.56K");
  });

  test("works with strings - thousands", () => {
    expect(formatter.formatLargeNumber("1556")).toBe("1.56K");
  });

  test("works with strings - trillions", () => {
    expect(formatter.formatLargeNumber("1556000000000")).toBe("1.56T");
  });
});

describe("takes in a number a returns a string with a specified sign appended/preppended", () => {
  test("Appends percentage", () => {
    expect(formatter.appendSign(2.55, "%", true)).toBe("2.55%");
  });

  test("Appends currency", () => {
    expect(formatter.appendSign(2.55, "$", true)).toBe("2.55$");
  });

  test("Prepends percentage", () => {
    expect(formatter.appendSign(2.55, "%", false)).toBe("%2.55");
  });

  test("Prepends currency", () => {
    expect(formatter.appendSign(2.55, "$", false)).toBe("$2.55");
  });
});
