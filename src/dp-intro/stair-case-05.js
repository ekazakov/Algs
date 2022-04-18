/*
https://github.com/andreygrehov/dp/blob/master/lecture8/lecture8.go
Problem:
	Paid Staircase II
	You are climbing a paid staircase. It takes n steps to reach to the top and you have to
	pay p[i] to step on the i-th stair. Each time you can climb 1 or 2 steps.
	Return the cheapest path to the top of the staircase.
Template to reconstruct the path
================================
	path = []
	for curr = best_last_state; curr exists; curr = from[curr] {
		path.push(curr)
	}
	return path.reverse()
*/
function climbStairsPath(n, price) {
    const dp = new Array(n + 1).fill(0);
    const from = new Array(n + 1);
    from[0] = 0;
    from[1] = 0;
    dp[0] = 0;
    dp[1] = price[1];

    for (let i = 2; i <= n; i++) {
        dp[i] = price[i] + Math.min(dp[i - 1], dp[i - 2]);
        if (dp[i - 1] > dp[i - 2]) {
            from[i] = i - 2;
        } else {
            from[i] = i - 1;
        }
    }

    const path = [];

    let i = n;
    while (i >= 0) {
        path.push(i);
        if (i === 0) break;
        i = from[i];
    }

    return path.reverse();
}

exports.climbStairsPath = climbStairsPath;
