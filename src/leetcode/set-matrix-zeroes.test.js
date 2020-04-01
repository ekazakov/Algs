// https://leetcode.com/problems/set-matrix-zeroes/
// Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
//
// Example 1:
//
// Input:
// [
//   [1,1,1],
//   [1,0,1],
//   [1,1,1]
// ]
// Output:
// [
//   [1,0,1],
//   [0,0,0],
//   [1,0,1]
// ]
// Example 2:
//
// Input:
// [
//   [0,1,2,0],
//   [3,4,5,2],
//   [1,3,1,5]
// ]
// Output:
// [
//   [0,0,0,0],
//   [0,4,5,0],
//   [0,3,1,0]
// ]

function setRow(m, row, char) {
    for (let c = 0; c < m[row].length; c++) {
        if (m[row][c] !== 0) {
            m[row][c] = char;
        }
    }
}

function setColumn(m, col, char) {
    for (let r = 0; r < m.length; r++) {
        if (m[r][col] !== 0) {
            m[r][col] = char;
        }
    }
}

const setZeroes = function(m) {
    for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
            if (m[r][c] === 0) {
                setRow(m, r, '-');
                setColumn(m, c, '-');
            }
            // console.log(m.map(i=> i.join(', ')).join('\n'));
        }
    }

    for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
            if (m[r][c] === '-') {
                m[r][c] = 0;
            }
        }
    }

    return m;
};

const setZeroes2 = function(m) {
    let firsRowHasZeros = false;
    let firsColHasZeros = false;
    for (let r = 0; r < m.length; r++) {
        if (m[r][0] === 0) {
            firsColHasZeros = true;
            break;
        }
    }

    for (let c = 0; c < m[0].length; c++) {
        if (m[0][c] === 0) {
            firsRowHasZeros = true;
            break;
        }
    }

    for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
            if (m[r][c] === 0) {
                m[0][c] = 0;
                m[r][0] = 0;
            }
        }
    }

    // console.log('markers:\n', m.map(i => i.join(', ')).join('\n'));

    for (let r = 1; r < m.length; r++) {
        for (let c = 1; c < m[0].length; c++) {
            if (m[r][0] === 0 || m[0][c] === 0) {
                m[r][c] = 0;
            }
        }
    }

    // console.log(m.map(i => i.join(', ')).join('\n'));

    if (firsRowHasZeros) {
        setRow(m, 0, 0);
    }

    if (firsColHasZeros) {
        setColumn(m, 0, 0);
    }

    return m;
};

describe('Set matrix zeroes', function() {
    const input1 = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ];
    const output1 = [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1]
    ];

    const input2 = [
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5]
    ];
    const output2 = [
        [0, 0, 0, 0],
        [0, 4, 5, 0],
        [0, 3, 1, 0]
    ];

    describe('Brute force', () => {
        it('One', () => {
            expect(setZeroes(input1)).toEqual(output1);
        });

        it('Two', () => {
            expect(setZeroes(input2)).toEqual(output2);
        });
    });

    describe('Efficient solution', () => {
        it.skip('One', () => {
            expect(setZeroes2(input1)).toEqual(output1);
        });

        it('Two', () => {
            expect(setZeroes2(input2)).toEqual(output2);
        });
    });
});
