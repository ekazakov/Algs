// Given an array of integers, find a subarray having given sum in it.

// works only for positive integers
export const subArrayForSum = (array, expectedSum) => {
  let right = 0;
  let left = 0;
  let sum = 0;

  for (left = 0; left < array.length; left++) {
    while (sum < expectedSum && right < array.length) {
      sum += array[right];
      right++;
    }

    if (sum === expectedSum) {
      return [left, right - 1];
    }

    sum -= array[left];
  }

  return [left, right - 1];
};

export const subArrayForSum2 = (array, expectedSum) => {
  const map = new Map();
  let sum = 0;
  // insert number 0 into the set to handle the case when
  // sub-array with given sum starts from index 0
  map.set(0, 0);

  for (let i = 0; i < array.length; i++) {
    sum += array[i];

    // if (sum - expectedSum) is seen before, we have found
    // the sub-array with sum 'expectedSum'
    if (map.has(sum - expectedSum)) {
      return [map.get(sum - expectedSum) + 1, i];
    }

    map.set(sum, i);
  }

  return [];
};
