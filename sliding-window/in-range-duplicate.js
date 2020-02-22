// https://www.techiedelight.com/find-duplicates-within-given-range-array/

// Given an array and a positive number k, check weather the array contains
// any duplicate elements within range k. If k is
// more than size of the array, the solution should check for duplicates in the complete array.

export const findDuplicatesInRange = (data, k) => {
  const set = new Set();

  // 5, 6, 8, 2, 4, 6, 9
  for (let i = 0; i < data.length; i++) {
    // console.log("size:", set.size, [...set.values()]);
    if (set.has(data[i])) {
      return true;
    }

    set.add(data[i]);

    if (set.size > k) {
      // console.log("remove:", data[i - k]);
      set.delete(data[i - k]);
    }
  }

  return false;
};
