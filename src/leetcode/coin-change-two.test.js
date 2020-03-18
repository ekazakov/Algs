// https://leetcode.com/problems/coin-change-2/
/*
You are given coins of different denominations and a total amount of money.
Write a function to compute the number of combinations that make up that amount.
You may assume that you have infinite number of each kind of coin.

Example 1:

Input: amount = 5, coins = [1, 2, 5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.

Example 3:

Input: amount = 10, coins = [10]
Output: 1


Note:

You can assume that

0 <= amount <= 5000
1 <= coin <= 5000
the number of coins is less than 500
the answer is guaranteed to fit into signed 32-bit integer
*/

// const change = function(amount, coins) {
//     const t = new Array(amount + 1).fill(0);
//     t[0] = 1;
//
//     for (let i = 1; i <= amount; i++) {
//         for (let j = 0; j < coins.length; j++) {
//             const coin = coins[j];
//             if (coin <= i) {
//                 t[i] += t[i - coin];
//             }
//         }
//     }
//
//     console.log(`${amount} by (${coins.join(', ')}) = ${t[t.length - 1]}`);
//     return t[t.length - 1];
// };

const change1 = function(coins, amount) {
    const t = new Array(coins.length + 1);
    for (let i = 0; i < t.length; i++) {
        t[i] = new Array(amount + 1).fill(0);
    }
    t[0][0] = 1;

    for (let i = 1; i <= coins.length; i++) {
        t[i][0] = 1;
        for (let j = 1; j <= amount; j++) {
            // console.log(`i: ${i}, j: ${j}`, t[i][j]);
            let tmp = 0;
            const coin = coins[i - 1];
            if (j >= coin) {
                tmp = t[i][j - coin];
            }
            t[i][j] = t[i - 1][j] + tmp;
        }
        // console.log(t.join('\n'));
    }

    return t[coins.length][amount];
};

const change2 = function(coins, amount) {
    const t = new Array(amount + 1).fill(0);
    t[0] = 1;

    for (let i = 0; i <= coins.length; i++) {
        const coin = coins[i];
        for (let j = coin; j <= amount; j++) {
            t[j] += t[j - coin];
        }
    }

    return t[amount];
};

// change(11, [1, 3, 5]);
// change(8, [1, 3, 5]);
// change(5, [1, 2, 5]);
// change(3, [2]);

describe('Number ways to exchange sum with coins', () => {
    describe('O(n^2) space solution', function() {
        it('Exchange 11 with 1¢, 3¢, 5¢', () => {
            expect(change1([1, 3, 5], 11)).toEqual(8);
        });

        it('Exchange 5 with 1¢, 2¢, 5¢', () => {
            expect(change1([1, 2, 5], 5)).toEqual(4);
        });

        it('Exchange 3 with 3¢', () => {
            expect(change1([3], 3)).toEqual(1);
        });

        it('Exchange 25 with 10¢, 5¢', () => {
            expect(change1([5, 10], 25)).toEqual(3);
        });

        it('Exchange 25 with 10¢, 15¢', () => {
            expect(change1([15, 10], 25)).toEqual(1);
        });

        it('Exchange 25 with 25¢, 5¢', () => {
            expect(change1([25, 5], 25)).toEqual(2);
        });

        it('Exchange 25 with 26¢, 5¢', () => {
            expect(change1([26, 5], 25)).toEqual(1);
        });

        it('Exchange 25 with 26¢', () => {
            expect(change1([26], 25)).toEqual(0);
        });

        it('Exchange 8 with 1¢, 3¢, 5¢', () => {
            expect(change1([1, 3, 5], 8)).toEqual(5);
        });

        it('Exchange 30 with 1¢, 3¢, 5¢', () => {
            expect(change1([1, 3, 5], 30)).toEqual(40);
        });
        //
        // it('Exchange 40 with 1¢, 3¢, 5¢', () => {
        //     expect(change([1, 3, 5], 40)).toEqual(35543051);
        // });
    });

    describe('O(n) space solution', function() {
        it('Exchange 11 with 1¢, 3¢, 5¢', () => {
            expect(change2([1, 3, 5], 11)).toEqual(8);
        });

        it('Exchange 5 with 1¢, 2¢, 5¢', () => {
            expect(change2([1, 2, 5], 5)).toEqual(4);
        });

        it('Exchange 3 with 3¢', () => {
            expect(change2([3], 3)).toEqual(1);
        });

        it('Exchange 25 with 10¢, 5¢', () => {
            expect(change2([5, 10], 25)).toEqual(3);
        });

        it('Exchange 25 with 10¢, 15¢', () => {
            expect(change2([15, 10], 25)).toEqual(1);
        });

        it('Exchange 25 with 25¢, 5¢', () => {
            expect(change2([25, 5], 25)).toEqual(2);
        });

        it('Exchange 25 with 26¢, 5¢', () => {
            expect(change2([26, 5], 25)).toEqual(1);
        });

        it('Exchange 25 with 26¢', () => {
            expect(change2([26], 25)).toEqual(0);
        });

        it('Exchange 8 with 1¢, 3¢, 5¢', () => {
            expect(change2([1, 3, 5], 8)).toEqual(5);
        });

        it('Exchange 30 with 1¢, 3¢, 5¢', () => {
            expect(change2([1, 3, 5], 30)).toEqual(40);
        });
        //
        // it('Exchange 40 with 1¢, 3¢, 5¢', () => {
        //     expect(change([1, 3, 5], 40)).toEqual(35543051);
        // });
    });

});
