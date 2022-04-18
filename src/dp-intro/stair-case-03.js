// 	Climbing Stairs (k steps, space optimized, skip red steps)

// 	You are climbing a stair case. It takes n steps to reach to the top.
// 	Each time you can climb 1..k steps. You are not allowed to step on red stairs.
// 	In how many distinct ways can you climb to the top?

// https://github.com/andreygrehov/dp/blob/master/lecture6/lecture6_part2.go
function climbingStairs(n, k, stairs) {
    const dp = new Array(k);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k - 1); j++) {
            // stair is red
            if (stairs[i - 1]) {
                dp[i % k] = 0;
            } else {
                dp[i % k] += dp[(i - j) % k];
            }
        }
    }

    return dp[n % k];
}

exports.climbingStairs = climbingStairs;
