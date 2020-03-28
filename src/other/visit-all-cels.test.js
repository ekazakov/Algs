/*
From Competitive Programmers Handbook.pdf page 52


Let us consider the problem of calculating the number of
paths in an n × n grid from the upper-left corner to the
lower-right corner such that the path visits each square
exactly once. For example, in a 7 × 7 grid, there are 111712
such paths. One of the paths is as follows:
*/

function countPath(n) {
    const ALL = n * n;
    let t = new Array(n);
    let result = 0;

    for (let i = 0; i < n; i++) {
        t[i] = new Array(n).fill(0);
    }

    t[0][0] = 1;

    const forward = (i, j) => i + 1 < n && t[i + 1][j] === 0;
    const forwardBlocked = (i, j) => i + 1 >= n; // (i + 1 < n && t[i + 1][j] === 1); // i + 1 >= n ||

    const back = (i, j) => i - 1 >= 0 && t[i - 1][j] === 0;
    const backBlocked = (i, j) => i - 1 < 0; // || t[i - 1][j] === 1;
    const left = (i, j) => t[i][j - 1] === 0;
    const right = (i, j) => t[i][j + 1] === 0;

    function _helper(i, j, visited) {
        t[i][j] = 1;

        // console.log('i:', i, 'j:', j, 'visited:', visited + 1, 'result:', result);
        // console.log(t.map(item => item.join(', ')).join('\n'));

        if (i === n - 1 && j === n - 1) {
            if (visited + 1 === ALL) {
                result++;
            }
            return;
        }

        if (forwardBlocked(i, j) && left(i, j) && right(i, j)) {
            return;
        }

        if (backBlocked(i, j) && left(i, j) && right(i, j)) {
            return;
        }

        // не могу применить оптимизацию:
        // if the path cannot continue forward but can turn either left or right,
        // the grid splits into two parts that both contain unvisited squares
        // выдает неверный результат

        /* prettier-ignore */
        if (
            // уперлись в левую стену или просто не двинуться в лево
            (j - 1 < 0 ) && // и при
            i - 1 >= 0 && t[i-1][j] === 0 && // можно двигаться назад
            i + 1 < n  && t[i+1][j] === 0 // можно двигаться вперед
        ) {
            return;
        }
        if (
            j + 1 >= n &&
            i - 1 >= 0 &&
            t[i - 1][j] === 0 &&
            i + 1 < n &&
            t[i + 1][j] === 0
        ) {
            return;
        }

        if (forward(i, j)) {
            _helper(i + 1, j, visited + 1);
            t[i + 1][j] = 0;
        }

        if (j + 1 < n && t[i][j + 1] !== 1) {
            _helper(i, j + 1, visited + 1);
            t[i][j + 1] = 0;
        }

        if (i - 1 >= 0 && t[i - 1][j] !== 1) {
            _helper(i - 1, j, visited + 1);
            t[i - 1][j] = 0;
        }

        if (j - 1 >= 0 && t[i][j - 1] !== 1) {
            _helper(i, j - 1, visited + 1);
            t[i][j - 1] = 0;
        }
    }

    _helper(1, 0, 1);

    return result * 2;
}

// console.log('countPath(2):', countPath(2));
// console.log('countPath(3):', countPath(3));
// console.log('countPath(4):', countPath(4));
// console.log('countPath(5):', countPath(5));
console.log('countPath(7):', countPath(7));
