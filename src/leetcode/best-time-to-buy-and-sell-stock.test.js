/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

 Say you have an array for which the ith element
 is the price of a given stock on day i.

 If you were only permitted to complete at most one transaction
 (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

 Note that you cannot sell a stock before you buy one.

 Example 1:

 Input: [7,1,5,3,6,4]
 Output: 5
 Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
              Not 7-1 = 6, as selling price needs to be larger than buying price.

 Example 2:

 Input: [7,6,4,3,1]
 Output: 0
 Explanation: In this case, no transaction is done, i.e. max profit = 0.
*/

function maxProfitLevel1_1(data) {
    let profit = 0;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const diff = data[j] - data[i];
            profit = Math.max(profit, diff);
        }
    }

    return profit;
}

function maxProfitLevel1_2(prices) {
    let profit = 0;
    let minPrice = Number.POSITIVE_INFINITY;

    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        profit = Math.max(profit, price - minPrice);
    }

    return profit;
}

if (require.main !== module) {
    describe('Best Time to Buy and Sell Stock 1', function() {
        const input1 = [7, 1, 5, 3, 6, 4];
        const input2 = [7, 6, 4, 3, 1];
        const input3 = [7, 2, 8, 1, 5, 3, 6, 4];
        const input4 = [1, 2, 3, 4, 5];

        describe('O(n^2)', function() {
            it(`maxProfit(${input1.join(', ')}) == 5`, () => {
                expect(maxProfitLevel1_1(input1)).toEqual(5);
            });

            it(`maxProfit(${input2.join(', ')}) == 0`, () => {
                expect(maxProfitLevel1_1(input2)).toEqual(0);
            });

            it(`maxProfit(${input3.join(', ')}) == 6`, () => {
                expect(maxProfitLevel1_1(input3)).toEqual(6);
            });

            it(`maxProfit(${input4.join(', ')}) == 4`, () => {
                expect(maxProfitLevel1_1(input4)).toEqual(4);
            });
        });

        describe('O(n)', function() {
            it(`maxProfit(${input1.join(', ')}) == 5`, () => {
                expect(maxProfitLevel1_2(input1)).toEqual(5);
            });

            it(`maxProfit(${input2.join(', ')}) == 0`, () => {
                expect(maxProfitLevel1_2(input2)).toEqual(0);
            });

            it(`maxProfit(${input3.join(', ')}) == 6`, () => {
                expect(maxProfitLevel1_2(input3)).toEqual(6);
            });

            it(`maxProfit(${input4.join(', ')}) == 4`, () => {
                expect(maxProfitLevel1_2(input4)).toEqual(4);
            });
        });
    });
}

/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

Say you have an array prices for which the ith element is the price of a given stock on day i.
Design an algorithm to find the maximum profit. You may complete as many transactions as you
like (i.e., buy one and sell one share of the stock multiple times).
Note: You may not engage in multiple transactions at the same time (i.e., you
must sell the stock before you buy again).

Example 1:
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Example 2:
Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
Example 3:
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
*/

function maxProfitLevel2(prices) {
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
        profit += Math.max(prices[i] - prices[i - 1], 0);
    }
    return profit;
}

if (require !== module) {
    describe('Best Time to Buy and Sell Stock 2', function() {
        const input1 = [7, 1, 5, 3, 6, 4];
        const input2 = [1, 2, 3, 4, 5];
        const input3 = [7, 6, 4, 3, 1];

        it('one', () => {
            expect(maxProfitLevel2(input1)).toBe(7);
        });

        it('two', () => {
            expect(maxProfitLevel2(input2)).toBe(4);
        });

        it('three', () => {
            expect(maxProfitLevel2(input3)).toBe(0);
        });
    });
}

