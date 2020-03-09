// https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/

/**
A permutation, also called an “arrangement number” or “order,” is a rearrangement of the
elements of an ordered list S into a one-to-one correspondence with S itself. A string of length n has n! permutation.

Below are the permutations of string ABC.
ABC ACB BAC BCA CBA CAB
*/

/**
Solution (prints duplicate permutations):
1. Let j=0; In a loop swap str[i] with str[j]
2. Recursively call solution function with permutated
   array and shift j to the right(j+1)
3. Restore permutation in array on recursion exit
4. If j >= str.length them print permutation

                ABC
          /      |           \
     [A]BC     [BA]C          CBA
    /   \       /   \        /   \
[AB]C  [AC]B  [BA]C [BC]A  [CB]A [CA]B
*/

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function permutate(str) {
    const result = [];

    function _permutate(arr, j) {
        if (j >= arr.length) {
            result.push(arr.join(''));
            return;
        }
        for (let i = j; i < arr.length; i++) {
            swap(arr, i, j);
            _permutate(arr, j + 1);
            swap(arr, i, j);
        }
    }

    _permutate(str.split(''), 0);

    return result;
}

/**
https://leetcode.com/problems/permutations-ii
https://leetcode.com/problems/permutations-ii/discuss/18648/Share-my-Java-code-with-detailed-explanantion
https://www.geeksforgeeks.org/distinct-permutations-string-set-2/

Given a string that may contain duplicates, write a function to print all
permutations of given string such that no permutation is repeated in output.
Examples:

Input:  str[] = "AB"
Output: AB BA

Input:  str[] = "AA"
Output: AA

Input:  str[] = "ABC"
Output: ABC ACB BAC BCA CBA CAB

Input:  str[] = "ABA"
Output: ABA AAB BAA

Input:  str[] = "ABCA"
Output: AABC AACB ABAC ABCA ACBA ACAB BAAC BACA
        BCAA CABA CAAB CBAA
 */

function permutateDistinct(str) {
    const result = [];
    let level = -1;

    const print = (...args) => {
        // console.log('\t'.repeat(level), ...args);
    };

    /**
    Например есть строка BAA
    - из перестановки (0,1) получим ABA
    - из перестановки (0,2) получим AAB
    => Подстроки BA и AB содержат одинаковые символы и значит будут генерировать одинаковые перестановки.

    Чтобы этого избежать, надо игнорировать перестановки с повторяющимся символами.
    Т.е. если при попытки свапнуть arr[i] и arr[j], где i <= j между i и j найдется индекс k такой,
    что arr[k] === arr[j] то перестановку надо отменить.
    */
    const shouldSwap = (str, curr, start) => {
        print('should swap', 'start:', start, 'curr:', curr, ' [' + str.join(', ') + ']');
        for (let i = start; i < curr; i++) {
            print('i:', i, 'curr:', curr, 'str[i]', str[i], 'str[curr]', str[curr]);
            if (str[i] === str[curr]) {
                return false;
            }
        }
        return true;
    };
    /*

*/
    function _permutate(arr, curr) {
        level++;
        if (curr >= arr.length) {
            result.push(arr.join(''));
            level--;
            return;
        }
        print('arr:', arr.join(', '));
        for (let i = curr; i < arr.length; i++) {
            if (shouldSwap(arr, i, curr)) {
                swap(arr, i, curr);
                _permutate(arr, curr + 1);
                swap(arr, i, curr);
            }
        }
        level--;
    }

    _permutate(str.split(''), 0);

    return result;
}

/**
 https://www.techiedelight.com/generate-permutations-string-java-recursive-iterative

 Берем 1й символ и сохраняем его в массива неполных перестаново(подстрок).
 -В цикле начиная со 2го символа:
    - Запускаем подцикл по все сохраненным на текущий момент неполным перестановкам
        - Вытаскиваем последнюю неполную строку перестановок — partial
        - во все позиции(перед, после, между каждым символом) partial подставляем текущий символ
          и сохраняем новую строку в массив перестановок. Так получаем новые неполные перестановки.
 - По окончанию всех циклов получим массив со всеми полными перестановками

 Пример:
 Дано: "abc"
 0. a
 1. b + a
    a + b
 2. c + ba
    b + c + a
    ba + c
    c + ab
    a + c + b
    ab + c
*/

function permutateIterative(str) {
    const partials = [];
    partials.push(str[0]);

    for (let i = 1; i < str.length; i++) {
        let j = partials.length;
        // console.log('partials:', partials.join(', '));
        // console.log('i', i, 'len:', j);
        while (j > 0) {
            const partial = partials.pop();
            // console.log('pop:', partial);

            for (let k = 0; k <= partial.length; k++) {
                const newPartial = partial.slice(0, k) + str[i] + partial.slice(k);
                // console.log('newPartial:', newPartial);
                partials.unshift(newPartial);
            }

            j--;
        }
    }

    return partials;
}

describe('Print all permutation of given string', () => {
    describe('With duplicate permutations', () => {
        it('Permutations of abc', () => {
            const result = ['abc', 'acb', 'bac', 'bca', 'cba', 'cab'];
            expect(permutate('abc')).toEqual(result);
        });
    });

    describe('All distinct permutations(without duplicates)', () => {
        it('Permutations of aba', () => {
            const result = ['aba', 'aab', 'baa'];
            expect(permutateDistinct('aba')).toEqual(result);
        });

        it('Permutations of aaa', () => {
            const result = ['aaa'];
            expect(permutateDistinct('aaa')).toEqual(result);
        });

        it('Permutations of aab', () => {
            const result = ['aab', 'aba', 'baa'];
            expect(permutateDistinct('aab')).toEqual(result);
        });

        it('Permutations of aab', () => {
            // console.log(permutateDistinct('baa').join('\n'))
            const result = ['baa', 'aba', 'aab'];
            expect(permutateDistinct('baa')).toEqual(result);
        });

        it('Permutations of abac', () => {
            // prettier-ignore
            const result = ['abac', 'abca', 'aabc', 'aacb', 'acab', 'acba', 'baac', 'baca', 'bcaa', 'cbaa', 'caba', 'caab'];
            expect(permutateDistinct('abac')).toEqual(result);
        });
    });

    describe('Iterative solution', () => {
        it('Permutations of abc', () => {
            // console.log(permutateDistinct('baa').join('\n'))
            const result = ['abc', 'acb', 'cab', 'bac', 'bca', 'cba'];
            expect(permutateIterative('abc')).toEqual(result);
        });
    });
});
