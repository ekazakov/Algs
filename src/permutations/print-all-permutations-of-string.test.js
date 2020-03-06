// https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/

/*
A permutation, also called an “arrangement number” or “order,” is a rearrangement of the
elements of an ordered list S into a one-to-one correspondence with S itself. A string of length n has n! permutation.

Below are the permutations of string ABC.
ABC ACB BAC BCA CBA CAB
*/

/*
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

function permutate(str) {
    const result = [];

    function _permutate(arr, j) {
        if (j >= arr.length) {
            result.push(arr.join(''));
            return;
        }
        for (let i = j; i < arr.length; i++) {
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            // console.log('i:', i, 'j:', j, 'arr:', arr.join(''));

            _permutate(arr, j + 1);
            const tmp2 = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp2;
        }
    }

    _permutate(str.split(''), 0);

    return result;
}

/*
https://leetcode.com/problems/permutations-ii
https://leetcode.com/problems/permutations-ii/discuss/18648/Share-my-Java-code-with-detailed-explanantion

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

    return result;
}

describe('Print all permutation of given string', () => {
    // console.log(printAllSubstr('abcd').join(','));
    describe('With duplicate permutations', () => {
        it('Permutations of abc', () => {
            const result = ['abc', 'acb', 'bac', 'bca', 'cba', 'cab'];
            expect(permutate('abc')).toEqual(result);
        });
    });

    describe('All distinct permutations(without duplicates)', () => {});
});
