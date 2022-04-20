const { uniquePaths1, uniquePathsWithObstacles } = require('./uniuqe-path-06');

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

});
