// https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/
// Given an array A[] consisting 0s, 1s and 2s. The task is to write
// a function that sorts the given array. The functions should put
// all 0s first, then all 1s and all 2s in last.
//
// Examples:
//
// Input: {0, 1, 2, 0, 1, 2}
// Output: {0, 0, 1, 1, 2, 2}
//
//
//
// Input: {0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1}
// Output: {0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2}

function sort012A(arr) {
    const counters = {};

    for (let i = 0; i < arr.length; i++) {
        if (counters[arr[i]] == null) {
            counters[arr[i]] = 1;
        } else {
            counters[arr[i]] = counters[arr[i]] + 1;
        }
    }

    let pos = 0;

    for (let i = 0; i < 3; i++) {
        const offset = pos;
        for (let j = offset; j < offset + counters[i]; j++) {
            arr[j] = i;
            pos++;
        }
    }

    return arr;
}

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

function sort012B(arr) {
    let lo = 0;
    let mid = 0;
    let hi = arr.length - 1;
    while (mid < hi) {
        switch (arr[mid]) {
            case 0:
                swap(arr, mid, lo);
                lo += 1;
                mid += 1;
                break;
            case 1:
                mid += 1;
                break;
            case 2:
                swap(arr, mid, hi);
                hi -= 1;
                break;
        }
    }
    return arr;
}

describe('Sort an array of 0s, 1s and 2s', function() {
    const input1 = [0, 1, 2, 0, 1, 2];
    const output1 = [0, 0, 1, 1, 2, 2];

    const input2 = [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1];
    const output2 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2];

    const input3 = [0, 2, 0, 2, 0, 2];
    const output3 = [0, 0, 0, 2, 2, 2];

    const input4 = [2, 2, 2, 2, 2];
    const output4 = [2, 2, 2, 2, 2];

    const input5 = [2, 2, 0, 0, 1];
    const output5 = [0, 0, 1, 2, 2];

    describe('Counting solution', function() {
        it('one', () => {
            expect(sort012A(input1)).toEqual(output1);
        });

        it('two', () => {
            expect(sort012A(input2)).toEqual(output2);
        });

        it('three', () => {
            expect(sort012A(input3)).toEqual(output3);
        });

        it('four', () => {
            expect(sort012A(input4)).toEqual(output4);
        });

        it('five', () => {
            expect(sort012A(input5)).toEqual(output5);
        });
    });

    describe('3-partition solution', function() {
        it('one', () => {
            expect(sort012B(input1)).toEqual(output1);
        });

        it('two', () => {
            expect(sort012B(input2)).toEqual(output2);
        });

        it('three', () => {
            expect(sort012B(input3)).toEqual(output3);
        });

        it('four', () => {
            expect(sort012B(input4)).toEqual(output4);
        });

        it('five', () => {
            expect(sort012B(input5)).toEqual(output5);
        });
    });
});
