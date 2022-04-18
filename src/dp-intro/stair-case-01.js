exports.stairs = function stairs(n) {
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;

    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }

    return dp[n];
};


exports.stairsOptimized = function stairsOptimized(n) {
    let dp1 = 1;
    let dp2 = 1;

    for(let i = 2; i <= n; i++) {
        const tmp = dp1;
        dp1 = dp1 + dp2;
        dp2 = tmp;
    }

    return dp1;
};
