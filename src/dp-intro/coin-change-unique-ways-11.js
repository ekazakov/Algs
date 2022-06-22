/*
 Video: https://youtu.be/g0VjciqYeDU
 Problem:

 Coin change
 Given an unlimited supply of coins of given denominations,
 find the unique number of ways to make a change of size n.

 Denominations:
 coins = [1, 2, 3, 5]
 */
function coinChangeUniqueWays(n, coins = [1, 3, 5, 10]) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let j = 0; j < coins.length; j++) {
        const coin = coins[j];
        for (let i = 1; i <= n; i++) {
            if (i - coin >= 0) {
                dp[i] += dp[i - coin];
            }
        }
    }

    return dp[n];
}

exports.coinChangeUniqueWays = coinChangeUniqueWays;
