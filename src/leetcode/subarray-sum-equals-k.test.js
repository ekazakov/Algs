// https://leetcode.com/problems/subarray-sum-equals-k/

// Given an array of integers and an integer k, you
// need to find the total number of continuous subarrays
// whose sum equals to k.
//
// Example:
// Input: nums = [1,1,1], k = 2
// Output: 2
//
// Note:
// The length of the array is in range [1, 20,000].
// The range of numbers in the array is [-1000, 1000]
// and the range of the integer k is [-1e7, 1e7].

// Time complexity : O(n^2)
// Considering every possible subarray takes O(n^2) time
//  Finding out the sum of any subarray takes O(1) time after the initial processing
//  of O(n) for creating the cumulative sum array.
//
// Space complexity : O(n). Cumulative sum array sum of size n+1 is used.
function subarraySums1(data, k) {
    const partials = [0];
    let sum = 0;
    let result = 0;
    for (const val of data) {
        sum += val;
        partials.push(sum);
    }
    // console.log('partials', partials);

    for (let start = 0; start < partials.length - 1; start++) {
        for (let end = start + 1; end < partials.length; end++) {
            const sum = partials[end] - partials[start];
            // prettier-ignore
            // console.log('start:', start, 'end:', end, 'sum:', sum, data.slice(start, end));
            if (sum === k) {
                result += 1;
            }
        }
    }

    return result;
}

function subarraySums2(data, k) {
    let result = 0;

    for (let start = 0; start < data.length; start++) {
        let sum = 0;
        for (let end = start; end < data.length; end++) {
            sum += data[end];
            // prettier-ignore
            // console.log('start:', start, 'end:', end, 'sum:', sum, data.slice(start, end));
            if (sum === k) {
                result += 1;
            }
        }
    }

    return result;
}
// input:       [2, 2, 2, -2, 2];
// map:         ('0': 1), ('2': 1), ('4': 2), ('6': 1)
// partial sum: [2, 4, 6, 4, 6]
// повторения 4ки в partial sum значит, что есть два
// подбмассива с одинаковой суммой [2,2] и [2,2,2,-2]
// и кодгда дойдем до последней 6-ки, то result будем увеличивать на 2
// т.к. 6 - 2 = 4 и есть два варианта как получить решение — [2,-2,2] и [2]
function subarraySums3(data, k) {
    let result = 0;
    let sum = 0;
    const map = { 0: 1 };

    // console.log('map:', map);
    for (const num of data) {
        sum += num;
        if (map[sum - k]) {
            result += map[sum - k];
        }
        // console.log('sum:', sum, 'result:', result);

        map[sum] = (map[sum] || 0) + 1;
        // console.log('map:', map);
    }

    return result;
}

const input1 = [1, 1, 1];
const input2 = [1, 1, 1, 2, -1];
const input3 = [2, 3, 1, 1, 1, 1, 4, 2, -1, 5, 6];
const input4 = [2, 2, 2, -2, 2];

// console.log(input1, subarraySums1(input1, 2)); // 2
// console.log(input2, subarraySums1(input2, 2)); // 4
// console.log(input3, subarraySums1(input3, 5)); // 5
console.log(input4, subarraySums3(input4, 2)); // 6

const describe = () => {};

describe('Subarray Sum Equals K', function() {
    describe('Partial sum solution O(n^2) and O(n) space', () => {
        it('one', () => {
            expect(subarraySums1(input1, 2)).toBe(2);
        });

        it('two', () => {
            expect(subarraySums1(input2, 2)).toBe(4);
        });

        it('three', () => {
            expect(subarraySums1(input3, 5)).toBe(5);
        });
    });

    describe('Partial sum solution O(n^2) and O(1) space', () => {
        it('one', () => {
            expect(subarraySums2(input1, 2)).toBe(2);
        });

        it('two', () => {
            expect(subarraySums2(input2, 2)).toBe(4);
        });

        it('three', () => {
            expect(subarraySums2(input3, 5)).toBe(5);
        });
    });

    describe('Solution O(n) and O(n) space', () => {
        it('one', () => {
            expect(subarraySums3(input1, 2)).toBe(2);
        });

        it('two', () => {
            expect(subarraySums3(input2, 2)).toBe(4);
        });

        it('three', () => {
            expect(subarraySums3(input3, 5)).toBe(5);
        });

        it('four', () => {
            expect(subarraySums3(input4, 2)).toBe(6);
        });
    });
});
