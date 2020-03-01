import { distinctInSubArrays } from "./distinct-in-subarrays";

describe(`Find count of distinct elements in every sub-array of size k`, () => {
  it("one", () => {
    const data = [2, 1, 2, 3, 2, 1, 4, 5];
    expect(distinctInSubArrays(data, 5)).toEqual(15);
  });
});
