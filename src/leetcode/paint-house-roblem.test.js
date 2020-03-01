// https://www.programcreek.com/2014/05/leetcode-paint-house-java/
// https://leetcode.com/problems/paint-house/

/*
There are a row of n houses, each house can be painted with one of the
three colors: red, blue or green. The cost of painting each house with
a certain color is different. You have to paint all the houses
such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented
by a n x 3 cost matrix. For example, costs[0][0] is the cost of painting house 0
with color red; costs[1][2] is the cost of painting house 1 with color green,
and so on… Find the minimum cost to paint all houses.

For Example:
If the given array is — [17, 2, 1], [16, 16, 1], [14, 3, 19], [3, 1, 8]
then minimum cost of painting is 2 + 1 + 3 + 3 = 9
* */

function getColor(color) {
    if (color > 2) {
        return 0;
    }

    if (color < 0) {
        return 2;
    }

    return color;
}

function paintRec(n, data) {
    function _paint(index, color) {
        if (index >= n) {
            return 0;
        }

        let a = _paint(index + 1, getColor(color + 1));
        let b = _paint(index + 1, getColor(color - 1));

        return data[index][color] + Math.min(a, b);
    }

    const a = _paint(0, 0);
    const b = _paint(0, 1);
    const c = _paint(0, 2);

    return Math.min(a, b, c);
}
describe('Paint House Problem', () => {
    const data = [
        [17, 2, 1],
        [16, 16, 1],
        [14, 3, 19],
        [3, 1, 8]
    ];
    const data2 = [
        [2, 1, 0],
        [5, 3, 6],
        [3, 1, 8],
        [15, 7, 2],
        [6, 4, 2]
    ];
    it('one', () => {
        expect(paintRec(4, data)).toBe(9);
    });

    it('two', () => {
        expect(paintRec(5, data2)).toBe(12);
    });
});
