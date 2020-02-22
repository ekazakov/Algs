import { findLongestSubstrWithoutRepeat } from "./index";

describe("Find Longest Substring Without Repeat", () => {
  it('Should return "" for empty string', () => {
    const str = "";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("");
  });

  it('Should return a for string "a"', () => {
    const str = "a";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("a");
  });

  it("Should works", () => {
    const str = "abcdefabcde";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("abcdef");
  });

  it("Should works for all uniques string", () => {
    const str = "abcdefgrthyoiklm";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("abcdefgrthyoiklm");
  });

  it("Should works for all repeats characters", () => {
    const str = "aaaaaaaaaaaa";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("a");
  });

  it("Should works for repeating substrings", () => {
    const str = "absde".repeat(5);
    expect(findLongestSubstrWithoutRepeat(str)).toBe("absde");
  });

  it("Should works ...", () => {
    const str = "abccccccdef";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("cdef");
  });

  it("Should works ...", () => {
    const str = "abercccccccderfgtyccccccccccccccccccccccdef";
    expect(findLongestSubstrWithoutRepeat(str)).toBe("cderfgty");
  });
});
