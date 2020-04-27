// https://leetcode.com/problems/number-of-longest-increasing-subsequence/

// Given an unsorted array of integers, find the number of
// longest increasing subsequence.
//
// Example 1:
// Input: [1,3,5,4,7]
// Output: 2
// Explanation: The two longest increasing subsequence
// are [1, 3, 4, 7] and [1, 3, 5, 7].
//
// Example 2:
// Input: [2,2,2,2,2]
// Output: 5
//
// Explanation: The length of longest continuous increasing
// subsequence is 1, and there are 5 subsequences' length is 1,
// so output 5.
// Note: Length of the given array will be not exceed 2000
// and the answer is guaranteed to be fit in 32-bit signed int.

// Solution O(n^2)
// Suppose for sequences ending at nums[i], we knew the length length[i] of the
// longest sequence, and the number count[i] of such sequences with that length.
//
// For every j < i with A[j] < A[i], we might append A[i] to a longest subsequence
// ending at A[j]. It means that we have demonstrated count[j] subsequences
// of length length[j] + 1.
//
// Now, if those sequences are longer than length[i],
// then we know we have count[j] sequences of this length.
// If these sequences are equal in length to length[i], then we know that there
// are now count[j] additional sequences to be counted of that
// length (ie. count[i] += count[j]).
function findNumberOfLIS(nums) {
    if (nums.length <= 1) {
        return nums.length;
    }
    const lengths = new Array(nums.length).fill(0);
    const counts = new Array(nums.length).fill(1);

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (lengths[j] >= lengths[i]) {
                    lengths[i] = lengths[j] + 1;
                    counts[i] = counts[j];
                } else if (lengths[j] + 1 === lengths[i]) {
                    counts[i] += counts[j];
                }
            }
        }
    }

    const longest = Math.max(...lengths);
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        if (lengths[i] === longest) {
            ans += counts[i];
        }
    }

    console.log('input:', nums, '->', ans);
    return ans;
}

findNumberOfLIS([1, 3, 5, 4, 7]);
findNumberOfLIS([2, 2, 2, 2, 2]);
findNumberOfLIS([1, 2, 3, 4]);
findNumberOfLIS([4, 3, 2, 1]);
findNumberOfLIS([1, 2, 3, 1, 2, 3, 1, 2, 3]);
