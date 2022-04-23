// https://github.com/andreygrehov/dp/blob/master/lecture10/lecture10_part_2.go
/*
Problem:
	Paint Fence With Two Colors
	There is a fence with n posts, each post can be painted with either green or blue color.
	You have to paint all the posts such that no more than two adjacent fence posts have the same color.
	Return the total number of ways you can paint the fence.
*/

// green = 1
// blue  = 0

// F(i,j) = F(i-1, 1-j) + F(i-2, 1-j);
// G(n) = F(n, 1) + F(n, 0);
const numWaysToPaint = function(n) {
    const dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(2);
    }

    dp[1][0] = 1;
    dp[1][1] = 1;
    dp[2][0] = 2;
    dp[2][1] = 2;

    for (let i = 3; i <= n; i++) {
        for (let j = 0; j <= 1; j++) {
            dp[i][j] = dp[i - 1][1 - j] + dp[i - 2][1 - j];
        }
    }

    return dp[n][0] + dp[n][1];
};

exports.numWaysToPaint = numWaysToPaint;
