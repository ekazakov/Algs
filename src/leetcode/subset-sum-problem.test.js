// https://www.geeksforgeeks.org/subset-sum-problem-osum-space/
// https://www.youtube.com/watch?v=34l1kTIQCIA
//
// Given a set of non-negative integers, and a value sum,
// determine if there is a subset of the given set with sum equal to given sum.
//
// Example:
//
// Input: set[] = {3, 34, 4, 12, 5, 2}, sum = 9
// Output: True — There is a subset (4, 5) with sum 9.

function isSubsetSum(set, sum) {
    function _helper(index, sum) {
        // console.log('index:', index, 'sum:', sum);
        if (sum === 0) {
            return true;
        }
        if (index + 1 >= set.length || sum < 0) {
            return false;
        }

        return _helper(index + 1, sum - set[index + 1]) || _helper(index + 1, sum);
    }

    return _helper(-1, sum);
}

function printTable(set, sum, table) {
    const sarr = new Array(sum + 1);
    for (let i = 0; i <= sum; i++) {
        sarr[i] = i;
    }
    console.log(`  ${sarr.join(' ')}`);
    for (let i = 0; i < table.length; i++) {
        const val = i - 1 < 0 ? '-' : set[i - 1];
        const row = table[i].map(b => {
            if (b === '-') {
                return b;
            }
            return b ? 'T' : 'F';
        });
        console.log(`${val} ${row.join(' ')}`);
    }
    console.log();
}

function isSubsetSum2(set, sum) {
    const dp = new Array(set.length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(sum + 1).fill('-');
        dp[i][0] = true;
    }

    for (let i = 1; i <= sum; i++) {
        dp[0][i] = false;
    }
    // printTable(set, sum, dp);

    for (let i = 1; i <= set.length; i++) {
        const val = set[i - 1];
        for (let j = 1; j <= sum; j++) {
            console.log('i:', i, 'j:', j, 'cur:', set[i - 1]);
            if (val <= j) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - val];
            } else {
                dp[i][j] = dp[i - 1][j];
            }

            // printTable(set, sum, dp);
        }
    }
    printTable(set, sum, dp);

    return dp[set.length][sum];
}

// DP solution O(n*sum) memory
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T - - - - - -
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 1 j: 1 cur: 3
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F - - - - -
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 1 j: 2 cur: 3
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F - - - -
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 1 j: 3 cur: 3
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T - - -
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 1 j: 4 cur: 3
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F - -
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 1 j: 5 cur: 3
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F -
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 1 j: 6 cur: 3
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T - - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 2 j: 1 cur: 1
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T - - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 2 j: 2 cur: 1
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F - - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 2 j: 3 cur: 1
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T - - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 2 j: 4 cur: 1
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T - -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 2 j: 5 cur: 1
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F -
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 2 j: 6 cur: 1
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T - - - - - -
// 2 T - - - - - -
//
// i: 3 j: 1 cur: 8
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T - - - - -
// 2 T - - - - - -
//
// i: 3 j: 2 cur: 8
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F - - - -
// 2 T - - - - - -
//
// i: 3 j: 3 cur: 8
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T - - -
// 2 T - - - - - -
//
// i: 3 j: 4 cur: 8
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T - -
// 2 T - - - - - -
//
// i: 3 j: 5 cur: 8
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F -
// 2 T - - - - - -
//
// i: 3 j: 6 cur: 8
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T - - - - - -
//
// i: 4 j: 1 cur: 2
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T T - - - - -
//
// i: 4 j: 2 cur: 2
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T T T - - - -
//
// i: 4 j: 3 cur: 2
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T T T T - - -
//
// i: 4 j: 4 cur: 2
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T T T T T - -
//
// i: 4 j: 5 cur: 2
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T T T T T T -
//
// i: 4 j: 6 cur: 2
//   0 1 2 3 4 5 6
// - T F F F F F F
// 3 T F F T F F F
// 1 T T F T T F F
// 8 T T F T T F F
// 2 T T T T T T T

function isSubsetSum3(set, sum) {
    const dp = new Array(set.length + 1);

    for (let i = 0; i < 2; i++) {
        dp[i] = new Array(sum + 1).fill(false);
    }

    // console.log(dp);
    for (let i = 0; i <= set.length; i++) {
        // в dp всегдо 2 строки и мы мапим текущую позицию элемента на строку
        const row = i % 2;
        // индекс другой строки. Используется для получения значений предыдущих элементов множества
        const prevRow = (i + 1) % 2;
        for (let j = 0; j <= sum; j++) {
            if (j === 0) {
                // инициируем нулевой индекс в true, т.к. для нулевой суммы всегда есть подмножество(пустое)
                dp[row][0] = true;
            } else if (i === 0) {
                // i == 0 не обозначает эл-т множества. dp[0] - вспомогательный массив, что бы вегда можно
                // было обратиться к результатам c предыдущей строки
                dp[0][j] = false;
            } else if (set[i-1] <= j) {
                dp[row][j] = dp[prevRow][j] || dp[prevRow][j - set[i-1]];
            } else {
                dp[row][j] = dp[prevRow][j];
            }
            // console.log('i:', i, 'j:', j, 'dp:', dp);
        }
    }

    return dp[set.length % 2][sum];
}

const input1 = [3, 34, 4, 12, 5, 2];
const input2 = [3, 1, 8, 2];
const input3 = [3, 1, 4, 2];

console.log('Solution 1');
console.log(`Sum: 9,   set:`, input1, `=> ${isSubsetSum(input1, 9)}`);
console.log(`Sum: 900, set:`, input1, `=> ${isSubsetSum(input1, 900)}`);
console.log(`Sum: 1,   set:`, input1, `=> ${isSubsetSum(input1, 1)}`);
console.log(`Sum: 3,   set:`, input1, `=> ${isSubsetSum(input1, 3)}`);
console.log(`Sum: 8,   set:`, input1, `=> ${isSubsetSum(input1, 8)}`);
console.log(`Sum: 2,   set:`, input1, `=> ${isSubsetSum(input1, 2)}`);
console.log(`Sum: 7,   set:`, input1, `=> ${isSubsetSum(input1, 7)}`);
console.log(`Sum: 11,  set:`, input1, `=> ${isSubsetSum(input1, 11)}`);
console.log(`Sum: 2,`, input2, `=> ${isSubsetSum(input2, 2)}`);

console.log('Solution 3');
console.log(`Sum: 9,   set:`, input1, `=> ${isSubsetSum3(input1, 9)}`);
console.log(`Sum: 900, set:`, input1, `=> ${isSubsetSum3(input1, 900)}`);
console.log(`Sum: 1,   set:`, input1, `=> ${isSubsetSum3(input1, 1)}`);
console.log(`Sum: 3,   set:`, input1, `=> ${isSubsetSum3(input1, 3)}`);
console.log(`Sum: 8,   set:`, input1, `=> ${isSubsetSum3(input1, 8)}`);
console.log(`Sum: 2,   set:`, input1, `=> ${isSubsetSum3(input1, 2)}`);
console.log(`Sum: 7,   set:`, input1, `=> ${isSubsetSum3(input1, 7)}`);
console.log(`Sum: 11,  set:`, input1, `=> ${isSubsetSum3(input1, 11)}`);
console.log(`Sum: 2,`, input2, `=> ${isSubsetSum3(input2, 2)}`);

// console.log(`Sum: 11, set:`, input3, `=> ${isSubsetSum3(input3, 11)}`);
// isSubsetSum2([3, 3, 3], 6);
// isSubsetSum2(input2, 6);
// isSubsetSum3(input2, 6);
