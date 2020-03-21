function binarySearch(arr, value) {
    let l = 0;
    let r = arr.length - 1;

    while (l <= r) {
        const mid = Math.floor((l + r) / 2);

        if (arr[mid] === value) {
            return mid;
        }

        if (arr[mid] > value) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return -1;
}

describe('Binary Search', () => {
    it('one', () => {
        expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 2)).toEqual(1);
    });

    it('two', () => {
        expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 6)).toEqual(5);
    });

    it('three', () => {
        expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 8)).toEqual(7);
    });

    it('four', () => {
        expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 9)).toEqual(-1);
    });
});

function findChangeBs(arr) {
    const start = arr.length - 1;
    let index = -1;
    for (let step = start; step >= 1; ) {
        // console.log('step:', step, 'index:', index);
        while (!arr[index + step]) {
            index += step;
        }
        step = Math.floor(step / 2);
    }

    return index + 1;
}

describe('Find changes with BS', function() {
    it('Find changes from true to false', () => {
        expect(findChangeBs([false, false, false, true, true, true, true])).toBe(3);
        expect(findChangeBs([false, false, false, false, true, true, true, true])).toBe(
            4
        );
    });
});
