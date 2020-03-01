// https://www.programcreek.com/2014/05/leetcode-house-robber-ii-java/
// House Robber II
/*
After robbing those houses on that street, the thief has found himself a new place
for his thievery so that he will not get too much attention. This time, all
houses at this place are arranged in a circle. That means the first
house is the neighbor of the last one. Meanwhile, the security system
for these houses remain the same as for those in the previous street.

Given a list of non-negative integers representing the amount of money
of each house, determine the maximum amount of money you can
rob tonight without alerting the police.
*/

function rob(data) {
    function _rob(data, start, limit) {
        let curSum = 0;
        let prevSum = 0;

        for (let i = start; i < limit; i++) {
            const maxSum = Math.max(curSum, prevSum + data[i]);
            prevSum = curSum;
            curSum = maxSum;
        }

        return curSum;
    }

    /*
    Т.к. дома выстроены в кольцо, то если начнем обход с 1го дома, то не сможем зайти в последний.
    Если начнем со 2го, то сможем зайти в последний. Следовательно у нас есть 2 маршрут.
    И надо выбрать какой из них вернет наибольшее значение.
     */
    const one = _rob(data, 0, data.length - 1);
    const two = _rob(data, 1, data.length);

    return Math.max(one, two);
}
function toStr(arr) {
    return `[${arr.join(', ')}]`;
}

describe('House Robber Two', () => {
    const data1 = [3, 1, 2, 5, 4, 2];
    const data2 = [8, 3, 7, 5, 4];
    const data3 = [3, 1, 2, 5, 4];
    const data4 = [1, 1, 4, 5, 3, 2, 6];

    it(`rob(${toStr(data1)}) should be eq 9`, () => {
        expect(rob(data1)).toBe(9);
    });

    it(`rob(${toStr(data2)}) should be eq 15`, () => {
        expect(rob(data2)).toBe(15);
    });

    it(`rob(${toStr(data3)}) should be eq 8`, () => {
        expect(rob(data3)).toBe(8);
    });

    it(`rob(${toStr(data4)}) should be eq 9`, () => {
        expect(rob(data4)).toBe(13);
    });
});
