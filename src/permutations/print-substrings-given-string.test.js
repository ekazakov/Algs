// https://www.geeksforgeeks.org/program-print-substrings-given-string/

/*
Given a string as an input. We need to write a program
that will print all non-empty substrings of that given string.

Examples :

Input :  abcd
Output :  a
          b
          c
          d
          ab
          bc
          cd
          abc
          bcd
          abcd
*/

function printAllSubstr(str) {
    const results = [];

    for (let step = 1; step <= str.length; step++) {
        for (let i = 0; i <= str.length - step; i++) {
            results.push(str.slice(i, i + step));
        }
    }

    return results;
}

describe('Print all non-empty substrings of given string', () => {
    // console.log(printAllSubstr('abcd').join(','));
    it('abcd', () => {
        const result = ['a', 'b', 'c', 'd', 'ab', 'bc', 'cd', 'abc', 'bcd', 'abcd'];
        expect(printAllSubstr('abcd')).toEqual(result);
    });
});
