const { coinChangeExactlyTCoins } = require('./coin-change-exact-t-coins-09');

describe('DP09. Coin change exact T coins', () => {
    it('n=0, t=0, denomination: 1,2,3,5', () => {
        expect(coinChangeExactlyTCoins(0, 0, [1, 2, 3, 5])).toBe(1);
    });

    it('n=7, t=3, denomination: 1,2,3,5', () => {
        expect(coinChangeExactlyTCoins(7, 3, [1, 2, 3, 5])).toBe(9);
    });
});
