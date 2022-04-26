/* *
 * Problem:
 *	Coin change
 *	Given an unlimited supply of coins of given denominations,
 *	find the total number of ways to make a change of size n, by
 *	using exactly t coins.
 * */

function coinChangeExactlyTCoins(n, t, coins = [1, 3, 5, 10]) {
    const dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(t + 1).fill(0);
    }

    dp[0][0] = 1;

    for (let i = 0; i <= n; i++) {
        for (let k = 0; k <= t; k++) {
            if (i > 0 && k === 0) {
                dp[i][k] = 0;
                continue;
            }

            for (let j = 0; j < coins.length; j++) {
                const coin = coins[j];
                if (i - coin >= 0) {
                    dp[i][k] += dp[i - coin][k - 1];
                }
            }
        }
    }

    return dp[n][t];
}

exports.coinChangeExactlyTCoins = coinChangeExactlyTCoins;
