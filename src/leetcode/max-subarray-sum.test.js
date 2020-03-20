// https://leetcode.com/problems/maximum-subarray/

/*
Given an integer array nums, find the contiguous subarray
(containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution
using the divide and conquer approach, which is more subtle.
*/

const maxSubArray = function(arr) {
    let sum = 0;
    let result = -Infinity;

    // если текущая сумма ушла в минус, то начинаем отсчитывать сумму заного
    for (let i = 0; i < arr.length; i++) {
        sum = sum < 0 ? arr[i] : sum + arr[i];
        result = Math.max(result, sum);
    }

    return result;
};
