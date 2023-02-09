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
