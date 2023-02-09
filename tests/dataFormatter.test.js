import * as dataFormatter from "../src/js/helpers/dataFormatter";

describe("capitalise a string", () => {
  test("one word", () => {
    expect(dataFormatter.capitaliseFirstLetter("TEST")).toBe("Test");
  });

  test("one word with empty spaces", () => {
    expect(dataFormatter.capitaliseFirstLetter("  TEST  ")).toBe("Test");
  });

  test("two words + capitalise first only", () => {
    expect(dataFormatter.capitaliseFirstLetter("tEst mE")).toBe("Test me");
  });

  test("two words + capitalise all", () => {
    expect(dataFormatter.capitaliseFirstLetter("tEst mE", false)).toBe(
      "Test Me"
    );
  });
});

describe("format a large number", () => {
  test("Trillion to two decimals", () => {
    expect(dataFormatter.formatLargeNumber(1556000000000)).toBe("1.56T");
  });
  test("Billion to two decimals", () => {
    expect(dataFormatter.formatLargeNumber(1556000000)).toBe("1.56B");
  });
  test("Million to two decimals", () => {
    expect(dataFormatter.formatLargeNumber(1556000)).toBe("1.56M");
  });
  test("Trillion to two decimals", () => {
    expect(dataFormatter.formatLargeNumber(1556)).toBe("1.56K");
  });
});
