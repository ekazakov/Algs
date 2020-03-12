// https://avikdas.com/2019/04/15/a-graphical-introduction-to-dynamic-programming.html
/*
We have denominations 1¢, 3¢, 5¢ and we want to make 16¢.
What is the fewest number of coins you can use for it.
*/

function minExchangeCount(coins, sum, memo = {}) {
    let count = 0;

    if (memo[sum] != null) {
        return memo[sum];
    }

    if (sum === 0) {
        return 0;
    }

    let min = Infinity;
    for (let i = 0; i < coins.length; i++) {
        if (sum - coins[i] >= 0) {
            min = Math.min(min, minExchangeCount(coins, sum - coins[i], memo));
        }
    }

    count = min + 1;
    memo[sum] = count;
    return count;
}

function minExchangeCountIter(coins, sum) {
    const table = [0];
    let minCount = 0;

    for (let i = 1; i <= sum; i++) {
        let noExchange = true;
        minCount = i;

        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                noExchange = false;
                const prev = i - coins[j];
                minCount = Math.min(minCount, table[prev] + 1);
            }
        }

        if (noExchange) {
            minCount = Infinity;
        }
        table[i] = minCount;
        // console.log('i:', i, 'minCount:', minCount);
    }

    return minCount;
}

function minExchangeCountWithCoins(coins, sum) {
    const table = [0];
    let minCount = 0;

    for (let i = 1; i <= sum; i++) {
        let noExchange = true;
        minCount = i;

        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                noExchange = false;
                const prev = i - coins[j];
                minCount = Math.min(minCount, table[prev] + 1);
            }
        }

        if (noExchange) {
            minCount = Infinity;
        }
        table[i] = minCount;
        // console.log('i:', i, 'minCount:', minCount);
    }

    return minCount;
}


describe('Min number of coins to exchange sum', () => {
    describe('Recursive solution', () => {
        it('Exchange 25 with 10¢, 5¢', () => {
            expect(minExchangeCount([5, 10], 25)).toEqual(3);
        });

        it('Exchange 25 with 10¢, 15¢', () => {
            expect(minExchangeCount([15, 10], 25)).toEqual(2);
        });

        it('Exchange 25 with 25¢, 5¢', () => {
            expect(minExchangeCount([25, 5], 25)).toEqual(1);
        });

        it('Exchange 25 with 26¢, 5¢', () => {
            expect(minExchangeCount([26, 5], 25)).toEqual(5);
        });

        it('Exchange 25 with 26¢', () => {
            expect(minExchangeCount([26], 25)).toEqual(Infinity);
        });

        it('Exchange 8 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCount([1, 3, 5], 8)).toEqual(2);
        });

        it('Exchange 30 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCount([1, 3, 5], 30)).toEqual(6);
        });

        it('Exchange 11 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCount([1, 3, 5], 11)).toEqual(3);
        });

        it('Exchange 40 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCount([1, 3, 5], 40)).toEqual(8);
        });
    });

    describe('Iterative solution', () => {
        it('Exchange 25 with 10¢, 5¢', () => {
            expect(minExchangeCountIter([5, 10], 25)).toEqual(3);
        });

        it('Exchange 25 with 10¢, 15¢', () => {
            expect(minExchangeCountIter([15, 10], 25)).toEqual(2);
        });

        it('Exchange 25 with 25¢, 5¢', () => {
            expect(minExchangeCountIter([25, 5], 25)).toEqual(1);
        });

        it('Exchange 25 with 26¢, 5¢', () => {
            expect(minExchangeCountIter([26, 5], 25)).toEqual(5);
        });

        it('Exchange 25 with 26¢', () => {
            expect(minExchangeCountIter([26], 25)).toEqual(Infinity);
        });

        it('Exchange 8 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCountIter([1, 3, 5], 8)).toEqual(2);
        });

        it('Exchange 30 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCountIter([1, 3, 5], 30)).toEqual(6);
        });

        it('Exchange 11 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCountIter([1, 3, 5], 11)).toEqual(3);
        });

        it('Exchange 40 with 1¢, 3¢, 5¢', () => {
            expect(minExchangeCountIter([1, 3, 5], 40)).toEqual(8);
        });
    });
});

function exchangeCount(coins, sum, memo = {}) {
    let acc = 0;

    if (sum === 0) {
        return 1;
    }

    if (memo[sum] != null) {
        return memo[sum];
    }

    for (let i = 0; i < coins.length; i++) {
        if (sum - coins[i] >= 0) {
            acc += exchangeCount(coins, sum - coins[i], memo);
        }
    }

    memo[sum] = acc;
    return acc;
}

describe('Number ways to exchange sum with coins', () => {
    it('Exchange 25 with 10¢, 5¢', () => {
        expect(exchangeCount([5, 10], 25)).toEqual(8);
    });

    it('Exchange 25 with 10¢, 15¢', () => {
        expect(exchangeCount([15, 10], 25)).toEqual(2);
    });

    it('Exchange 25 with 25¢, 5¢', () => {
        expect(exchangeCount([25, 5], 25)).toEqual(2);
    });

    it('Exchange 25 with 26¢, 5¢', () => {
        expect(exchangeCount([26, 5], 25)).toEqual(1);
    });

    it('Exchange 25 with 26¢', () => {
        expect(exchangeCount([26], 25)).toEqual(0);
    });

    it('Exchange 8 with 1¢, 3¢, 5¢', () => {
        expect(exchangeCount([1, 3, 5], 8)).toEqual(19);
    });

    it('Exchange 30 with 1¢, 3¢, 5¢', () => {
        expect(exchangeCount([1, 3, 5], 30)).toEqual(390257);
    });

    it('Exchange 40 with 1¢, 3¢, 5¢', () => {
        expect(exchangeCount([1, 3, 5], 40)).toEqual(35543051);
    });
});
