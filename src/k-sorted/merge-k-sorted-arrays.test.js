// https://leetcode.com/problems/merge-k-sorted-lists/

function mergeKSortedSimple(data) {
    const result = [];

    const mins = new Array(data.length).fill(null);
    const len = data.reduce((acc, arr) => acc + arr.length, 0);

    data.forEach((array, index) => {
        mins[index] = array.shift();
    });

    while (result.length < len) {
        const minValue = Math.min(...mins);
        // console.log('minValue:', minValue);
        const minIndex = mins.indexOf(minValue);
        // console.log('minIndex:', minIndex);
        const tmp = data[minIndex].shift();
        // console.log('tmp:', tmp);
        mins[minIndex] = tmp != null ? tmp : Infinity;

        result.push(minValue);
    }

    return result;
}

describe('Merge K sorted arrays', () => {
    const data = [
        [1, 10, 11, 15],
        [2, 4, 9, 14],
        [5, 6, 8, 16],
        [3, 7, 12, 13]
    ];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const data2 = [
        [1, 10, 11, 15, 16, 19],
        [2, 4, 9, 14],
        [5, 6, 8, 16, 17],
        [3, 7, 12, 13]
    ];
    const result2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 19];

    describe('Simple solution O(n * k * k)', () => {
        it('All arrays have the same length', () => {
            expect(mergeKSortedSimple(data)).toEqual(result);
        });

        it('Arrays have different length', () => {
            expect(mergeKSortedSimple(data2)).toEqual(result2);
        });
    });
});
