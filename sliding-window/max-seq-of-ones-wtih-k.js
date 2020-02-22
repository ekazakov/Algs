// Find the maximum sequence of continuous 1’s
// that can be formed by replacing at-most k zeroes by ones

// Given a binary array, find the maximum sequence of continuous 1’s
// that can be formed by replacing at-most k zeroes by ones.

// [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0]

// https://www.techiedelight.com/find-maximum-sequence-of-continuous-1s-can-formed-replacing-k-zeroes-ones/
export const findIndexOfMaxSeqOfKRepl = (data, k) => {
  let count = 0; // stores number of zeros in current window
  let left = 0; // left represents current window's starting index
  let leftIndex = 0; // store left index of max window found so far
  let window = 0; // stores maximum number of continuous 1's found so far (including k zeroes)

  // maintain a window [left..right] containing at-most k zeroes
  for (let right = 0; right < data.length; right++) {
    // if current element is 0, increase count of zeros in the
    // current window by 1
    if (data[right] === 0) {
      count++;
    }

    // window becomes unstable if number of zeros in it becomes
    // more than k
    while (count > k) {
      // if we have found zero, decrement number of zeros in the
      // current window by 1
      if (data[left] === 0) {
        count--;
      }

      // remove elements from the window's left side till window
      // becomes stable again
      left++;
    }

    // when we reach here, the window [left..right] contains at-most
    // k zeroes and we update max window size and leftmost index
    // of the window
    if (right - left + 1 > window) {
      window = right - left + 1;
      leftIndex = left;
    }
  }

  return [leftIndex, leftIndex + window - 1];
};
