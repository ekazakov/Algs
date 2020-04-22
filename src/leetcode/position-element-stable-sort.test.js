// https://www.geeksforgeeks.org/position-element-stable-sort
// Given an array of integers which may contain duplicate elements, an element of this array is given to us, we need to tell the final position of this element in the array, if a stable sort algorithm is applied.
//
// Examples :
//
// Input  : arr[] = [3, 4, 3, 5, 2, 3, 4, 3, 1, 5], index = 5
// Output : 4
// Element initial index – 5 (third 3)
// After sorting array by stable sorting algorithm, we get
// array as shown below
// [1(8), 2(4), 3(0), 3(2), 3(5), 3(7), 4(1), 4(6), 5(3), 5(9)]
// with their initial indices shown in parentheses next to them,
// Element's index after sorting = 4

function findSortedPosition(arr, index) {
    const value = arr[index];
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        if (value > arr[i] || (value === arr[i] && i < index)) {
            counter++;
        }
    }

    return counter;
}

describe('Position element in stable sort', () => {
    it('[3, 4, 3, 5, 2, 3, 4, 3, 1, 5], index = 5', () => {
        expect(findSortedPosition([3, 4, 3, 5, 2, 3, 4, 3, 1, 5], 5)).toBe(4);
    });
});
