// Implement a method to perform basic string compression
// using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3.
// If the "compressed" string would not become smaller than the
// original string, your method should return the original string.

function compress(str) {
    const chars = str.split('');
    const result = [];

    let cr = chars[0];
    let counter = 1;
    for (let i = 1; i < chars.length; i++) {
        if (cr === chars[i]) {
            counter++;
        } else {
            result.push(cr + counter);
            counter = 1;
            cr = chars[i];
        }
    }

    result.push(cr + counter);

    const res = result.join('');

    if (res.length >= str.length) {
        return str;
    }

    return res;
}

function compressedLen(str) {
    let cr = str[0];
    let len = 0;
    let counter = 1;
    for (let i = 1; i < str.length; i++) {
        if (cr === str[i]) {
            counter++;
        } else {
            counter = 1;
            cr = str[i];
            len += 1 + String(counter).length;
        }
    }

    return len;
}

function addNumber(arr, j, num) {
    const numStr = String(num);
    for (let k = 0; k < numStr.length; k++) {
        arr[j++] = numStr[k];
    }

    return j;
}

// Конкатенация строк(если они храняться тупо в массиве это O(n^2))
// Сделаем все без конкатенации, скалдывая каждый символ в массив
function compress2(str) {
    const len = compressedLen(str);

    if (len >= str.length) {
        return str;
    }

    const result = new Array(len);
    let cr = str[0];
    let counter = 1;
    let j = 0;
    for (let i = 1; i < str.length; i++) {
        if (cr === str[i]) {
            counter++;
        } else {
            result[j++] = cr;
            j = addNumber(result, j, String(counter));
            counter = 1;
            cr = str[i];
        }
    }

    result[j++] = cr;
    addNumber(result, j, String(counter));

    return result.join('');
}

describe('1.5 Basic String compression', () => {
    it('aabcccccaaa', () => {
        expect(compress2('aabcccccaaa')).toEqual('a2b1c5a3');
    });

    it('eeeeeeee', () => {
        expect(compress2('eeeeeeee')).toEqual('e8');
    });

    it('abcd', () => {
        expect(compress2('abcd')).toEqual('abcd');
    });
});