/**
 https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/

 Say you have an array for which the ith element is the price of a given stock on day i.

 Design an algorithm to find the maximum profit. You may complete at most two transactions.

 Note: You may not engage in multiple transactions at the same time
 (i.e., you must sell the stock before you buy again).

 Example 1:

 Input: [3,3,5,0,0,3,1,4]
 Output: 6
 Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
 Example 2:

 Input: [1,2,3,4,5]
 Output: 4
 Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
              engaging multiple transactions at the same time. You must sell before buying again.
 Example 3:

 Input: [7,6,4,3,1]
 Output: 0
 Explanation: In this case, no transaction is done, i.e. max profit = 0.

 Example steps
 prices: [ 1, 2, 3, 4, 5 ]
 price: 1 fb: 1 fsp: 0 sb: 1 sbp: 0
 price: 2 fb: 1 fsp: 1 sb: 1 sbp: 1
 price: 3 fb: 1 fsp: 2 sb: 1 sbp: 2
 price: 4 fb: 1 fsp: 3 sb: 1 sbp: 3
 price: 5 fb: 1 fsp: 4 sb: 1 sbp: 4
 maxProfit: 4

 Example steps
 prices: [ 3, 5, 0, 3, 1, 4 ]
 price: 3 fb: 3 fsp: 0 sb: 3 sbp: 0
 price: 5 fb: 3 fsp: 2 sb: 3 sbp: 2
 price: 0 fb: 0 fsp: 2 sb: -2 sbp: 2
 price: 3 fb: 0 fsp: 3 sb: -2 sbp: 5
 price: 1 fb: 0 fsp: 3 sb: -2 sbp: 5
 price: 4 fb: 0 fsp: 4 sb: -2 sbp: 6
 maxProfit: 6
*/
// function maxProfitLevel3(prices) {
//     console.log('prices:', prices);
//     let firstBuy = Number.POSITIVE_INFINITY;
//     let secondBuy = Number.POSITIVE_INFINITY;
//     let firstSellProfit = 0;
//     let secondSellProfit = 0;
//
//     for (let i = 0; i < prices.length; i++) {
//         const price = prices[i];
//
//         firstBuy = Math.min(firstBuy, price);
//         firstSellProfit = Math.max(firstSellProfit, price - firstBuy);
//         secondBuy = Math.min(secondBuy, price - firstSellProfit);
//         secondSellProfit = Math.max(secondSellProfit, price - secondBuy);
//
//         // prettier-ignore
//         console.log(
//             // 'after:::',
//             'price:', price,
//             'fb:', firstBuy, 'fsp:', firstSellProfit,
//             'sb:', secondBuy, 'sbp:', secondSellProfit
//         );
//     }
//
//     return secondSellProfit;
// }

function maxProfitLevel3(prices) {
    let minPrice = Number.POSITIVE_INFINITY;
    let profitAfterFirstSell = 0;
    let profitAfterSecondBuy = Number.NEGATIVE_INFINITY;
    let profitAfterSecondSell = 0;

    for (let i = 0; i < prices.length; i++) {
        const p = prices[i];
        minPrice = Math.min(minPrice, p);
        profitAfterFirstSell = Math.max(profitAfterFirstSell, p - minPrice);
        // prettier-ignore
        profitAfterSecondBuy = Math.max(profitAfterSecondBuy, profitAfterFirstSell - p);
        // prettier-ignore
        profitAfterSecondSell = Math.max(profitAfterSecondSell, p + profitAfterSecondBuy);
    }

    return profitAfterSecondSell;
}

if (require !== module) {
    describe('Best Time to Buy and Sell Stock 3', function() {
        const input1 = [7, 1, 5, 3, 6, 4];
        const input2 = [1, 2, 3, 4, 5];
        const input3 = [7, 6, 4, 3, 1];
        const input4 = [3, 3, 5, 0, 0, 3, 1, 4];

        it('one', () => {
            expect(maxProfitLevel3(input1)).toBe(7);
        });

        it('two', () => {
            expect(maxProfitLevel3(input2)).toBe(4);
        });

        it('three', () => {
            expect(maxProfitLevel3(input3)).toBe(0);
        });

        it('four', () => {
            expect(maxProfitLevel3(input4)).toBe(6);
        });
    });
}

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/

// Say you have an array for which the i-th element is the price of a given stock on day i.
//
// Design an algorithm to find the maximum profit. You may complete at most k transactions.
//
// Note:
// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
//
// Example 1:
//
// Input: [2,4,1], k = 2
// Output: 2
// Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
// Example 2:
//
// Input: [3,2,6,5,0,3], k = 2
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
//              Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

function maxProfitLevel4_1(prices, k) {
    if (prices.length === 0) {
        return 0;
    }
    // const dp = new Array(k + 1);
    // for (let i = 0; i <= k; i++) {
    //     dp[i] = new Array(prices.length).fill(0);
    // }
    //
    // for (let t = 1; t <= k; t++) {
    //     for (let i = 1; i < prices.length; i++) {
    //         let max = Number.NEGATIVE_INFINITY;
    //         for (let j = 0; j < i; j++) {
    //             max = Math.max(max, -prices[j] + dp[t - 1][j]);
    //         }
    //         dp[t][i] = Math.max(dp[t][i - 1], prices[i] + max);
    //     }
    // }
    //
    // return dp[k][prices.length - 1];

    const dp = new Array(k + 1);
    for (let i = 0; i <= k; i++) {
        dp[i] = new Array(prices.length).fill(0);
    }

    for (let t = 1; t <= k; t++) {
        let tmpMax = Number.NEGATIVE_INFINITY;

        for (let i = 1; i < prices.length; i++) {
            tmpMax = Math.max(tmpMax, dp[t - 1][i - 1] - prices[i - 1]);
            dp[t][i] = Math.max(dp[t][i - 1], prices[i] + tmpMax);
        }
    }

    return dp[k][prices.length - 1];
}

