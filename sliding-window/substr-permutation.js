/*
Find all substrings of a string that contains 
all characters of another string. In other words, find all 
substrings of first string that are anagrams of second string.
*/

import { MultiSet } from "./multi-set";

export const findAllSubstringPermutations = (mainStr, str) => {
  const window = new MultiSet();
  const set = new MultiSet(str.split(""));
  const results = [];
  let left = 0;

  for (let right = 0; right < mainStr.length; ) {
    window.add(mainStr[right]);

    if (window.containsAll(set)) {
      results.push(mainStr.slice(left, right + 1));
    }

    if (right - left + 1 >= str.length) {
      window.remove(mainStr[left]);
      left += 1;
    }
    right += 1;
  }

  return results;
};
