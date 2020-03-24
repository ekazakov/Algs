// https://www.techiedelight.com/print-distinct-subsets-given-set/
/*
Find all distinct subsets of a given set
Given a set of positive integers, find all its subsets.
The set can contain duplicate elements, so any repeated subset
 should be considered only once in the output.

Examples:

Input:  S = [1, 2, 2]
Output:  [], [1], [2], [1, 2], [2, 2], [1, 2, 2]
*/

// The time complexity of above solution is O(n*2^n)
function printSubsetsRecursive(set) {
    const result = [];

    function _helper(subset, index) {
        if (index < 0) {
            result.push([...subset]);
            return;
        }

        // include current element in the current subset and recur
        subset.push(set[index]);
        _helper(subset, index - 1);

        // exclude current element in the current subset
        subset.pop();

        // remove adjacent duplicate elements
        while (index > 0 && set[index] === set[index - 1]) {
            index--;
        }

        _helper(subset, index - 1);
    }

    // sort set, to have same elements near
    set.sort((a, b) => a - b);
    _helper([], set.length - 1);
    return result;
}

/*
  
Approach 2:
 
For a given set S, the power set can be found by generating all binary numbers
between 0 to 2n-1 where n is the size of the given set.
For example, for set S {x, y, z}, we generate binary numbers from 0 to 23-1 and for each
number generated, the corresponding set can be found by considering set bits in the number.
0 = 000 = {}
1 = 001 = {z}
2 = 010 = {y}
3 = 011 = {y, z}
4 = 100 = {x}
5 = 101 = {x, z}
6 = 110 = {x, y}
7 = 111 = {x, y, z}

 
To avoid printing duplicates subsets, we initially sort the set.
Also, we insert each subset into the set. As set maintains all distinct combinations, we will
have only distinct subsets into the set.


The time complexity of above solution is O(n*2^n)
*/

function printSubsetsIter(set) {
    const result = new Set();
    // sort set, to have same elements near
    set.sort((a, b) => a - b);
    // total number of subsets
    const n = Math.pow(2, set.length);

    for (let i = 0; i < n; i++) {
        const subset = [];
        // check every bit of i
        for (let j = 0; j < set.length; j++) {
            // if j'th bit of i is set, append set[j] to subset
            if ((i & (1 << j)) !== 0) {
                subset.push(set[j]);
            }
        }

        result.add(subset.join());
    }

    return [...result.values()];
}

describe('Print all distinct subsets', () => {
    it('recursive solution', () => {
        const result = [[2, 2, 1], [2, 2], [2, 1], [2], [1], []];
        expect(printSubsetsRecursive([2, 1, 2])).toEqual(result);
    });

    it('iterative solution', () => {
        const result = ['', '1', '2', '1,2', '2,2', '1,2,2'];
        expect(printSubsetsIter([2, 1, 2])).toEqual(result);
    });
});
