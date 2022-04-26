/*
Problem:
	Coin change
	Given an unlimited supply of coins of given denominations,
	find the total number of ways to make a change of size n.
	Transition function: f(n) = f(n-d_1) + f(n-d_2) + f(n-d_3) + ... + f(n-d_k),
	where d_1, d_2, d_3, ..., d_k are provided coin denomations.
*/

function coinChange(n, coins = [1, 3, 5, 10]) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j];
            if (i - coin >= 0) {
                dp[i] += dp[i - coin];
            }
        }
    }

    return dp[n];
}

exports.coinChange = coinChange;

// 1x8
// 3 + 3 + 1x2
// 3 + 5
// 3 + 1x5
// 5 + 1x3
