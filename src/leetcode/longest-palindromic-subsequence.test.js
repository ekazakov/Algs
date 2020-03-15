// https://leetcode.com/problems/longest-palindromic-subsequence/
// Given a string s, find the longest palindromic subsequence's
// length in s. You may assume that the maximum length of s is 1000.

function isPalindrome(str) {
    const middle = Math.floor(str.length / 2);
    for (let i = 0; i <= middle; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }

    return true;
}

// brute force
const lps1 = function(str, cache = {}) {
    if (cache[str] != null) {
        return cache[str];
    }

    if (isPalindrome(str)) {
        cache[str] = str.length;
        return str.length;
    }

    let max = 0;
    for (let i = 0; i < str.length; i++) {
        const nextStr = str.slice(0, i) + str.slice(i + 1);
        max = Math.max(lps1(nextStr, cache), max);
    }

    cache[str] = max;

    return max;
};

const lps2 = function(str) {
    const cache = {};
    const key = (i, j) => `${i}:${j}`;

    function _lps(i, j) {
        if (cache[key(i, j)] != null) {
            return cache[key(i, j)];
        }

        if (i > j) {
            return 0;
        }
        if (i === j) {
            return 1;
        }

        if (str[i] === str[j]) {
            cache[key(i, j)] = _lps(i + 1, j - 1) + 2;
        } else {
            cache[key(i, j)] = Math.max(_lps(i + 1, j), _lps(i, j - 1));
        }

        return cache[key(i, j)];
    }

    return _lps(0, str.length - 1);
};

const lps3 = function(str) {
    const table = new Array(str.length);
    //  создаем таблицу для хранения длин подстрок-полиндромов(ПП)
    for (let i = 0; i < str.length; i++) {
        table[i] = new Array(str.length).fill(0);
        //на диагонали таблицы лежат длины односимвольных палиндромов
        table[i][i] = 1;
    }

    // console.log(table.join('\n'));
    // итеририруемся по всем подстрокам начиная с двухсимвольных
    for (let cl = 2; cl <= str.length; cl++) {
        for (let i = 0; i <= str.length - cl; i++) {
            j = i + cl - 1;
            // console.log('substr:', str.slice(i, j + 1), 'i:', i, 'j:', j);

            // если символы равны, то длинна текущей ПП = 2 + длинна ПП меньшей на 2 символа
            if (str[i] === str[j]) {
                table[i][j] = table[i + 1][j - 1] + 2;
            } else {
            // если символы разные, то берем макс длинну для уже пощитанных ПП.
            // Которые короче на один символ слева или справа
                table[i][j] = Math.max(table[i + 1][j], table[i][j - 1]);
            }
        }
        // console.log(table.join('\n'));
    }

    return table[0][str.length - 1];
};

// lps3('abcb');
// создаем таблицу для хранения длин подстрок-полиндромов
//   a b c b
// a 0 0 0 0
// b 0 0 0 0
// c 0 0 0 0
// b 0 0 0 0

// Инициировали таблицу для односимвольных палиндромов
// 1,0,0,0
// 0,1,0,0
// 0,0,1,0
// 0,0,0,1
// проходимся по подстрокам длины 2
// substr: ab i: 0 j: 1 => запишем 1 в ячейку (0,1) т.к. max(table[0,0], table[1,1]) == 1
// substr: bc i: 1 j: 2 => запишем 1 в ячейку (1,2) т.к. max(table[1,1], table[2,2]) == 1
// substr: cb i: 2 j: 3 => запишем 1 в ячейку (2,3) т.к. max(table[2,2], table[3,3]) == 1
// 1,1,0,0
// 0,1,1,0
// 0,0,1,1
// 0,0,0,1
// проходимся по подстрокам длины 3
// substr: abc i: 0 j: 2 => запишем 1 в ячейку (0,2) т.к. max(table[1,2], table[0,1]) == 1
// substr: bcb i: 1 j: 3 => запишем 3 в ячейку (1,3) т.к. table[1,3] = 2 + table[2,2]
// 1,1,1,0
// 0,1,1,3
// 0,0,1,1
// 0,0,0,1
// substr: abcb i: 0 j: 3 => запишем 3 в ячейку (0,3) т.к. max(table[1,3], table[0,2]) == 3
// 1,1,1,3
// 0,1,1,3
// 0,0,1,1
// 0,0,0,1


