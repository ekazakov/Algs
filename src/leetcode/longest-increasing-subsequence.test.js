// https://leetcode.com/problems/longest-increasing-subsequence

// Given an unsorted array of integers, find the length of
// longest increasing subsequence.
//
// Example:
//
// Input: [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101],
// therefore the length is 4.
// Note:
//
// There may be more than one LIS combination, it is only
// necessary for you to return the length.
// Your algorithm should run in O(n^2) complexity.
//
// Follow up:
// Could you improve it to O(n log n) time complexity?

function _lengthOfLIS1(data) {
    console.log('input:', data);
    function helper(data, prevIndex, index) {
        console.log('  '.repeat(index), 'prevIndex:', prevIndex, 'index:', index);
        if (index >= data.length) {
            return 0;
        }

        let taken = 0;
        if (prevIndex < 0 || data[index] > data[prevIndex]) {
            console.log('  '.repeat(index), 'taken');
            taken = 1 + helper(data, index, index + 1);
        }

        console.log('  '.repeat(index), 'nottaken');
        const nottaken = helper(data, prevIndex, index + 1);

        return Math.max(taken, nottaken);
    }

    return helper(data, -1, 0);
}

function lengthOfLIS1(data) {
    // console.log('input:', data);
    function helper(data, prevIndex, index, level= 0) {
        // console.log('  '.repeat(level), 'prevIndex:', prevIndex, 'index:', index);
        if (index >= data.length) {
            return 1;
        }

        let taken = 0;
        if (prevIndex < 0 || data[index] > data[prevIndex]) {
            // console.log('  '.repeat(level), 'taken');
            taken = 1 + helper(data, index, index + 1, level + 1);
        }

        // console.log('  '.repeat(level), 'nottaken');
        const nottaken = helper(data, prevIndex, index + 1, level + 1);

        // console.log('  '.repeat(level), 'return', Math.max(taken, nottaken));
        return Math.max(taken, nottaken);
    }

    let max = 0;
    for (let i = 0; i < data.length; i++) {
        max = Math.max(max, helper(data, i, i + 1));
    }
    return max;
}

function lengthOfLIS2(data) {
    const memo = {};
    const key = (i, j) => `${i}:${j}`;

    function helper(data, prevIndex, index) {
        if (index >= data.length) {
            return 0;
        }

        const _key = key(prevIndex + 1, index);
        if (memo[_key] != null) {
            return memo[_key];
        }

        let taken = 0;
        if (prevIndex < 0 || data[prevIndex] < data[index]) {
            taken = 1 + helper(data, index, index + 1);
        }

        const nottaken = helper(data, prevIndex, index + 1);
        const result = Math.max(taken, nottaken);
        memo[_key] = result;

        return result;
    }

    let max = 0;
    for (let i = 0; i < data.length; i++) {
        max = Math.max(max, 1 + helper(data, i, i + 1));
    }
    return max;
}

// O(n^2) solution
function lengthOfLIS3(data) {
    if (data.length === 0) {
        return 0;
    }

    const lens = new Array(data.length).fill(0);
    lens[0] = 1;
    let result = 1;
    // console.log('input:', data);
    for (let j = 0; j < data.length; j++) {
        let current = data[j];
        let maxLen = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] < current) {
                maxLen = Math.max(maxLen, lens[i]);
            }
        }

        lens[j] = maxLen + 1;
        result = Math.max(result, lens[j]);
    }

    return result;
}

function search(data, val, lo, hi) {
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (val === data[mid]) {
            return mid;
        }
        if (val > data[mid]) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return lo;
}

// Patience sorting: https://en.wikipedia.org/wiki/Patience_sorting
// See also: https://www.youtube.com/watch?v=22s1xxRvy28
//
// Property: after placing card n into pile k, a suquence with length k is created. So the longest length
// of all increasing sequences is the number of piles.

// O(n * log n)
function lengthOfLIS4(data) {
    if (data.length === 0) {
        return 0;
    }

    // store the smallest number(or top card) of each pile.
    const piles = new Array(data.length).fill(-Infinity);
    let numPiles = 0;
    for (let i = 0; i < data.length; i++) {
        // k — index of pile to add card
        const k = search(piles, data[i], 0, numPiles);

        piles[k] = data[i];

        if (k > numPiles) {
            numPiles++;
        }
    }

    return numPiles;
}

const input1 = [10, 9, 2, 5, 3, 7, 101, 18];
const input2 = [10, 9, 2, 5, 1, 18];
const input3 = [10, 9, 8, 5, 1];
const input4 = [2, 2];
// console.log(lengthOfLIS1_1(input1));
// console.log(lengthOfLIS1(input2));
// console.log(lengthOfLIS1_1(input3));
// console.log(lengthOfLIS1_1(input4));
//
// const describe = () => {};

describe('Longest increasing subsequence', () => {
    describe('Brute force O(2^n)', () => {
        it('one', () => {
            expect(lengthOfLIS1(input1)).toEqual(4);
            expect(lengthOfLIS1(input2)).toEqual(3);
            expect(lengthOfLIS1(input3)).toEqual(1);
            expect(lengthOfLIS1(input4)).toEqual(1);
        });
    });

    describe('Brute force with memo', () => {
        it('one', () => {
            expect(lengthOfLIS2(input1)).toEqual(4);
            expect(lengthOfLIS2(input2)).toEqual(3);
            expect(lengthOfLIS2(input3)).toEqual(1);
            expect(lengthOfLIS2(input4)).toEqual(1);
        });
    });

    describe('Optimized O(n^2)', () => {
        it('one', () => {
            expect(lengthOfLIS3(input1)).toEqual(4);
            expect(lengthOfLIS3(input2)).toEqual(3);
            expect(lengthOfLIS3(input3)).toEqual(1);
            expect(lengthOfLIS3(input4)).toEqual(1);
        });
    });

    describe('Optimized O(n * log n)', () => {
        it('one', () => {
            expect(lengthOfLIS4(input1)).toEqual(4);
            expect(lengthOfLIS4(input2)).toEqual(3);
            expect(lengthOfLIS4(input3)).toEqual(1);
            expect(lengthOfLIS4(input4)).toEqual(1);
        });
    });
});
