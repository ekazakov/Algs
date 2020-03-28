// https://www.techiedelight.com/0-1-knapsack-problem/
/*

 
In 0-1 Knapsack problem, we are given a set of items, each with a weight and a value and we need to determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

 

Please note that the items are indivisible; we can either take an item or not (0-1 property). For example,

Input:
value = [ 20, 5, 10, 40, 15, 25 ]
weight = [ 1, 2, 3, 8, 7, 4 ]
int W = 10
 Output: Knapsack value is 60
 
value = 20 + 40 = 60
weight = 1 + 8 = 9 < W
 
*/

/*
The idea is to use recursion to solve this problem. For each item, there are two possibilities –
 
We include current item in knapSack and recur for remaining items with decreased capacity of Knapsack. If the capacity becomes negative, do not recur or return -INFINITY.
 
We exclude current item from knapSack and recur for remaining items.
 
Finally, we return maximum value we get by including or excluding current item. The base case of the recursion would be when no items are left or capacity becomes 0.
Below implementation finds the maximum value that can be attained with weight less than or equal to W recursively by using above relations.
*/

// The time complexity - O(2^n) and auxiliary space - O(1).
function knapSack1(values, weights, limit) {
    function _helper(index, limit) {
        // base case: Negative capacity
        if (limit < 0) {
            return -Infinity;
        }

        // base case: no items left or capacity becomes 0
        if (index >= values.length || limit === 0) {
            return 0;
        }

        // Case 1. include current item n in knapSack (v[n]) and recur
        const include = values[index] + _helper(index + 1, limit - weights[index]);
        // Case 2. skip current item from knapSack and recur
        const exclude = _helper(index + 1, limit);

        return Math.max(include, exclude);
    }

    return _helper(0, limit);
}

// with memoization
// The time complexity of above solution is O(nW) where n is the number of items in the input and W is the Knapsack capacity.
// Auxiliary space used by the program is also O(nW).
function knapSack2(values, weights, limit) {
    const key = (i, j) => `${i}:${j}`;
    const memo = {};
    function _helper(index, limit) {
        if (limit < 0) {
            return -Infinity;
        }

        if (index >= values.length || limit === 0) {
            return 0;
        }

        if (memo[key(index, limit)]) {
            return memo[key(index, limit)];
        }

        const include = values[index] + _helper(index + 1, limit - weights[index]);
        const exclude = _helper(index + 1, limit);

        memo[key(index, limit)] = Math.max(include, exclude);
        return memo[key(index, limit)];
    }

    return _helper(0, limit);
}

/*
 
We can also solve this problem in bottom-up manner.
In the bottom-up approach, we solve smaller sub-problems first,
then solve larger sub-problems from them. The following bottom-up approach
computes T[i][j], for each 1 <= i <= n and 0 <= j <= W, which is maximum value
that can be attained with weight less than or equal to j and using items up
to first i items. It uses value of smaller values i and j already computed.
It has the same asymptotic run-time as Memoization but no recursion overhead.

*/

function knapSack3(values, weights, limit) {
    const dp = new Array(values.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(limit + 1).fill(0);
    }

    // console.log('values: ', values);
    // console.log('weights:', weights);
    for (let i = 1; i <= values.length; i++) {
        for (let j = 0; j <= limit; j++) {
            console.log('i:', i, 'j:', j);
            const prev = dp[i - 1][j];
            const w = weights[i - 1];

            if (w > j) {
                dp[i][j] = prev;
            } else {
                dp[i][j] = Math.max(prev, dp[i - 1][j - w] + values[i - 1]);
            }

            // console.log(dp.map(item => item.join(', ')).join('\n'));
        }
    }

    return dp[values.length][limit];
}

