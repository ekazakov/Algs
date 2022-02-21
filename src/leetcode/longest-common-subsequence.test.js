// https://leetcode.com/problems/longest-common-subsequence/
/*
Given two strings text1 and text2, return the length of their longest common subsequence.

A subsequence of a string is a new string generated from the original string with some
characters(can be none) deleted without changing the relative order of the remaining
characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence
of two strings is a subsequence that is common to both strings.



If there is no common subsequence, return 0.



Example 1:

Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.


Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.


Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.


Constraints:

1 <= text1.length <= 1000
1 <= text2.length <= 1000
The input strings consist of lowercase English characters only.
*/

function foo(start, left, right) {
    let result = 0;
    let index = 0;
    // prettier-ignore
    console.log(
        'stat:', start, 'left:', left.slice(start).split('').join(', '),
        '\nright', right.split('').join(', ')
    );
    for (let i = start; i < left.length; i++) {
        const tmpIndex = right.indexOf(left[i], index);
        if (tmpIndex >= 0) {
            console.log('found:', left[i], 'at:', tmpIndex);
            result += 1;
            index = tmpIndex + 1;
        }
    }

    return result;
}

const _longestCommonSubsequence = function(text1, text2) {
    let max = 0;
    let short = text1.length > text2.length ? text2 : text1;
    let long = text1.length > text2.length ? text1 : text2;

    for (let i = 0; i < short.length; i++) {
        const result = foo(i, short, long);
        max = Math.max(max, result);
    }

    // for (let i = 0; i < long.length; i++) {
    //     const result = foo(i, long, short);
    //     max = Math.max(max, result);
    // }

    return max;
};

const _longestCommonSubsequenceRec = function(text1, text2) {
    let max = 0;
    let short = text1.length > text2.length ? text2 : text1;
    let long = text1.length > text2.length ? text1 : text2;

    const _longest = function(shortIndex, index) {
        if (shortIndex >= short.length) {
            return 0;
        }

        const matchIndex = long.indexOf(short[shortIndex], index);
        if (matchIndex >= 0) {
            const left = _longest(shortIndex + 1, index);
            const right = _longest(shortIndex + 1, matchIndex + 1) + 1;

            const max = Math.max(left, right);

            return max;
        }

        return _longest(shortIndex + 1, index);
    };

    max = _longest(0, 0);

    return max;
};

const printTable = table => {
    let tmp = [];
    table.forEach(row => {
        tmp.push(row.join(', '));
    });
    console.log(tmp.join('\n'));
};

const longestCommonSubsequence = function(text1, text2) {
    let max = 0;
    const table = [];

    for (let i = 0; i <= text1.length; i++) {
        table[i] = new Array(text2.length + 1).fill(0);
    }

    // printTable(table);

    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                table[i][j] = table[i - 1][j - 1] + 1;
            } else {
                table[i][j] = Math.max(table[i][j - 1], table[i - 1][j]);
            }
            // console.log('i:', i, 'j:', j);
            // printTable(table);
        }
    }
    max = table[text1.length][text2.length];
    return max;
};

const longestCommonSubsequence2 = function(text1, text2) {
    let max = 0;
    const table = new Array(text2.length + 1).fill(0);

    for (let i = 1; i <= text1.length; i++) {
        let prev = 0;
        for (let j = 1; j <= text2.length; j++) {
            // console.log();
            const tmp = table[j];
            if (text1[i - 1] === text2[j - 1]) {
                table[j] = prev + 1;
            } else {
                table[j] = Math.max(table[j], table[j - 1]);
            }
            prev = tmp;
        }
    }
    max = table[text2.length];
    return max;
};

const longestCommonSubsequenceRec = function(text1, text2) {
    const cache = {};
    const key = (i, j) => `${i}:${j}`;

    const foo = (i, j) => {
        if (i <= 0 || j <= 0) {
            return 0;
        }

        if (cache[key(i, j)] != null) {
            // console.log('key', key(i, j));
            return cache[key(i, j)];
        }

        if (text1[i - 1] === text2[j - 1]) {
            // cache[key(i, j)] = foo(i - 1, j - 1) + 1;
            return foo(i - 1, j - 1) + 1;
        } else {
            cache[key(i, j)] = Math.max(foo(i - 1, j), foo(i, j - 1));
        }

        return cache[key(i, j)];
    };

    return foo(text1.length, text2.length);
};

