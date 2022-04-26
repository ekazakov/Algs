/*
Problem:
	Coin change

	Given an unlimited supply of coins of given denominations,
	find the total number of ways to make a change of size n, by
	using an even number of coins.

	// 1, 3, 5, 10
	f[i][0] = f[i-1][1] + f[i-3][1] + f[i-5][1] + f[i-10][1]
	f[i][1] = f[i-1][0] + f[i-3][0] + f[i-5][0] + f[i-10][0]
 */
function coinChangeEvenCoins(n, coins = [1, 3, 5, 10]) {
    const dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(2).fill(0);
    }
    dp[0][0] = 1;
    dp[0][1] = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j];
            if (i - coin >= 0) {
                dp[i][0] += dp[i - coin][1];
                dp[i][1] += dp[i - coin][0];
            }
        }
    }

    return dp[n][0];
}

exports.coinChangeEvenCoins = coinChangeEvenCoins;