describe('Is palindrome', function() {
    it('empty string', () => {
        expect(isPalindrome('')).toBeTruthy();
    });

    it('a', () => {
        expect(isPalindrome('a')).toBeTruthy();
    });
    it('abccba', () => {
        expect(isPalindrome('abccba')).toBeTruthy();
    });
    it('abcecba', () => {
        expect(isPalindrome('abcecba')).toBeTruthy();
    });

    it('aaabbbbaaa', () => {
        expect(isPalindrome('aaabbbbaaa')).toBeTruthy();
    });

    it('de', () => {
        expect(isPalindrome('de')).toBeFalsy();
    });

    it('badeab', () => {
        expect(isPalindrome('badeab')).toBeFalsy();
    });
});

describe('longest palindromic subsequence', function() {
    describe('Brute force', function() {
        it('cbbd', () => {
            expect(lps1('cbbd')).toBe(2);
        });

        it('abccba', () => {
            expect(lps1('abccba')).toBe(6);
        });
        it('abcdecba', () => {
            expect(lps1('abcdecba')).toBe(7);
        });
        it('aaabbbb', () => {
            expect(lps1('aaabbbb')).toBe(4);
        });

        it('acabdbebgbaa', () => {
            expect(lps1('acabdbebgbaa')).toBe(9);
        });
        it('aaabbbbaaaa', () => {
            expect(lps1('aaabbbbaaaa')).toBe(10);
        });

        it('abacababacab', () => {
            expect(lps1('abacababacab')).toBe(11);
        });
    });

    describe('Recursive', function() {
        it('cbbd', () => {
            expect(lps2('cbbd')).toBe(2);
        });

        it('abccba', () => {
            expect(lps2('abccba')).toBe(6);
        });
        it('abcdecba', () => {
            expect(lps2('abcdecba')).toBe(7);
        });
        it('aaabbbb', () => {
            expect(lps2('aaabbbb')).toBe(4);
        });

        it('acabdbebgbaa', () => {
            expect(lps2('acabdbebgbaa')).toBe(9);
        });
        it('aaabbbbaaaa', () => {
            expect(lps2('aaabbbbaaaa')).toBe(10);
        });

        it('abacababacab', () => {
            expect(lps2('abacababacab')).toBe(11);
        });

        it('very long', () => {
            const str =
                'euazbipzncptldueeuechubrcourfpftcebikrxhybkymimgvldiwqvkszfycvqyvtiwfckexmowcxztkfyzqovbtmzpxojfofbvwnncajvrvdbvjhcrameamcfmcoxryjukhpljwszknhiypvyskmsujkuggpztltpgoczafmfelahqwjbhxtjmebnymdyxoeodqmvkxittxjnlltmoobsgzdfhismogqfpfhvqnxeuosjqqalvwhsidgiavcatjjgeztrjuoixxxoznklcxolgpuktirmduxdywwlbikaqkqajzbsjvdgjcnbtfksqhquiwnwflkldgdrqrnwmshdpykicozfowmumzeuznolmgjlltypyufpzjpuvucmesnnrwppheizkapovoloneaxpfinaontwtdqsdvzmqlgkdxlbeguackbdkftzbnynmcejtwudocemcfnuzbttcoew';
            expect(lps2(str)).toBe(159);
        });
    });

    describe('DP solution', function() {
        it('cbbd', () => {
            expect(lps3('cbbd')).toBe(2);
        });

        it('abccba', () => {
            expect(lps3('abccba')).toBe(6);
        });
        it('abcdecba', () => {
            expect(lps3('abcdecba')).toBe(7);
        });
        it('aaabbbb', () => {
            expect(lps3('aaabbbb')).toBe(4);
        });

        it('acabdbebgbaa', () => {
            expect(lps3('acabdbebgbaa')).toBe(9);
        });
        it('aaabbbbaaaa', () => {
            expect(lps3('aaabbbbaaaa')).toBe(10);
        });

        it('abacababacab', () => {
            expect(lps3('abacababacab')).toBe(11);
        });

        it('very long', () => {
            const str =
                'euazbipzncptldueeuechubrcourfpftcebikrxhybkymimgvldiwqvkszfycvqyvtiwfckexmowcxztkfyzqovbtmzpxojfofbvwnncajvrvdbvjhcrameamcfmcoxryjukhpljwszknhiypvyskmsujkuggpztltpgoczafmfelahqwjbhxtjmebnymdyxoeodqmvkxittxjnlltmoobsgzdfhismogqfpfhvqnxeuosjqqalvwhsidgiavcatjjgeztrjuoixxxoznklcxolgpuktirmduxdywwlbikaqkqajzbsjvdgjcnbtfksqhquiwnwflkldgdrqrnwmshdpykicozfowmumzeuznolmgjlltypyufpzjpuvucmesnnrwppheizkapovoloneaxpfinaontwtdqsdvzmqlgkdxlbeguackbdkftzbnynmcejtwudocemcfnuzbttcoew';
            expect(lps3(str)).toBe(159);
        });
    });
});