describe('Longest Common Subsequence', () => {
    describe('Iterative One', function() {
        it('abcde & ace', () => {
            expect(longestCommonSubsequence('abcde', 'ace')).toEqual(3);
        });

        it('abcde & adce', () => {
            expect(longestCommonSubsequence('abcde', 'adce')).toEqual(3);
        });

        it('abcde & aced', () => {
            expect(longestCommonSubsequence('abcde', 'aced')).toEqual(3);
        });

        it('abc & def', () => {
            expect(longestCommonSubsequence('abc', 'def')).toEqual(0);
        });

        it('abc & abc', () => {
            expect(longestCommonSubsequence('abc', 'abc')).toEqual(3);
        });

        it('abcgfrabced & abced', () => {
            expect(longestCommonSubsequence('abcgfrabced', 'abced')).toEqual(5);
        });

        it('abcgfrabced & bceda', () => {
            expect(longestCommonSubsequence('acrebd', 'abced')).toEqual(4);
        });

        it('bcgfrbcead & abced', () => {
            expect(longestCommonSubsequence('bcgfrbcead', 'abced')).toEqual(4);
        });

        it('szulspmhwpazoxijwbq & mhunuzqrkzsnidwbun', () => {
            expect(
                longestCommonSubsequence('szulspmhwpazoxijwbq', 'mhunuzqrkzsnidwbun')
            ).toEqual(6);
        });

        it('hergrwzsjgjmnwfwjyxyhafstetgbydobynmxabavodsfwbqbevozkjkpwvw & pgrwlabutilctsrgbgxorwjezspgxwredqjklabwterwzyzstwpobwjujwjkb', () => {
            expect(
                longestCommonSubsequence(
                    'hergrwzsjgjmnwfwjyxyhafstetgbydobynmxabavodsfwbqbevozkjkpwvw',
                    'pgrwlabutilctsrgbgxorwjezspgxwredqjklabwterwzyzstwpobwjujwjkb'
                )
            ).toEqual(19);
        });
    });

    describe('Iterative two', () => {
        it('abcde & ace', () => {
            expect(longestCommonSubsequence2('abcde', 'ace')).toEqual(3);
        });

        it('abcde & adce', () => {
            expect(longestCommonSubsequence2('abcde', 'adce')).toEqual(3);
        });

        it('abcde & aced', () => {
            expect(longestCommonSubsequence2('abcde', 'aced')).toEqual(3);
        });

        it('abc & def', () => {
            expect(longestCommonSubsequence2('abc', 'def')).toEqual(0);
        });

        it('abc & abc', () => {
            expect(longestCommonSubsequence2('abc', 'abc')).toEqual(3);
        });

        it('abcgfrabced & abced', () => {
            expect(longestCommonSubsequence2('abcgfrabced', 'abced')).toEqual(5);
        });

        it('abcgfrabced & bceda', () => {
            expect(longestCommonSubsequence2('acrebd', 'abced')).toEqual(4);
        });

        it('bcgfrbcead & abced', () => {
            expect(longestCommonSubsequence2('bcgfrbcead', 'abced')).toEqual(4);
        });

        it('szulspmhwpazoxijwbq & mhunuzqrkzsnidwbun', () => {
            expect(
                longestCommonSubsequence2('szulspmhwpazoxijwbq', 'mhunuzqrkzsnidwbun')
            ).toEqual(6);
        });

        it('hergrwzsjgjmnwfwjyxyhafstetgbydobynmxabavodsfwbqbevozkjkpwvw & pgrwlabutilctsrgbgxorwjezspgxwredqjklabwterwzyzstwpobwjujwjkb', () => {
            expect(
                longestCommonSubsequence2(
                    'hergrwzsjgjmnwfwjyxyhafstetgbydobynmxabavodsfwbqbevozkjkpwvw',
                    'pgrwlabutilctsrgbgxorwjezspgxwredqjklabwterwzyzstwpobwjujwjkb'
                )
            ).toEqual(19);
        });
    });

    describe('Recursive solution', () => {
        it('abcde & ace', () => {
            expect(longestCommonSubsequenceRec('abcde', 'ace')).toEqual(3);
        });

        it('abcde & adce', () => {
            expect(longestCommonSubsequenceRec('abcde', 'adce')).toEqual(3);
        });

        it('abcde & aced', () => {
            expect(longestCommonSubsequenceRec('abcde', 'aced')).toEqual(3);
        });

        it('abc & def', () => {
            expect(longestCommonSubsequenceRec('abc', 'def')).toEqual(0);
        });

        it('abc & abc', () => {
            expect(longestCommonSubsequenceRec('abc', 'abc')).toEqual(3);
        });

        it('abcgfrabced & abced', () => {
            expect(longestCommonSubsequenceRec('abcgfrabced', 'abced')).toEqual(5);
        });

        it('abcgfrabced & bceda', () => {
            expect(longestCommonSubsequenceRec('acrebd', 'abced')).toEqual(4);
        });

        it('bcgfrbcead & abced', () => {
            expect(longestCommonSubsequenceRec('bcgfrbcead', 'abced')).toEqual(4);
        });

        it('szulspmhwpazoxijwbq & mhunuzqrkzsnidwbun', () => {
            expect(
                longestCommonSubsequenceRec('szulspmhwpazoxijwbq', 'mhunuzqrkzsnidwbun')
            ).toEqual(6);
        });

        it('hergrwzsjgjmnwfwjyxyhafstetgbydobynmxabavodsfwbqbevozkjkpwvw & pgrwlabutilctsrgbgxorwjezspgxwredqjklabwterwzyzstwpobwjujwjkb', () => {
            expect(
                longestCommonSubsequence2(
                    'hergrwzsjgjmnwfwjyxyhafstetgbydobynmxabavodsfwbqbevozkjkpwvw',
                    'pgrwlabutilctsrgbgxorwjezspgxwredqjklabwterwzyzstwpobwjujwjkb'
                )
            ).toEqual(19);
        });
    });
});

