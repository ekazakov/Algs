/*
Problem:
	Change-making Problem
	Given an unlimited supply of coins of given denominations,
	what is the minimum number of coins needed to make a change of size n?
	coins = 1, 3, 5
*/
function changeMaking(n, coins = [1, 3, 5]) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        let min = Infinity;

        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j];
            if (i - coin >= 0 && dp[i - coin] >= 0) {
                min = Math.min(min, dp[i-coin]);
            }
        }

        if (min === Infinity) {
            dp[i] = -1;
        } else {
            dp[i] = min + 1;
        }
    }

    return dp[n];
}

exports.changeMaking = changeMaking;
