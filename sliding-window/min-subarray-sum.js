// Given an array of integers, find minimum sum sub-array of given size k.
// https://www.techiedelight.com/find-minimum-sum-subarray-given-size-k/

export const minSumOfSubArray = (array, k) => {
  let right = 0;
  let left = 0;
  let minSum = Number.MAX_SAFE_INTEGER;
  let sum = 0;
  let size = 0;

  for (right = 0; right < array.length; right++) {
    sum += array[right];

    size = right - left + 1;
    while (size > k) {
      sum = sum - array[left];
      left++;
      size = right - left + 1;
    }

    if (size === k) {
      if (minSum > sum) {
        minSum = sum;
      }
    }
  }

  return minSum;
};
