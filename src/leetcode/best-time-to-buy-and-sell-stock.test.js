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

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
// Say you have an array prices for which the ith element is the price of a given stock on day i.
//
// Design an algorithm to find the maximum profit. You may complete as many transactions as you
// like (i.e., buy one and sell one share of the stock multiple times).
//
// Note: You may not engage in multiple transactions at the same time (i.e., you
// must sell the stock before you buy again).
//
// Example 1:
//
// Input: [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
//              Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Example 2:
//
// Input: [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.
// Example 3:
//
// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

function maxProfit3(prices) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        profit += Math.max(prices[i] - prices[i - 1], 0);
    }

    return profit;
}

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/

// Say you have an array for which the ith element is the price of a given stock on day i.
//
// Design an algorithm to find the maximum profit. You may complete at most two transactions.
//
// Note: You may not engage in multiple transactions at the same time
// (i.e., you must sell the stock before you buy again).
//
// Example 1:
//
// Input: [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
//              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
// Example 2:
//
// Input: [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.
// Example 3:
//
// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

function maxProfit4(prices) {
    let profit = 0;
    for (let i = 0; i < prices.length; i++) {}

    return profit;
}

describe('Best Time to Buy and Sell Stock 1', function() {
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

describe('Best Time to Buy and Sell Stock 2', function() {
    const input1 = [7, 1, 5, 3, 6, 4];
    const input2 = [1, 2, 3, 4, 5];
    const input3 = [7, 6, 4, 3, 1];

    it('one', () => {
        expect(maxProfit3(input1)).toBe(7);
    });

    it('two', () => {
        expect(maxProfit3(input2)).toBe(4);
    });

    it('three', () => {
        expect(maxProfit3(input3)).toBe(0);
    });
});

describe('Best Time to Buy and Sell Stock 3d', function() {
    const input1 = [7, 1, 5, 3, 6, 4];
    const input2 = [1, 2, 3, 4, 5];
    const input3 = [7, 6, 4, 3, 1];
    const input4 = [3, 3, 5, 0, 0, 3, 1, 4];

    it('one', () => {
        expect(maxProfit4(input1)).toBe(7);
    });

    it('two', () => {
        expect(maxProfit4(input2)).toBe(4);
    });

    it('three', () => {
        expect(maxProfit4(input3)).toBe(0);
    });

    it('four', () => {
        expect(maxProfit4(input4)).toBe(6);
    });
});
