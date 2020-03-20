const { random, sortBy } = require('lodash');

function mergeSortRec(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortRec(arr.slice(0, mid));
    const right = mergeSortRec(arr.slice(mid));

    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}
// const dataR = Array.from(new Array(14), () => random(-100, 100));

describe('Merge sort', function() {
    describe('Recursive version', () => {
        it('empty', () => {
            expect(mergeSortRec([])).toEqual([]);
        });

        it('one item', () => {
            expect(mergeSortRec([1])).toEqual([1]);
        });

        it('sorted array', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
            expect(mergeSortRec(data)).toEqual(data);
        });
        it('reverse sorted array', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].reverse();
            const result = [...data].reverse();
            expect(mergeSortRec(data)).toEqual(result);
        });

        it('with repeated items', () => {
            const data = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
            const result = sortBy(data);
            expect(mergeSortRec(data)).toEqual(result);
        });

        it('random one', () => {
            const data = [94, 24, 97, 75, 52, -72, 47, -6, 82, -28, 36, 64, 69, -15];
            const result = sortBy(data);
            expect(mergeSortRec(data)).toEqual(result);
        });

        it('random two', () => {
            const data = [91, 100, -99, -76, -38, 20, 19, -13, 90, 22, 40, 40, -22, 65];
            const result = sortBy(data);
            expect(mergeSortRec(data)).toEqual(result);
        });
    });
});
