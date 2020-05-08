// https://www.geeksforgeeks.org/find-the-element-that-appears-once/

// Given an array where every element occurs three times, except
// one element which occurs only once. Find the element
// that occurs once. Expected time complexity is O(n) and O(1) extra space.
//
// Examples:
//
// Input: arr[] = [12, 1, 12, 3, 12, 1, 1, 2, 3, 3]
// Output: 2
// In the given array all element appear three times except 2 which appears once.
//
// Input: arr[] = [10, 20, 10, 30, 10, 30, 30]
// Output: 20
// In the given array all element appear three times except 20 which appears once.

// 0101
// 0011
// 0101
// 0011
// 1001
// 0101
// 0011

function findUnique(nums) {
    console.log('nums:', nums);
    const intSize = 32;
    let result = 0;

    for (let i = 0; i < intSize; i++) {
        const x = 1 << i;
        let sum = 0;

        for (const num of nums) {
            if ((num & x) !== 0) {
                sum++;
            }
        }

        result = result | sum % 3;
    }

    console.log('result:', result);
    return result;
}

findUnique([12, 1, 12, 3, 12, 1, 1, 2, 3, 3]);
findUnique([10, 20, 10, 30, 10, 30, 30]);
