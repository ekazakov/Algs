// https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/

// The problem is to count all the possible paths from top
// left to bottom right of a mXn matrix with the constraints
// that from each cell you can either move only to right or down
//
// Examples :
//
// Input :  m = 2, n = 2;
// Output : 2
// There are two paths
// (0, 0) -> (0, 1) -> (1, 1)
// (0, 0) -> (1, 0) -> (1, 1)
//
// Input :  m = 2, n = 3;
// Output : 3
// There are three paths
// (0, 0) -> (0, 1) -> (0, 2) -> (1, 2)
// (0, 0) -> (0, 1) -> (1, 1) -> (1, 2)
// (0, 0) -> (1, 0) -> (1, 1) -> (1, 2)

const key = (i, j) => `${i}:${j}`;

function countPath1(m, n, memo = {}) {
    // console.log(`(${m}, ${n})`);
    if (m === 1 || n === 1) {
        return 1;
    }

    if (memo[key(m, n)] != null) {
        return memo[key(m, n)];
    }

    memo[key(m, n)] = countPath1(m - 1, n, memo) + countPath1(m, n - 1, memo);
    return memo[key(m, n)];
}
// paths in matrix 4×4
//    0 1 2  3  4
//  0 0 0 0  0  0
//  1 0 1 1  1  1
//  2 0 1 2  3  4
//  3 0 1 3  6 10
//  4 0 1 4 10 20

function countPath2(m, n) {
    const dp = new Array(m + 1);
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }

    dp[1][1] = 1;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === 1 && j === 1) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
            }
        }
    }

    return dp[m][n];
}

function countPath3(m, n) {
    const dp = new Array(n).fill(0);

    dp[0] = 1;
    // dp[1] = 1;

    for (let i = 0; i < m; i++) {
        // console.log('dp:', dp);
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
            // console.log('dp:', dp, 'i:', i, 'j:', j);
        }
    }

    return dp[n - 1];
}

// https://math.stackexchange.com/questions/103480/number-of-ways-of-reaching-a-point-from-origin
function countPath4(m, n) {
    // We have to calculate m+n-2 C n-1 here
    // which will be (m+n-2)! / (n-1)! (m-1)!
    let path = 1;
    for (let i = n; i < (m + n - 1); i++) {
        path *= i;
        path /= (i - n + 1);
    }

    return path;
}


console.log('O(2^n) with memo');
console.log('2 x 2:', countPath1(2, 2));
console.log('3 x 3:', countPath1(3, 3));
console.log('4 x 4:', countPath1(4, 4));
console.log('2 x 3:', countPath1(3, 4));
console.log('1 x 3:', countPath1(1, 3));
console.log('3 x 1:', countPath1(3, 1));
console.log('20 x 20:', countPath1(20, 20));
console.log('\n');

console.log('DP solution with O(m * n) memory');
console.log('2 x 2:', countPath2(2, 2));
console.log('3 x 3:', countPath2(3, 3));
console.log('4 x 4:', countPath2(4, 4));
console.log('2 x 3:', countPath2(3, 4));
console.log('1 x 3:', countPath2(1, 3));
console.log('3 x 1:', countPath2(3, 1));
console.log('20 x 20:', countPath2(20, 20));
console.log('\n');

console.log('DP solution with O(n) memory');
console.log('2 x 2:', countPath3(2, 2));
console.log('3 x 3:', countPath3(3, 3));
console.log('4 x 4:', countPath3(4, 4));
console.log('2 x 3:', countPath3(3, 4));
console.log('1 x 3:', countPath3(1, 3));
console.log('3 x 1:', countPath3(3, 1));
console.log('20 x 20:', countPath3(20, 20));
console.log('\n');

console.log('Combinatorial solution with memory O(1)');
console.log('2 x 2:', countPath4(2, 2));
console.log('3 x 3:', countPath4(3, 3));
console.log('4 x 4:', countPath4(4, 4));
console.log('2 x 3:', countPath4(3, 4));
console.log('1 x 3:', countPath4(1, 3));
console.log('3 x 1:', countPath4(3, 1));
console.log('20 x 20:', countPath4(20, 20));
