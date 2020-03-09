// https://www.techiedelight.com/calculate-rank-lexicographically-sorted-permutations/

// Given a string, calculate its rank among all its lexicographically sorted permutations.
// For example, consider below lexicographically sorted permutations –
// ABCD ABDC ACBD ACDB ADBC ADCB BACD BADC BCAD BCDA BDAC BDCA
// CABD CADB CBAD CBDA CDAB CDBA DABC DACB DBAC DBCA DCAB DCBA

// Lexicographic rank of the string DCBA is 24
// Lexicographic rank of the string BDAC is 11

function factorial(n) {
    return n <= 2 ? n : n * factorial(n - 1);
}

/*
Ранг перестановки  — порядковый номер от еденицы до n!.
Возьмем строку ABCD среди ее перестановок есть 6 начинающихся на каждую
букву. Например для D это «DABC DACB DBAC DBCA DCAB DCBA» и их ранг будет от 19 до 24.
D последняя по афлавиту и значит перед ее перестановками идут 18 других(6 для каждой буквы строки).
Ранг для DABC = 3*3! + 1, где 3 - индекс D в отсорт-й строке и 3! — кол-во перестановок для строки из 3х букв,
а 1 — ранг для ABC.
Ранг для строки из 3х символов будет высчитываться по тем же принцыпам.

Если пошаманить, то получим рекурсивную зависимость:

N - длинна строки.
Index - индекс буквы в строке отсортированном по алфавиту

R(N) = Index * factorial(N - 1) + R(N - 1);
R(1) = 1

*/

function _findRankRec(str) {
    if (str.length === 1) {
        return 1;
    }
    const arr = str.split('').sort();
    const index = arr.indexOf(str[0]);
    // console.log(str[0], 'index:', index, 'len:', str.length);
    const preRank = index * factorial(str.length - 1);
    // console.log('preRank:', preRank);
    return preRank + findRankRec(str.slice(1));
}

/*
Есть другой способ выяснить индекс символа в отсортированной строке.
Т.к. мы всегда рассматриваем 1й символ, то достаточно посчитать сколько
справо отнего символов пеньшего веса.
*/
function findRankRec(str) {
    if (str.length === 1) {
        return 1;
    }
    let count = 0;
    for (let i = 1; i < str.length; i++) {
        if (str[0] > str[i]) {
            count++;
        }
    }
    // console.log(str[0], 'count:', count, 'len:', str.length);
    const preRank = count * factorial(str.length - 1);
    // console.log('preRank:', preRank);
    return preRank + findRankRec(str.slice(1));
}


/*
Итеративное решение:
Берем предыдущий алгоритм и пишем его итеративно :)
*/

function findRank(str) {
    const n = str.length - 1;
    let rank = 1;

    for (let i = 0; i < n; i++) {
        // console.log('i:', i);
        let count = 0;

        for (let j = i + 1; j <= n; j++) {
            console.log(str[i], ' & ', str[j]);
            if (str[i] > str[j]) {
                count++;
                // console.log('new count:', count);
            }
        }

        // console.log(`count * factorial(${n} - ${i}):`, count, '*', factorial(n - i));
        // console.log('old rank:', rank);
        rank += count * factorial(n - i);
        // console.log('new rank:', rank);
    }

    return rank;
}



console.log('rank of ABCD:', findRankRec('ABCD'));
console.log('rank of DBCA:', findRankRec('DBCA'));
console.log('rank of DCBA:', findRankRec('DCBA'));
console.log('rank of DCBA:', findRank('DCBA'));
console.log('rank of DBCA:', findRank('DBCA'));

