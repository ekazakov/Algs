// https://leetcode.com/problems/merge-k-sorted-lists/
// https://medium.com/outco/how-to-merge-k-sorted-arrays-c35d87aa298e

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

const floordiv = (val, devider) => Math.floor(val / devider);

function minChild(heap, index) {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;

    if (rightIndex > heap.length) {
        return leftIndex;
    }

    if (heap[leftIndex].value < heap[rightIndex].value) {
        return leftIndex;
    }

    return rightIndex;
}

function percolateDown(heap, index) {
    while (index * 2 + 1 <= heap.length) {
        const minIndex = minChild(heap, index);

        if (heap[minIndex] > heap[minIndex]) {
            const tmp = heap[minIndex];
            heap[minIndex] = heap[index];
            heap[index] = tmp;
        }

        index = minIndex;
    }
}

function buildHeap(heap) {
    let i = floordiv(heap.length, 2);
    while (i > 0) {
        percolateDown(heap, i);
        i -= 1;
    }
}

function mergeKSortedHeap(data) {
    const result = [];
    const minHeap = [];
    const len = data.reduce((acc, arr) => acc + arr.length, 0);

    data.forEach((array, index) => {
        minHeap.push({
            arrayIndex: index,
            elementIndex: 0,
            value: array[0]
        });
    });

    buildHeap(minHeap);

    while (result.length < len) {
        const min = minHeap[0];
        result.push(min.value);

        min.elementIndex++;

        if (min.elementIndex >= data[min.arrayIndex].length) {
            min.value = Infinity;
        } else {
            min.value = data[min.arrayIndex][min.elementIndex];
        }

        percolateDown(minHeap, 0);
    }

    return result;
}

function merge2Sorted(arr1, arr2) {
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

function mergeKSortedDivideAndConquer(data) {
    let i = data.length;

    /*
    amount = len(lists)
    interval = 1
    while interval < amount:
        for i in range(0, amount - interval, interval * 2):
            lists[i] = self.merge2Lists(lists[i], lists[i + interval])
        interval *= 2
    return lists[0] if amount > 0 else lists
*/
    let step = 1;
    while (step < data.length) {
        // console.log('>> step:', step);
        for (let j = 0; j < data.length - step; j += step * 2) {
            console.log('j:', j, '(j + step):', j + step);
            data[j] = merge2Sorted(data[j], data[j + step]);
        }
        step *= 2;
    }

    return data[0];
}

describe('Merge K sorted arrays', () => {
    describe('Simple solution O(n * k * k)', () => {
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
        // prettier-ignore
        const result2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 19];

        it('All arrays have the same length', () => {
            expect(mergeKSortedSimple(data)).toEqual(result);
        });

        it('Arrays have different length', () => {
            expect(mergeKSortedSimple(data2)).toEqual(result2);
        });
    });

    describe('Solution with min heap O(n * k * log(k))', () => {
        const data = [
            [1, 10, 11, 15],
            [2, 4, 9, 14],
            [5, 6, 8, 16],
            [3, 7, 12, 13]
        ];
        // prettier-ignore
        const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        const data2 = [
            [1, 10, 11, 15, 16, 19],
            [2, 4, 9, 14],
            [5, 6, 8, 16, 17],
            [3, 7, 12, 13]
        ];
        // prettier-ignore
        const result2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 19];

        it('All arrays have the same length', () => {
            expect(mergeKSortedSimple(data)).toEqual(result);
        });

        it('Arrays have different length', () => {
            expect(mergeKSortedSimple(data2)).toEqual(result2);
        });
    });

    describe('Solution with divide and conquer', () => {
        it('All arrays have the same length', () => {
            const data = [
                [1, 10, 11, 15],
                [2, 4, 9, 14],
                [5, 6, 8, 16],
                [3, 7, 12, 13]
            ];
            const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            expect(mergeKSortedDivideAndConquer(data)).toEqual(result);
        });

        it.only('Arrays have different length', () => {
            const data2 = [
                [1, 10, 11, 15, 16, 19],
                [2, 4, 9, 14],
                [5, 6, 8, 16, 17],
                [3, 7, 12, 13]
            ];
            // prettier-ignore
            const result2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 19];
            expect(mergeKSortedDivideAndConquer(data2)).toEqual(result2);
        });

        it.only('Arrays have different length and arrays number is odd', () => {
            const data3 = [
                [1, 10, 11, 15, 16, 19],
                [2, 4, 9, 14],
                [5, 6, 8, 16, 17],
                [3, 7, 12, 13],
                [4, 8, 77]
            ];
            // prettier-ignore
            const result3 = [1, 2, 3, 4, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 19, 77];
            expect(mergeKSortedDivideAndConquer(data3)).toEqual(result3);
        });
    });
});
