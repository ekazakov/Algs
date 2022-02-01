function closestNumbers(nums) {
    let minDistance = Infinity;
    let minPair = null;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                const distance = Math.abs(nums[i] - nums[j]);
                if (minDistance > distance) {
                    minDistance = distance;
                    minPair = [nums[i], nums[j]];
                }
            }
        }
    }

    return minPair;
}

function sort(nums) {
    for (let i = 1; i < nums.length; i++) {
        const item = nums[i];
        let j = i - 1;

        while (j >= 0 && nums[j] > item) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = item;
    }
}

function closestNumbers2(nums) {
    let pair = null;
    let min = Infinity;
    sort(nums);

    console.log('nums:', nums);
    for (let i = 1; i < nums.length; i++) {
        const distance = Math.abs(nums[i] - nums[i - 1]);
        if (min > distance) {
            min = distance;
            pair = [nums[i], nums[i - 1]];
        }
    }

    return pair;
}

describe('Closest real numbers', () => {
    describe('bruteForce', () => {
        it('one', () => {
            expect(closestNumbers([4.8, 4.999, 2, 3, 3.5, 1.05, 4.7, 5.01])).toEqual([
                4.999,
                5.01
            ]);
        });

        it('two', () => {
            expect(closestNumbers([2, 2, 2, 2])).toEqual([2, 2]);
        });

        it('two', () => {
            expect(closestNumbers([2, 1, 2, 2, 3])).toEqual([2, 2]);
        });

        it('two', () => {
            expect(closestNumbers([8, 1, 2, 3, 5])).toEqual([1, 2]);
        });
    });

    describe('sorting', () => {
        it('one', () => {
            expect(closestNumbers2([4.8, 4.999, 2, 3, 3.5, 1.05, 4.7, 5.01])).toEqual([
                5.01,
                4.999
            ]);
        });

        it('two', () => {
            expect(closestNumbers2([2, 2, 2, 2])).toEqual([2, 2]);
        });

        it('two', () => {
            expect(closestNumbers2([2, 1, 2, 2, 3])).toEqual([2, 2]);
        });

        it('two', () => {
            expect(closestNumbers2([8, 1, 2, 3, 5])).toEqual([2, 1]);
        });
    });
});
