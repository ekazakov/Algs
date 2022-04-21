/*
Problem:
	Unique Paths
	A robot is located in the top-left corner of an m x n grid (marked 'S' in the diagram below).
	The robot can only move either down or right at any point in time.
	The robot is trying to reach the bottom-right corner of the grid (marked 'E' in the diagram below).
	How many possible unique paths are there?
	+---+---+---+---+
	| S |   |   |   |
	+---+---+---+---+
	|   |   |   |   |
	+---+---+---+---+
	|   |   |   | E |
	+---+---+---+---+
	Above is a 3 x 4 grid. How many possible unique paths are there?
*/

const uniquePaths1 = function(m, n) {
    const dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(0);
    }
    dp[0][0] = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0 && j > 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            } else if (i > 0) {
                dp[i][j] = dp[i - 1][j];
            } else if (j > 0) {
                dp[i][j] = dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
};

exports.uniquePaths1 = uniquePaths1;

/*
Problem:
	Unique Paths with Obstacles
	A robot is located in the top-left corner of an m x n grid (marked 'S' in the diagram below).
	The robot can only move either down or right at any point in time.
	The robot is trying to reach the bottom-right corner of the grid (marked 'E' in the diagram below).
	Now consider if some obstacles are added to the grids.
	How many unique paths would there be?
	+---+---+---+---+
	| S |   |   |   |
	+---+---+---+---+
	|   | 1 | 1 | 1 |
	+---+---+---+---+
	|   |   |   | E |
	+---+---+---+---+
	An obstacle and empty space is marked as 1 and 0 respectively in the grid.
*/

exports.uniquePathsWithObstacles = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(0);
    }

    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                dp[i][j] = 0;
                continue;
            }
            if (i > 0 && j > 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            } else if (i > 0) {
                dp[i][j] = dp[i - 1][j];
            } else if (j > 0) {
                dp[i][j] = dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
};

exports.uniquePathsWithObstaclesOpt = function uniquePathsWithObstaclesOpt(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = new Array(2);
    for (let i = 0; i < 2; i++) {
        dp[i] = new Array(n).fill(0);
    }

    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                dp[i % 2][j] = 0;
                continue;
            }
            if (i > 0 && j > 0) {
                dp[i % 2][j] = dp[(i - 1) % 2][j] + dp[i % 2][j - 1];
            } else if (i > 0) {
                dp[i % 2][j] = dp[(i - 1) % 2][j];
            } else if (j > 0) {
                dp[i % 2][j] = dp[i % 2][j - 1];
            }
        }
    }

    return dp[(m - 1) % 2][n - 1];
};

/*
Problem:
	Maximum Profit in a Grid
	A robot is located at the top-left corner of a m x n grid (marked 'S' in the diagram below).
	The robot can only move either down or right at any point in time.
	The robot is trying to reach the bottom-right corner of the grid (marked 'E' in the diagram below).
	Each cell contains a coin the robot can collect.
	What is the maximum profit the robot can accumulate?
	+---+---+---+---+
	| S | 2 | 2 | 1 |
	+---+---+---+---+
	| 3 | 1 | 1 | 1 |
	+---+---+---+---+
	| 4 | 4 | 2 | E |
	+---+---+---+---+
*/

function maxProfitInAGrid(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j] = grid[i][j];

            if (i > 0 && j > 0) {
                dp[i][j] += Math.max(dp[i][j - 1], dp[i - 1][j]);
            } else if (i > 0) {
                dp[i][j] += dp[i - 1][j];
            } else if (j > 0) {
                dp[i][j] += dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
}

exports.maxProfitInAGrid = maxProfitInAGrid;

function maxProfitInAGridPath(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = new Array(m);
    const from = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n);
        from[i] = new Array(n);
    }
    // from[0][0] = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j] = grid[i][j];

            if (i > 0 && j > 0) {
                dp[i][j] += Math.max(dp[i][j - 1], dp[i - 1][j]);
                from[i][j] = dp[i][j - 1] > dp[i - 1][j] ? [i, j - 1] : [i - 1, j];
            } else if (i > 0) {
                dp[i][j] += dp[i - 1][j];
                from[i][j] = [i - 1, j];
            } else if (j > 0) {
                dp[i][j] += dp[i][j - 1];
                from[i][j] = [i, j - 1];
            }
        }
    }

    let i = m - 1;
    let j = n - 1;
    const path = [];

    path.push(`(${i},${j})`);
    while (i > 0 || j > 0) {
        // console.log('i:', i, 'j:', j, from[i][j]);
        [i, j] = from[i][j];
        path.push(`(${i},${j})`);
    }

    return path.reverse();
}

exports.maxProfitInAGridPath = maxProfitInAGridPath;
