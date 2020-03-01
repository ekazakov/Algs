import { minSubArrayGtSum } from "./min-subarray-with-sum";

describe(`Find the length of smallest subarray whose sum of elements is greater than the given number`, () => {
  it("one", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(minSubArrayGtSum(data, 20)).toEqual([5, 7]);
  });

  it("two", () => {
    const data = [6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(minSubArrayGtSum(data, 20)).toEqual([0, 2]);
  });

  it("three", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(minSubArrayGtSum(data, 21)).toEqual([3, 6]);
  });

  it("four", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(minSubArrayGtSum(data, 40)).toEqual(null);
  });
});
