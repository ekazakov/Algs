// {10, 4, 2, 5, 6, 3, 8, 1}, k = 3
import { minSumOfSubArray } from "./min-subarray-sum";

describe("Find minimum sum subarray of given size k", () => {
  it("Sum for k = 3 is 11", () => {
    const data = [10, 4, 2, 5, 6, 3, 8, 1];
    expect(minSumOfSubArray(data, 3)).toBe(11);
  });

  it("Sum for k = 2 is 6", () => {
    const data = [10, 4, 2, 5, 6, 3, 8, 1];
    expect(minSumOfSubArray(data, 2)).toBe(6);
  });

  it("Sum for k = 4 is 16", () => {
    const data = [10, 4, 2, 5, 6, 3, 8, 1];
    expect(minSumOfSubArray(data, 4)).toBe(16);
  });
});
