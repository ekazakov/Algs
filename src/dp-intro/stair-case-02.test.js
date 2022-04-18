const { climbingStairs3, climbingStairsK, climbingStairsKOpt } = require('./stair-case-02');

describe('DP02. How many ways to climb stairs', () => {
    describe('Climb 1,2 or 3 stairs', () => {
        it('n=3', () => {
            expect(climbingStairs3(3)).toBe(4);
        });
        it('n=5', () => {
            expect(climbingStairs3(5)).toBe(13);
        });
        it('n=8', () => {
            expect(climbingStairs3(8)).toBe(81);
        });

    });

    describe('Climb 1..k stairs', () => {
        it('n=3, k=2', () => {
            expect(climbingStairsK(3, 2)).toBe(3);
        });
        it('n=4, k=2', () => {
            expect(climbingStairsK(4, 2)).toBe(5);
        });
        it('n=8, k=2', () => {
            expect(climbingStairsK(8, 2)).toBe(34);
        });

        it('n=3, k=3', () => {
            expect(climbingStairsK(3, 3)).toBe(4);
        });
        it('n=4, k=3', () => {
            expect(climbingStairsK(4, 3)).toBe(7);
        });
        it('n=8, k=3', () => {
            expect(climbingStairsK(8, 3)).toBe(81);
        });
    });


    describe('Climb 1..k stairs optimized', () => {
        it('n=3, k=2', () => {
            expect(climbingStairsKOpt(3, 2)).toBe(3);
        });
        it('n=4, k=2', () => {
            expect(climbingStairsKOpt(4, 2)).toBe(5);
        });
        it('n=8, k=2', () => {
            expect(climbingStairsKOpt(8, 2)).toBe(34);
        });

        it('n=3, k=3', () => {
            expect(climbingStairsKOpt(3, 3)).toBe(4);
        });
        it('n=4, k=3', () => {
            expect(climbingStairsKOpt(4, 3)).toBe(7);
        });
        it('n=8, k=3', () => {
            expect(climbingStairsKOpt(8, 3)).toBe(81);
        });
    });

});
