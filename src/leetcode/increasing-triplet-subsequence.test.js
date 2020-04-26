// https://leetcode.com/problems/increasing-triplet-subsequence/

// Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.
//
// Formally the function should:
//
// Return true if there exists i, j, k
// such that arr[i] < arr[j] < arr[k] given 0 ≤ i < j < k ≤ n-1 else return false.
// Note: Your algorithm should run in O(n) time complexity and O(1) space complexity.
//
// Example 1:
//
// Input: [1,2,3,4,5]
// Output: true
// Example 2:
//
// Input: [5,4,3,2,1]
// Output: false

function increasingTriplet(data) {
    let small = Infinity;
    let big = Infinity;
    let result = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i] <= small) {
            small = data[i];
        } else if (data[i] <= big) {
            big = data[i];
        } else {
            console.log('small:', small, 'big:', big, 'last:', data[i]);
            result = true;
            break;
        }
    }

    console.log(data, ' -> ', result);
    return result;
}

const input1 = [9, 8, 1, 2, 3, 6, 2, 6, 5];
const input2 = [1, 2, 3, 4, 5];
const input3 = [5, 4, 3, 2, 1];
const input4 = [5, 1, 6, 1, 7, 2];
const input5 = [9, 1, 8, 2, 7, 3];
const input6 = [2, 2, 2, 4, 1];

increasingTriplet(input1);
increasingTriplet(input2);
increasingTriplet(input3);
increasingTriplet(input4);
increasingTriplet(input5);
increasingTriplet(input6);
