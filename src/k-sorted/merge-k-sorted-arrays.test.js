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

    if (heap[leftIndex] == null) {
        return;
    }

    if (heap[rightIndex] == null) {
        return leftIndex;
    }

    if (heap[leftIndex].value < heap[rightIndex].value) {
        return leftIndex;
    }

    return rightIndex;
}

function percolateDown(heap, index) {
    let minIndex = minChild(heap, index);

    while (minIndex != null && heap[index].value > heap[minIndex].value) {
        const tmp = heap[minIndex];
        heap[minIndex] = heap[index];
        heap[index] = tmp;
        index = minIndex;
        minIndex = minChild(heap, index);
    }
}

function buildHeap(heap) {
    let i = floordiv(heap.length, 2);
    while (i > 0) {
        percolateDown(heap, i);
        i -= 1;
    }
}

/*
 NOTE: Key Insight
 Each one of the K arrays will have one element in the heap at all times.
 One trick we're using is that once we've added all the elements from a given array
 to the result, we set the value property on its "node" in the heap to Infinity,
 so it bubbles down to the bottom.
 The goal here is to eventually fill the heap up with "nodes" with values of Infinity.
 Once the top node's value is Infinity, we break out of the while loop.
 */

// Run every element in the arrays through the minHeap         O(NK log(K))

// While the value at the top is not equal to infinity         O(N K) elements
// Retrieve the top element in the heap                      O(1)
// Insert value from top element into result                 O(1)
// Increment the elementIndex                                O(1)
// If the elementIndex is greater than the length of the array at arrayIndex:
// Set the top's value to Infinity                         O(1)
// Otherwise:
// Update the value to reflect next element in the array   O(1)

// Then bubble down the top element                          O(log(K)) for each element

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
            min.value = Number.MAX_VALUE;
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

// O(N * log(K))
// Iterate over all items of all arrays is O(N)
// while (step < data.length) loop have log(K) steps(we increase step twice on every iteration).
// So to find min item takes log(K) times in average for total N items

function mergeKSortedDivideAndConquer(data) {
    let step = 1;
    while (step < data.length) {
        // console.log('>> step:', step);
        for (let j = 0; j < data.length - step; j += step * 2) {
            // console.log('j:', j, '(j + step):', j + step);
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
            expect(mergeKSortedHeap(data)).toEqual(result);
        });

        it('Arrays have different length', () => {
            expect(mergeKSortedHeap(data2)).toEqual(result2);
        });
    });

    describe('Solution with divide and conquer O(N * log(K))', () => {
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

        it('Arrays have different length', () => {
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

        it('Arrays have different length and arrays number is odd', () => {
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