// Linear memory solution
// Из предыдущего решения видно, что на каждом шаге цикла используются только две строки
// из таблицы. Значит можно использовать только один массив.
// в dp[i] будем хранить max сумму для текущего весового лимита
// Пример
// values:  [ 4, 5, 6, 3 ]
// weights: [ 1, 2, 3, 1 ]
// limit:   4
// i: 0 j: 4 j-w: 3 dp: 0, 0, 0, 0, 4
// i: 0 j: 3 j-w: 2 dp: 0, 0, 0, 4, 4
// i: 0 j: 2 j-w: 1 dp: 0, 0, 4, 4, 4
// i: 0 j: 1 j-w: 0 dp: 0, 4, 4, 4, 4
// i: 1 j: 4 j-w: 2 dp: 0, 4, 4, 4, 9
// i: 1 j: 3 j-w: 1 dp: 0, 4, 4, 9, 9
// i: 1 j: 2 j-w: 0 dp: 0, 4, 5, 9, 9
// i: 2 j: 4 j-w: 1 dp: 0, 4, 5, 9, 10
// i: 2 j: 3 j-w: 0 dp: 0, 4, 5, 9, 10
// i: 3 j: 4 j-w: 3 dp: 0, 4, 5, 9, 12
// i: 3 j: 3 j-w: 2 dp: 0, 4, 5, 9, 12
// i: 3 j: 2 j-w: 1 dp: 0, 4, 7, 9, 12
// i: 3 j: 1 j-w: 0 dp: 0, 4, 7, 9, 12

function knapSack4(values, weights, limit) {
    const dp = new Array(limit + 1).fill(0);

    console.log('values: ', values);
    console.log('weights:', weights);
    for (let i = 0; i < values.length; i++) {
        const w = weights[i];
        // цикл идет от max лимита, чтобы не перетерать занчения сохраненные
        // на пердыдущих итерациях
        for (let j = limit; j >= w; j--) {
            // выбираем между текущим значение и значением для веса «j-w» + текущее value
            // т.е. пропустить текущее значение или добавить его к сумме
            dp[j] = Math.max(dp[j], values[i] + dp[j - w]);
            console.log('i:', i, 'j:', j, 'j-w:', j - w, 'dp:', dp.join(', '));
        }
    }

    return dp[limit];
}

// console.log('0', knapSack4([20, 5, 10, 40, 15, 25], [1, 2, 3, 8, 7, 4], 10));
// console.log(knapSack4([4, 5, 6, 3], [1, 2, 3, 1], 4));

// const describe = () => {};

describe('Knapsack 0-1', () => {
    it('Exponential solution', () => {
        const values = [20, 5, 10, 40, 15, 25];
        const weights = [1, 2, 3, 8, 7, 4];
        const limit = 10;
        expect(knapSack1(values, weights, limit)).toEqual(60);
    });

    it('Recursive solution with memoization', () => {
        const values = [20, 5, 10, 40, 15, 25];
        const weights = [1, 2, 3, 8, 7, 4];
        const limit = 10;
        expect(knapSack2(values, weights, limit)).toEqual(60);
    });

    it('Iterative memory O(nW)', () => {
        const values = [20, 5, 10, 40, 15, 25];
        const weights = [1, 2, 3, 8, 7, 4];
        const limit = 10;
        expect(knapSack3(values, weights, limit)).toEqual(60);
    });

    it('Iterative memory O(W)', () => {
        const values = [20, 5, 10, 40, 15, 25];
        const weights = [1, 2, 3, 8, 7, 4];
        const limit = 10;
        expect(knapSack4(values, weights, limit)).toEqual(60);
    });

    it('Iterative memory O(W) two', () => {
        const values = [4, 5, 6, 3];
        const weights = [1, 2, 3, 1];
        const limit = 4;
        expect(knapSack4(values, weights, limit)).toEqual(12);
    });

    it('Iterative memory O(W) overweight', () => {
        const values = [1, 2, 3];
        const weights = [5, 6, 7];
        const limit = 4;
        expect(knapSack4(values, weights, limit)).toEqual(0);
    });

    it('Iterative memory O(W) underweight', () => {
        const values = [1, 2, 3];
        const weights = [1, 1, 2];
        const limit = 4;
        expect(knapSack4(values, weights, limit)).toEqual(6);
    });
});

