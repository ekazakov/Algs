const { coinChangeUniqueWays } = require('./coin-change-unique-ways-11');

describe('DP11. Coin change: unique ways', () => {
    it('n=75, denomination: 1,2,3,5', () => {
        expect(coinChangeUniqueWays(75, [1, 2, 3, 5])).toBe(2894);
    });

    it('n=75, denomination: 2,3,5', () => {
        expect(coinChangeUniqueWays(75, [2, 3, 5])).toBe(107);
    });

    it('n=10, denomination: 4,1', () => {
        expect(coinChangeUniqueWays(10, [4, 1])).toBe(3);
    });
});
