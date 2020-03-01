// Find subarray having given sum in given array of integers
// https://www.techiedelight.com/find-subarray-having-given-sum-given-array/

import { subArrayForSum, subArrayForSum2 } from "./subarray-for-sum";

describe("Find subarray having given sum in given array of integers", () => {
  describe("Sliding windwo", () => {
    it("one", () => {
      const data = [2, 6, 0, 9, 7, 3, 1, 4, 1, 10];
      expect(subArrayForSum(data, 15)).toEqual([1, 3]);
    });
  });

  describe("Hashing", () => {
    it("one", () => {
      const data = [2, 6, 0, 9, 7, 3, 1, 4, 1, 10];
      expect(subArrayForSum2(data, 15)).toEqual([1, 3]);
    });

    it("two", () => {
      const data = [0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10];
      expect(subArrayForSum2(data, 15)).toEqual([3, 8]);
    });

    it("three", () => {
      const data = [0, -55, 7, 1, 7, 1, 1, 1, 1, 1];
      expect(subArrayForSum2(data, 15)).toEqual([2, 4]);
    });

    it("four", () => {
      const data = [0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10];
      expect(subArrayForSum2(data, -3)).toEqual([3, 4]);
    });
  });
});
