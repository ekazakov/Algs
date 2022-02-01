function ternarySearch(arr, value) {
    let l = 0;
    let r = arr.length - 1;


    while (l <= r) {
        // let l = 5 and r = 5
        // floor((5+5)/3) = 3
        // floor(2*(5+5)/3) = 6
        // vs
        // 5 + floor((5-5)/3) = 5 + 0
        // 5 - floor((5-5)/3) = 5 + 0
        // правильный способ разбиения на части
        let mid1 = l + Math.floor((r - l) / 3);
        let mid2 = r - Math.floor((r - l) / 3);
        console.log('l:', l, 'r:', r, 'mid1:', mid1, 'mid2:', mid2);

        if (arr[mid1] === value) {
            return mid1;
        } else if (arr[mid2] === value) {
            return mid2;
        }

        if (value < arr[mid1]) {
            r = mid1 - 1;
        } else if (value > arr[mid1] && value < arr[mid2]) {
            l = mid1 + 1;
            r = mid2 - 1;
        } else if (value > arr[mid2]) {
            l = mid2 + 1;
        }
    }

    return -1;
}


describe('Ternary Search', () => {
    it('one', () => {
        expect(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 2)).toEqual(1);
    });

    it('two', () => {
        expect(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8], 6)).toEqual(5);
    });

    it('three', () => {
        expect(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8], 8)).toEqual(7);
    });

    it('four', () => {
        expect(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8], 9)).toEqual(-1);
    });
});
