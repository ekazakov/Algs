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

/*
Выбор цвета дома зависит от того какой цвет был выбран для предыдущего(нельзя повторить цвет).
Т.е. выбор цветов для всей цепочки домов зависит от выбора для 1го дома.
Для первого дома есть 3 варианта покраски, следовательно есть три «маршрута» покраски домов.

Для каждого маршрута рекурсивно посчитаем все доступные комбинации цветов и найдем мин. цену.
На каждом шаге есть 2 доступных цвета, следовательно будет два рекурсивных вызова.
*/
function paintRec(data) {
    function _paint(index, color) {
        if (index >= data.length) {
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

/*
Выбор цвета дома зависит от того какой цвет был выбран для предыдущего(нельзя повторить цвет).
Т.е. выбор цветов для всей цепочки домов зависит от выбора для 1го дома.
Для первого дома есть 3 варианта покраски, следовательно есть три «маршрута» покраски домов.
Заведем три переменных-аккумулятора(инициализируем ценой покраски первого дома)
и массив(lastColor) для хранния выбранного цвета для текущего дома на маршруте.

Проходимся по списку домов начиная с 1го индекса и на каждом шаге выбираем мин. цену
из доступных цветов(всегда доступно 2 цвета). Сохраняем выбранный цвет в lastColor.
И прибавляем цену для выбранного цвета к аккумулятору.

По окончанию цикла находим наименьший из трех аккумуляторов.


     0    1    2    3
---|----|----|----|----|-
 R   17   16   14   3
---|----|----|----|----|-
 G   2    16   3    1
---|----|----|----|----|-
 B   1    1    19   8
---|----|----|----|----|-
*/
function _paintOptimal(data) {
    const lastColor = [0, 1, 2];
    let a = data[0][0];
    let b = data[0][1];
    let c = data[0][2];

    function getMin(i, j) {
        const color = lastColor[j];
        const left = data[i][getColor(color - 1)];
        const right = data[i][getColor(color + 1)];

        if (left < right) {
            lastColor[j] = getColor(color - 1);
            return left;
        }

        lastColor[j] = getColor(color + 1);
        return right;
    }

    for (let i = 1; i < data.length; i++) {
        a += getMin(i, 0);
        b += getMin(i, 1);
        c += getMin(i, 2);
    }

    return Math.min(a, b, c);
}

/*
Пред. реш-е можно улучшить. Начнем итерацию с первого индекса и к цене для текущего
дома каждого цыета будем пребавлять(мутировать) мин. цену покраски для предыдущего дома.
Т.е. столбец data[i] будет хранить аккумулированные цены для предыдущих шагов маршрута.

По окончанию цикла находим наименьший элемент в последнем столбце.
*/
function paintOptimal(data) {
    function last(color) {
        return data[data.length - 1][color];
    }

    for (let i = 1; i < data.length; i++) {
        data[i][0] += Math.min(data[i - 1][1], data[i - 1][2]);
        data[i][1] += Math.min(data[i - 1][0], data[i - 1][2]);
        data[i][2] += Math.min(data[i - 1][0], data[i - 1][1]);
    }

    return Math.min(last(0), last(1), last(2));
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

    describe('Recursive solution', () => {
        it('one', () => {
            expect(paintRec(data)).toBe(9);
        });

        it('two', () => {
            expect(paintRec(data2)).toBe(12);
        });
    });

    describe('Optimal solution', () => {
        it('one', () => {
            expect(paintOptimal(data)).toBe(9);
        });

        it('two', () => {
            expect(paintOptimal(data2)).toBe(12);
        });
    });
});
