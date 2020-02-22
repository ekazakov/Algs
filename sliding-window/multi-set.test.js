import { MultiSet } from "./multi-set";

describe("MultiSet", () => {
  it("Contains all one", () => {
    const data = "xyzx".split("");
    const setA = new MultiSet(data);
    const setB = new MultiSet("xxzy".split(""));

    expect(setA.containsAll(setB)).toBe(true);
  });

  it("Contains all two", () => {
    const data = "xyzx".split("");
    const setA = new MultiSet(data);
    const setB = new MultiSet("xzy".split(""));

    expect(setA.containsAll(setB)).toBe(true);
  });

  it("Contains all three", () => {
    const data = "xyz".split("");
    const setA = new MultiSet(data);
    const setB = new MultiSet("xzz".split(""));

    expect(setA.containsAll(setB)).toBe(false);
  });
});
