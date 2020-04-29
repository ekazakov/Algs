// https://leetcode.com/problems/degree-of-an-array

// Given a non-empty array of non-negative integers nums, the degree of
// this array is defined as the maximum frequency of any one of its elements.
//
// Your task is to find the smallest possible length of a (contiguous)
// subarray of nums, that has the same degree as nums.
//
// Example 1:
// Input: [1, 2, 2, 3, 1]
// Output: 2

// Explanation:
// The input array has a degree of 2 because both elements 1 and 2 appear twice.
// Of the subarrays that have the same degree:
// [1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
// The shortest length is 2. So return 2.
//
// Example 2:
// Input: [1,2,2,3,1,4,2]
// Output: 6
//
// Note:
//
// nums.length will be between 1 and 50,000.
// nums[i] will be an integer between 0 and 49,999.

function findShortestSubArray(nums) {
    const freq = {};
    let maxRank = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (freq[num] == null) {
            freq[num] = { rank: 1, start: i, end: i };
        } else {
            freq[num].rank += 1;
            freq[num].end = i;
        }
        maxRank = Math.max(freq[num].rank, maxRank);
    }

    console.log('freq:', freq);
    const keys = Object.keys(freq);
    let min = nums.length;
    let minKey = null;
    for (const key of keys) {
        if (freq[key].rank === maxRank) {
            const len = freq[key].end - freq[key].start + 1;
            if (min > len) {
                min = len;
                minKey = key;
            }
        }
    }


    console.log('freq[min]:', freq[min]);
    console.log('min:', min);
    return min;
}

const input1 = [1, 2, 2, 3, 1];
const input2 = [1, 2, 2, 3, 1, 4, 2];
const input3 = [1, 3, 2, 2, 3, 1];
findShortestSubArray(input1);
findShortestSubArray(input2);
findShortestSubArray(input3);
