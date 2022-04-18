const { minCostToClimbStairs, minCostToClimbStairsOpt } = require('./stair-case-04');

describe('DP04. Min cost to climb stairs', () => {
    describe('naive', () => {
        it('n=3', () => {
            const p = [3, 2, 4];
            expect(minCostToClimbStairs(3, p)).toBe(6);
        });
    });

    describe('optimize', () => {
        it('n=3', () => {
            const p = [3, 2, 4];
            expect(minCostToClimbStairsOpt(3, p)).toBe(6);
        });
    });

});
