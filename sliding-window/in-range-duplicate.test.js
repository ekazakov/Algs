import { findDuplicatesInRange } from "./in-range-duplicate";

describe("Find duplicates within given range k in an array", () => {
  it("one", () => {
    const data = [5, 6, 8, 2, 4, 6, 9];
    expect(findDuplicatesInRange(data, 4)).toBe(true);
  });
});
