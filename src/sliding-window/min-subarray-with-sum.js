// Given an array of positive integers, find the
// length of smallest subarray whose sum of elements is greater
// than the given number.

// https://www.techiedelight.com/length-of-smallest-subarray-with-sum-greater-number/

export const minSubArrayGtSum = (data, minSum) => {
  let left = 0;
  let leftIndex = 0;
  let minSize = data.length;
  let sum = 0;
  let hasSolution = false;

  for (let right = 0; right < data.length; right++) {
    sum += data[right];

    while (sum > minSum) {
      hasSolution = true;
      if (minSize > right - left + 1) {
        minSize = right - left + 1;
        leftIndex = left;
      }
      if (left >= data.length) {
        throw Error("foo");
      }
      sum -= data[left];
      left++;
    }
  }

  if (!hasSolution) {
    return null;
  }
  return [leftIndex, leftIndex + minSize - 1];
};
