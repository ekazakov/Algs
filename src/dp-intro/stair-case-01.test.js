const { stairs, stairsOptimized } = require('./stair-case-01');

describe('DP01. How many ways to climb stairs', () => {
    describe('Climb 1 or 2 stairs at a time. Naive', () => {
        it('n=3', () => {
            expect(stairs(3)).toBe(3);
        });
        it('n=4', () => {
            expect(stairs(4)).toBe(5);
        });
        it('n=8', () => {
            expect(stairs(8)).toBe(34);
        });
        it('n=80', () => {
            expect(stairs(80)).toBe(37889062373143900);
        });
    });

    describe('Climb 1 or 2 stairs at a time. Optimize', () => {
        it('n=3', () => {
            expect(stairsOptimized(3)).toBe(3);
        });
        it('n=4', () => {
            expect(stairsOptimized(4)).toBe(5);
        });
        it('n=8', () => {
            expect(stairsOptimized(8)).toBe(34);
        });
        it('n=80', () => {
            expect(stairsOptimized(80)).toBe(37889062373143900);
        });
    });

});
