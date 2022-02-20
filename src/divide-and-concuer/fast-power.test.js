function fastPower(n, p) {
    if (p === 1) {
        return n;
    }

    if (p % 2 === 0) {
        const x = fastPower(n, p / 2);
        return x * x;
    }

    const x = fastPower(n, (p - 1) / 2);
    return x * x * n;
}

describe('Fast Power', () => {
    it('2^16', () => {
        expect(fastPower(2, 16)).toBe(2 ** 16);
    });

    it('2^17', () => {
        expect(fastPower(2, 17)).toBe(2 ** 17);
    });

});
