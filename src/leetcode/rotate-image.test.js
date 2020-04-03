const { cloneDeep } = require('lodash');

// https://leetcode.com/problems/rotate-image
// You are given an n x n 2D matrix representing an image.
//
// Rotate the image by 90 degrees (clockwise).
//
// Note:
//
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
//
// Example 1:
//
// Given input matrix =
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
//
// rotate the input matrix in-place such that it becomes:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
// Example 2:
//
// Given input matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ],
//
// rotate the input matrix in-place such that it becomes:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]

// Example:
// Initial matrix
//  5,  1,  9, 11
//  2,  4,  8, 10
// 13,  3,  6,  7
// 15, 14, 12, 16

// first: 0 last: 3
// i: 0 offset: 0 top: 5
// 15,  1, 9,   5
//  2,  4, 8,  10
// 13,  3, 6,   7
// 16, 14, 12, 11
//
// i: 1 offset: 1 top: 1
// 15, 13,  9,  5
//  2,  4,  8,  1
// 12,  3,  6,  7
// 16, 14, 10, 11
//
// i: 2 offset: 2 top: 9
// 15, 13,  2,  5
// 14,  4,  8,  1
// 12,  3,  6,  9
// 16,  7, 10, 11
//
// first: 1 last: 2
// i: 1 offset: 0 top: 4
// 15, 13,  2,  5
// 14,  3,  4,  1
// 12,  6,  8,  9
// 16,  7, 10, 11

function rotate90CW1(m) {
    m = cloneDeep(m);
    const size = m.length;
    // console.log(m.map(i => i.join(', ')).join('\n'), '\n');
    for (let layer = 0; layer < Math.floor(size / 2); layer++) {
        let first = layer;
        let last = size - 1 - layer;
        // console.log('first:', first, 'last:', last);

        for (let i = first; i < last; i++) {
            const offset = i - first;
            const top = m[first][i];
            // console.log('i:', i, 'offset:', offset, 'top:', top, '\n');

            m[first][i] = m[last - offset][first];
            m[last - offset][first] = m[last][last - offset];
            m[last][last - offset] = m[i][last];
            m[i][last] = top;
            // console.log(m.map(i => i.join(', ')).join('\n'), '\n\n');
        }
    }

    return m;
}

// The idea is to in-place convert the matrix into its transpose(swap rows with columns) first.
// Then if we swap first column with the last column, second column with the second last column,
// and so on.. we will get our desired matrix.
// Example
// Initial:
// 1, 2, 3
// 4, 5, 6
// 7, 8, 9
//
// Transposed:
// 1, 4, 7
// 2, 5, 8
// 3, 6, 9
//
// Swapping columns:
// 7, 4, 1
// 2, 5, 8
// 3, 6, 9
//
// 7, 4, 1
// 8, 5, 2
// 3, 6, 9
//
// 7, 4, 1
// 8, 5, 2
// 9, 6, 3
function rotate90CW2(m) {
    m = cloneDeep(m);
    const size = m.length;
    // console.log('Initial:');
    // console.log(m.map(i => i.join(', ')).join('\n'), '\n');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = m[i][j];
            m[i][j] = m[j][i];
            m[j][i] = tmp;
        }
    }
    // console.log('Transposed:');
    // console.log(m.map(i => i.join(', ')).join('\n'), '\n');

    // console.log('Swapping columns:');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < Math.floor(size / 2); j++) {
            const tmp = m[i][j];
            m[i][j] = m[i][size - 1 - j];
            m[i][size - 1 - j] = tmp;
        }
        // console.log(m.map(i => i.join(', ')).join('\n'), '\n');
    }

    return m;
}

