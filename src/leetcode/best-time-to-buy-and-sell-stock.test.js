// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

// Say you have an array for which the ith element
// is the price of a given stock on day i.
//
// If you were only permitted to complete at most one transaction
// (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
//
// Note that you cannot sell a stock before you buy one.
//
// Example 1:
//
// Input: [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
//              Not 7-1 = 6, as selling price needs to be larger than buying price.
//
// Example 2:
//
// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

function maxProfit1(data) {
    let profit = 0;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const diff = data[j] - data[i];
            profit = Math.max(profit, diff);
        }
    }

    return profit;
}

function maxProfit2(data) {
    let min = Infinity;
    let profit = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < min) {
            min = data[i];
        } else {
            profit = Math.max(profit, data[i] - min);
        }
    }

    return profit;
}

// console.log(input1, '->', maxProfit2(input1));
// console.log(input2, '->', maxProfit2(input2));
// console.log(input3, '->', maxProfit2(input3));
// console.log(input4, '->', maxProfit2(input4));

describe('Best Time to Buy and Sell Stock', function() {
    const input1 = [7, 1, 5, 3, 6, 4];
    const input2 = [7, 6, 4, 3, 1];
    const input3 = [7, 2, 8, 1, 5, 3, 6, 4];
    const input4 = [1, 2, 3, 4, 5];

    describe('O(n^2)', function() {
        it(`maxProfit(${input1.join(', ')}) == 5`, () => {
            expect(maxProfit1(input1)).toEqual(5);
        });

        it(`maxProfit(${input2.join(', ')}) == 0`, () => {
            expect(maxProfit1(input2)).toEqual(0);
        });

        it(`maxProfit(${input3.join(', ')}) == 6`, () => {
            expect(maxProfit1(input3)).toEqual(6);
        });

        it(`maxProfit(${input4.join(', ')}) == 4`, () => {
            expect(maxProfit1(input4)).toEqual(4);
        });
    });

    describe('O(n)', function() {
        it(`maxProfit(${input1.join(', ')}) == 5`, () => {
            expect(maxProfit2(input1)).toEqual(5);
        });

        it(`maxProfit(${input2.join(', ')}) == 0`, () => {
            expect(maxProfit2(input2)).toEqual(0);
        });

        it(`maxProfit(${input3.join(', ')}) == 6`, () => {
            expect(maxProfit2(input3)).toEqual(6);
        });

        it(`maxProfit(${input4.join(', ')}) == 4`, () => {
            expect(maxProfit2(input4)).toEqual(4);
        });
    });
});
