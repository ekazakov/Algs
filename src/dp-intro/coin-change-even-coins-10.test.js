const { coinChangeEvenCoins } = require('./coin-change-even-coins-10');

describe('DP10. Coin change even coins', () => {
    it('n=4, denomination: 1,3,5,10', () => {
        // (1,1,1,1), (1,3), (3,1)
        expect(coinChangeEvenCoins(4, [1, 3, 5, 10])).toBe(3);
    });

    it('n=6, denomination: 1,3,5,10', () => {
        // (1,1,1,1,1,1), (1,1,1,3), (1,1,3,1), (1,3,1,1), (3,1,1,1), (3,3), (1,5), (5,1)
        expect(coinChangeEvenCoins(6, [1, 3, 5, 10])).toBe(8);
    });
});
