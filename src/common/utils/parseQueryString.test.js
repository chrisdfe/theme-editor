import parseQueryString from "./parseQueryString";

describe("utils", () => {
  describe("#parseQueryString", () => {
    it("parses a key/value pair", () => {
      const result = parseQueryString("?test=test-value");
      expect(result).toEqual({ test: "test-value" });
    });

    it("parses multiple key/value pairs", () => {
      const result = parseQueryString(
        "?test=test-value&another-key=another-test-value"
      );
      expect(result).toEqual({
        test: "test-value",
        "another-key": "another-test-value",
      });
    });
  });
});
