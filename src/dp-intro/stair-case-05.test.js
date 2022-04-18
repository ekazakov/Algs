const { climbStairsPath } = require('./stair-case-05');

describe('DP05. Path to climb stairs', () => {
    describe('naive', () => {
        it('n=8', () => {
            const p = [0, 3, 2, 4, 6, 1, 1, 5, 3];
            const path = [0, 2, 3, 5, 6, 8];
            expect(climbStairsPath(8, p)).toEqual(path);
        });
    });

    // describe('optimize', () => {
    //     it('n=3', () => {
    //         const p = [3, 2, 4];
    //         expect(minCostToClimbStairsOpt(3, p)).toBe(6);
    //     });
    // });
});
