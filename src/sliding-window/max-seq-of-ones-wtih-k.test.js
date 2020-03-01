import { findIndexOfMaxSeqOfKRepl } from "./max-seq-of-ones-wtih-k";

describe(`Find the maximum sequence of continuous 1’s 
  that can be formed by replacing at-most k zeroes by ones
  `, () => {
  it("k = 0", () => {
    const data = [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0];
    expect(findIndexOfMaxSeqOfKRepl(data, 0)).toEqual([6, 9]);
  });

  it("k = 1", () => {
    const data = [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0];
    expect(findIndexOfMaxSeqOfKRepl(data, 1)).toEqual([3, 9]);
  });

  it("k = 2", () => {
    const data = [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0];
    expect(findIndexOfMaxSeqOfKRepl(data, 2)).toEqual([0, 9]);
  });

  it("k = 3", () => {
    const data = [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0];
    expect(findIndexOfMaxSeqOfKRepl(data, 3)).toEqual([0, 10]);
  });
});
