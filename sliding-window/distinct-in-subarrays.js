// Find count of distinct elements in every sub-array of size k

// Given an array” and an integer k, find the count
// of distinct elements in every sub-array of size k in the array.
// https://www.techiedelight.com/count-distinct-elements-every-sub-array-size-k-array/
import { MultiSet } from "./multi-set";

console.clear();

export const distinctInSubArrays = (data, k) => {
  const set = new MultiSet();

  // console.log(data);
  for (let j = 0; j < k; j++) {
    set.add(data[j]);
  }
  let result = set.size();
  console.log(set.toString());

  for (let i = k; i < data.length; i++) {
    set.remove(data[i - k]);
    set.add(data[i]);
    // console.log("i:", i, ">", set.toString());
    result += set.size();
  }

  return result;
};
