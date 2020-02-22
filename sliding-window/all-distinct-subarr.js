// Given an array of integers, print all maximum size sub-arrays having all distinct elements in them.
// https://www.techiedelight.com/print-sub-arrays-array-distinct-elements/
import { MultiSet } from "./multi-set";

export const allDistinctSubarr = data => {
  const window = new Set();
  const results = [];
  let left = 0;
  let right = 0;

  while (right < data.length) {
    // [5, 2, 3, 5, 4, 3]

    while (right < data.length && !window.has(data[right])) {
      window.add(data[right]);
      right++;
    }

    const slice = data.slice(left, right);

    results.push(slice);

    while (right < data.length && window.has(data[right])) {
      window.delete(data[left]);
      left++;
    }
  }

  return results;
};

/*
  while (right < data.length) {
    window.add(data[right]);

    if (window.get(data[right]) > 1) {
      results.push(data.slice(left, right));
    }

    while (window.get(data[right]) > 1) {
      window.remove(data[left]);
      left++;
    }

    right++;
  }

  results.push(data.slice(left, right));

  if (results.length === 0) {
    results.push(data);
  }
*/
