// Print all sub-arrays of an array having distinct elements
// [5, 2, 3, 5, 4, 3]
import { allDistinctSubarr } from "./all-distinct-subarr";

describe("Print all sub-arrays of an array having distinct elements", () => {
  it("one", () => {
    const data = [5, 2, 3, 5, 4, 3];
    expect(allDistinctSubarr(data)).toEqual([
      [5, 2, 3],
      [2, 3, 5, 4],
      [5, 4, 3]
    ]);
  });

  it("two", () => {
    const data = [1, 2, 3, 4];
    expect(allDistinctSubarr(data)).toEqual([[1, 2, 3, 4]]);
  });

  it("three", () => {
    const data = [1, 2, 3, 1, 2, 3];
    expect(allDistinctSubarr(data)).toEqual([
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
      [1, 2, 3]
    ]);
  });

  it("four", () => {
    const data = [1, 1, 1, 1];
    expect(allDistinctSubarr(data)).toEqual([[1], [1], [1], [1]]);
  });

  it("five", () => {
    const data = [1, 1, 2, 1, 1];
    expect(allDistinctSubarr(data)).toEqual([[1], [1, 2], [2, 1], [1]]);
  });

  it("six", () => {
    const data = [];
    expect(allDistinctSubarr(data)).toEqual([]);
  });
});
