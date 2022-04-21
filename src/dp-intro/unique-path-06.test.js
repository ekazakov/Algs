const {
    uniquePaths1,
    uniquePathsWithObstacles,
    maxProfitInAGrid,
    maxProfitInAGridPath
} = require('./uniuqe-path-06');

describe('DP06. Unique paths in matrix', () => {
    describe('uniquePaths', () => {
        it('m=1, n=1', () => {
            expect(uniquePaths1(1, 1)).toEqual(1);
        });

        it('m=3, n=4', () => {
            expect(uniquePaths1(3, 4)).toEqual(10);
        });

        it('m=3, n=7', () => {
            expect(uniquePaths1(3, 7)).toEqual(28);
        });
    });

    describe('uniquePathsWithObstacles', () => {
        it('small matrix', () => {
            const m = [[0, 0]];
            expect(uniquePathsWithObstacles(m)).toEqual(1);
        });

        it('simple matrix', () => {
            const m = [
                [0, 0, 0, 0],
                [0, 0, 1, 1],
                [0, 0, 0, 0]
            ];
            expect(uniquePathsWithObstacles(m)).toEqual(3);
        });
    });

    describe('maxProfitInAGrid', () => {
        it('simple test', () => {
            const m = [
                [0, 2, 2, 1],
                [3, 1, 1, 1],
                [4, 4, 2, 0]
            ];
            expect(maxProfitInAGrid(m)).toEqual(13);
        });

        it('simple test 2', () => {
            const m = [
                [0, 2, 2, 50],
                [3, 1, 1, 100],
                [4, 4, 2, 0]
            ];
            expect(maxProfitInAGrid(m)).toEqual(154);
        });
    });

    describe('maxProfitInAGridPath', () => {
        it('simple test', () => {
            const m = [
                [0, 2, 2, 1],
                [3, 1, 1, 1],
                [4, 4, 2, 0]
            ];
            const path = ['(0,0)', '(1,0)', '(2,0)', '(2,1)', '(2,2)', '(2,3)'];
            expect(maxProfitInAGridPath(m)).toEqual(path);
        });

        it('simple test 2', () => {
            const m = [
                [0, 2, 2, 50],
                [3, 1, 1, 100],
                [4, 4, 2, 0]
            ];
            const path = ['(0,0)', '(0,1)', '(0,2)', '(0,3)', '(1,3)', '(2,3)'];
            expect(maxProfitInAGridPath(m)).toEqual(path);
        });
    });
});
