// https://leetcode.com/problems/merge-sorted-array
// https://leetcode.com/problems/merge-two-sorted-lists/
// https://leetcode.com/problems/merge-two-binary-trees/

/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
*/

function merge2Sorted1(arr1, arr2) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let i = 0;

    while (leftIndex < arr1.length || rightIndex < arr2.length) {
        i++;
        if (i > 100) {
            break;
        }
        const leftMin = arr1[leftIndex];
        const rightMin = arr2[rightIndex];

        if (leftMin != null && rightMin != null) {
            if (leftMin < rightMin) {
                leftIndex++;
                result.push(leftMin);
            } else {
                rightIndex++;
                result.push(rightMin);
            }
        } else if (leftMin != null) {
            leftIndex++;
            result.push(leftMin);
        } else if (rightMin != null) {
            rightIndex++;
            result.push(rightMin);
        }
    }

    return result;
}

function merge2Sorted2(arr1, arr2) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let i = 0;

    while (leftIndex < arr1.length || rightIndex < arr2.length) {
        i++;
        if (i > 100) {
            break;
        }
        const leftMin = arr1[leftIndex] || Infinity;
        const rightMin = arr2[rightIndex] || Infinity;

        if (leftMin < rightMin) {
            leftIndex++;
            result.push(leftMin);
        } else {
            rightIndex++;
            result.push(rightMin);
        }
    }

    return result;
}

describe('Merge two sorted arrays', () => {
    const data = [
        [1, 3, 4, 7, 8, 14],
        [2, 3, 5, 9, 11, 17, 22, 23, 26]
    ];
    const result = [1, 2, 3, 3, 4, 5, 7, 8, 9, 11, 14, 17, 22, 23, 26];
    describe('Solution one', () => {
        it('one', () => {
            expect(merge2Sorted1(...data)).toEqual(result);
        });

        it('two', () => {
            const data2 = [
                [3, 7, 12, 13],
                [4, 8, 77]
            ];
            const result2 = [3, 4, 7, 8, 12, 13, 77];
            expect(merge2Sorted1(...data2)).toEqual(result2);
        });
    });

    describe('Solution two', () => {
        it('one', () => {
            expect(merge2Sorted2(...data)).toEqual(result);
        });
    });
});
