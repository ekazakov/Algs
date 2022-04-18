// 	Paid Staircase

// 	You are climbing a paid staircase. It takes n steps to reach to the top and you have to
// 	pay p[i] to step on the i-th stair. Each time you can climb 1 or 2 steps.
// 	What's the cheapest amount you have to pay to get to the top of the staircase?

// https://github.com/andreygrehov/dp/tree/master/lecture7

function minCostToClimbStairs(n, price) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = price[0];

    for (let i = 2; i <= n; i++) {
        dp[i] = price[i-1] + Math.min(dp[i - 1], dp[i - 2]);
    }

    return dp[n];
}

exports.minCostToClimbStairs = minCostToClimbStairs;


function minCostToClimbStairsOpt(n, price) {
    // const dp = new Array(n + 1).fill(0);
    let dp0 = 0;
    let dp1 = price[0];

    for (let i = 2; i <= n; i++) {
        const sum = price[i-1] + Math.min(dp0, dp1)
        dp0 = dp1;
        dp1 = sum;
    }

    return dp1;
}

exports.minCostToClimbStairsOpt = minCostToClimbStairsOpt;