// Rotate CCW
// Initial matrix
// 5, 1, 9, 11
// 2, 4, 8, 10
// 13, 3, 6, 7
// 15, 14, 12, 16
//
// first: 0 last: 3 k: 0 tmp: 11
//
// 11, 1, 9, 16
// 2, 4, 8, 10
// 13, 3, 6, 7
// 5, 14, 12, 15
//
// first: 0 last: 3 k: 1 tmp: 9
//
// 11, 1, 7, 16
// 9, 4, 8, 10
// 13, 3, 6, 14
// 5, 2, 12, 15
//
// first: 0 last: 3 k: 2 tmp: 1
//
// 11, 10, 7, 16
// 9, 4, 8, 12
// 1, 3, 6, 14
// 5, 2, 13, 15
//
// first: 1 last: 2 k: 0 tmp: 8
//
// 11, 10, 7, 16
// 9, 8, 6, 12
// 1, 4, 3, 14
// 5, 2, 13, 15

function rotate90CCW1(m) {
    m = cloneDeep(m);
    const size = m.length;
    // console.log(m.map(i => i.join(', ')).join('\n'), '\n');

    for (let i = 0; i < Math.floor(size / 2); i++) {
        const first = i;
        const last = size - 1 - i;
        for (let j = first; j < last; j++) {
            const k = j - i;
            const tmp = m[first][last - k];
            // console.log('first:', first, 'last:', last, 'k:', k, 'tmp:', tmp, '\n');

            m[first][last - k] = m[last - k][last];
            m[last - k][last] = m[last][first + k];
            m[last][first + k] = m[first + k][first];
            m[first + k][first] = tmp;
            // console.log(m.map(i => i.join(', ')).join('\n'), '\n');
        }
    }

    return m;
}

function rotate90CCW2(m) {
    m = cloneDeep(m);
    const size = m.length;
    // console.log('Initial:');
    // console.log(m.map(i => i.join(', ')).join('\n'), '\n');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = m[i][j];
            m[i][j] = m[j][i];
            m[j][i] = tmp;
        }
    }
    // console.log('Transposed:');
    // console.log(m.map(i => i.join(', ')).join('\n'), '\n');

    // console.log('Swapping rows:');
    for (let i = 0; i < Math.floor(size / 2); i++) {
        for (let j = 0; j < size; j++) {
            const tmp = m[i][j];
            m[i][j] = m[size - 1 - i][j];
            m[size - 1 - i][j] = tmp;
        }
        // console.log(m.map(i => i.join(', ')).join('\n'), '\n');
    }

    return m;
}

const input1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const input2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16]
];

// rotate90CCW2(input1);
// rotate90CCW1(input2);

// describe = () => {};

describe('Rotate Image(Matrix)', () => {
    const input1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    const output1 = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
    ];

    const output1CCW = [
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7]
    ];

    const input2 = [
        [5, 1, 9, 11],
        [2, 4, 8, 10],
        [13, 3, 6, 7],
        [15, 14, 12, 16]
    ];
    const output2 = [
        [15, 13, 2, 5],
        [14, 3, 4, 1],
        [12, 6, 8, 9],
        [16, 7, 10, 11]
    ];
    const output2CCW = [
        [11, 10, 7, 16],
        [9, 8, 6, 12],
        [1, 4, 3, 14],
        [5, 2, 13, 15]
    ];

    describe('CW rotation 1', () => {
        it('one', () => {
            expect(rotate90CW1(input1)).toEqual(output1);
        });

        it('two', () => {
            expect(rotate90CW1(input2)).toEqual(output2);
        });
    });

    describe('CCW rotation 1', () => {
        it('one', () => {
            expect(rotate90CCW1(input1)).toEqual(output1CCW);
        });

        it('two', () => {
            expect(rotate90CCW1(input2)).toEqual(output2CCW);
        });
    });

    describe('CW rotation 2', () => {
        it('one', () => {
            expect(rotate90CW2(input1)).toEqual(output1);
        });

        it('two', () => {
            expect(rotate90CW2(input2)).toEqual(output2);
        });
    });

    describe('CCW rotation 2', () => {
        it('one', () => {
            expect(rotate90CCW2(input1)).toEqual(output1CCW);
        });

        it('two', () => {
            expect(rotate90CCW2(input2)).toEqual(output2CCW);
        });
    });
});