function maxProfitLevel4_2(prices, k) {
    if (prices.length === 0) {
        return 0;
    }
    // const dpEven = new Array(prices.length).fill(0);
    // const dpOdd = new Array(prices.length).fill(0);
    //
    // for (let t = 1; t <= k; t++) {
    //     let currentMax = Number.NEGATIVE_INFINITY;
    //     let dpCur = t % 2 === 1 ? dpOdd : dpEven;
    //     let dpPrev = t % 2 === 1 ? dpEven : dpOdd;
    //
    //     for (let i = 1; i < prices.length; i++) {
    //         const j = i - 1;
    //         currentMax = Math.max(currentMax, -prices[j] + dpPrev[j]);
    //         dpCur[i] = Math.max(dpCur[i - 1], prices[i] + currentMax);
    //     }
    // }
    //
    // return k % 2 === 1 ? dpOdd[prices.length - 1] : dpEven[prices.length - 1];

    const dpEven = new Array(prices.length).fill(0);
    const dpOdd = new Array(prices.length).fill(0);

    for (let t = 1; t <= k; t++) {
        let tmpMax = Number.NEGATIVE_INFINITY;
        const dpCurrent = t % 2 === 0 ? dpEven : dpOdd;
        const dpPrev = t % 2 === 0 ? dpOdd : dpEven;

        for (let i = 1; i < prices.length; i++) {
            tmpMax = Math.max(tmpMax, dpPrev[i - 1] - prices[i - 1]);
            dpCurrent[i] = Math.max(dpCurrent[i - 1], prices[i] + tmpMax);
        }
    }

    return k % 2 === 0 ? dpEven[prices.length - 1] : dpOdd[prices.length - 1];
}

if (require !== module) {
    describe('Best Time to Buy and Sell Stock 4', function() {
        const input1 = [7, 1, 5, 3, 6, 4];
        const input2 = [3, 2, 6, 5, 0, 3];
        const input3 = [7, 6, 4, 3, 1];
        const input4 = [3, 3, 5, 0, 0, 3, 1, 4];
        const input5 = [5, 11, 3, 50, 60, 90];

        describe('O(n^2*k) + O(n*k) memory', () => {
            it('one', () => {
                expect(maxProfitLevel4_1(input1, 2)).toBe(7);
            });
            it('two', () => {
                expect(maxProfitLevel4_1(input2, 2)).toBe(7);
            });
            it('three', () => {
                expect(maxProfitLevel4_1(input3, 2)).toBe(0);
            });
            it('four', () => {
                expect(maxProfitLevel4_1(input4, 2)).toBe(6);
            });
            it('five', () => {
                expect(maxProfitLevel4_1(input5, 2)).toBe(93);
            });
            it('empty input', () => {
                expect(maxProfitLevel4_1([], 2)).toBe(0);
            });
            it('one item', () => {
                expect(maxProfitLevel4_1([1], 2)).toBe(0);
            });
            it('two items', () => {
                expect(maxProfitLevel4_1([1, 3], 2)).toBe(2);
            });

            it('three items', () => {
                expect(maxProfitLevel4_1([1, 3, 5], 2)).toBe(4);
            });

            it('three items and k = 5', () => {
                expect(maxProfitLevel4_1([1, 3, 5], 5)).toBe(4);
            });
        });

        describe('O(n*k) + O(n) memory', () => {
            it('one', () => {
                expect(maxProfitLevel4_2(input1, 2)).toBe(7);
            });
            it('two', () => {
                expect(maxProfitLevel4_2(input2, 2)).toBe(7);
            });
            it('three', () => {
                expect(maxProfitLevel4_2(input3, 2)).toBe(0);
            });
            it('four', () => {
                expect(maxProfitLevel4_2(input4, 2)).toBe(6);
            });
            it('five', () => {
                expect(maxProfitLevel4_2(input5, 2)).toBe(93);
            });
            it('empty input', () => {
                expect(maxProfitLevel4_2([], 2)).toBe(0);
            });
            it('one item', () => {
                expect(maxProfitLevel4_2([1], 2)).toBe(0);
            });
            it('two items', () => {
                expect(maxProfitLevel4_2([1, 3], 2)).toBe(2);
            });

            it('three items', () => {
                expect(maxProfitLevel4_2([1, 3, 5], 2)).toBe(4);
            });

            it('three items and k = 5', () => {
                expect(maxProfitLevel4_2([1, 3, 5], 5)).toBe(4);
            });
        });
    });
}

if (require.main === module) {
    // console.log(maxProfitLevel3([3, 5, 0, 3, 1, 4]));
    // console.log(maxProfit4([1, 2, 3, 4, 5]));
} else {
}
