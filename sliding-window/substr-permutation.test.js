// XYYZXZYZXXYZ
// XYZ

import { findAllSubstringPermutations } from "./substr-permutation";

describe("Find all substrings of a string that are permutation of a given string", () => {
  it("Should works for XYYZXZYZXXYZ and XYZ", () => {
    expect(findAllSubstringPermutations("XYYZXZYZXXYZ", "XYZ")).toEqual([
      "YZX",
      "XZY",
      "YZX",
      "XYZ"
    ]);
  });
});
