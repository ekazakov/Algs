// Implement an algorithm to determine if a string has all unique characters. What if
// you cannot use additional data structures?

function isUniqueChars(str) {
    let checker = 0;

    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < str.length; i++) {
        const val = str.charCodeAt(i) - a;

        if ((checker & (1 << val)) !== 0) {
            return false;
        }

        checker |= 1 << val;
    }

    return true;
}


describe('1.1 isUniqueChars', () => {
    it('abcd', () => {
        expect(isUniqueChars('abcd')).toBeTruthy();
    });

    it('abcda', () => {
        expect(isUniqueChars('abcda')).toBeFalsy();
    });

});
