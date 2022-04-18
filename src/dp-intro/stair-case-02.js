// You are climbing a stair case. It takes n steps to reach to the top.
// 	Each time you can either climb 1, 2 or 3 steps.
// 	In how many distinct ways can you climb to the top?

exports.climbingStairs3 = function climbingStairs(n) {
    let dp0 = 1;
    let dp1 = 1;
    let dp2 = 2;

    for (let i = 3; i <= n; i++) {
        const sum = dp0 + dp1 + dp2;
        dp0 = dp1;
        dp1 = dp2;
        dp2 = sum;
    }

    return dp2;
};

//
// 	You are climbing a stair case. It takes n steps to reach to the top.
// 	Each time you can climb 1..k steps.
// 	In how many distinct ways can you climb to the top?
//

// exports.climbingStairsK = function climbingStairsK(n, k) {
//     const dp = new Array(n+1).fill(0);
//     dp[0] = 1;
//     dp[1] = 1;
//     for (let i = 2; i <= n; i++) {
//         for(let j = 1; j <= k; j++) {
//             if (i - j < 0) {
//                 continue;
//             }
//             dp[i] += dp[i-j];
//         }
//     }
//
//     return dp[n];
// };

exports.climbingStairsK = function climbingStairsK(n, k) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = i - 1; j >= Math.max(i - k, 0); j--) {
            dp[i] += dp[j];
        }
    }

    return dp[n];
};

function climbingStairsKOpt(n, k) {
    const dp = new Array(k).fill(0);
    dp[0] = 1;

    // console.log('n:', n, 'k:', k);
    for (let i = 1; i <= n; i++) {
        // console.log('i:', i, 'dp:', `[${dp.join(', ')}]`);
        for (let j = 1; j <= Math.min(i, k-1); j++) {
            // console.log('i % k:', i % k, '(i - j) % k:', (i - j) % k);
            dp[i % k] += dp[(i - j) % k];
        }
        // console.log('dp after:', `[${dp.join(', ')}]`);
    }

    return dp[n % k];
}

exports.climbingStairsKOpt = climbingStairsKOpt;

climbingStairsKOpt(7, 3);
