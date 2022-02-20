function findMajority(items) {
    // console.log('items:', items.join(', '))
    if (items.length === 1) {
        return items[0];
    }

    const mid = Math.floor(items.length / 2);
    const left = findMajority(items.slice(0, mid));
    const right = findMajority(items.slice(mid));

    let countLeft = 0;
    let countRight = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i] === left) {
            countLeft++;
            if (countLeft > mid ) {
                return left;
            }
        }

        if (items[i] === right) {
            countRight++;

            if (countRight > mid) {
                return right;
            }
        }
    }

    return null;
}

describe('Find Majority', () => {
    it('[a, a, b, c, a, b, a]', () => {
        const items = ['a', 'a', 'b', 'c', 'a', 'b', 'a'];
        expect(findMajority(items)).toBe('a');
    });

    it('[a, a, b, c, a, b, a, a]', () => {
        const items = ['a', 'a', 'b', 'c', 'a', 'b', 'a', 'a'];
        expect(findMajority(items)).toBe('a');
    });

    it('[a, a, b, c, a, b, a, e]', () => {
        const items = ['a', 'a', 'b', 'c', 'a', 'b', 'a', 'e'];
        expect(findMajority(items)).toBe(null);
    });
});
