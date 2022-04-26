const { coinChange } = require('./coin-change-base-08');

describe('DP08. Coin change base', () => {
    it('n=3, denomination: 1,3,5,10', () => {
        expect(coinChange(3)).toBe(2);
    });
    it('n=4, denomination: 1,3,5,10', () => {
        expect(coinChange(4)).toBe(3);
    });
    it('n=8, denomination: 1,3,5,10', () => {
        expect(coinChange(8)).toBe(19);
    });
});

