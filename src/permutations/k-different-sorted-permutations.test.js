// https://www.geeksforgeeks.org/print-k-different-sorted-permutations-of-a-given-array/

/*
*Print k different sorted permutations of a given array*

Given an array arr[] containing N integers, the task is to print k different
permutations of indices such that the values at those indices form a
non-decreasing sequence. Print -1 if it is not possible.

Examples:

```
Input: arr[] = {1, 3, 3, 1}, k = 3
Output:
0 3 1 2
3 0 1 2
3 0 2 1
For every permutation, the values at the indices form the following sequence {1, 1, 3, 3}
```

```
Input: arr[] = {1, 2, 3, 4}, k = 3
Output: -1
There is only 1 non decreasing sequence possible {1, 2, 3, 4}.
```
 */

// TODO: explanation needed

function sort(arr) {
    return arr.sort((a, b) => {
        if (a === b) {
            return 0;
        }

        return a > b ? 1 : -1;
    });
}

function printIndices(arr) {
    const str = arr.map(item => item[1]).join(', ');
    console.log('Indices:', str);
}

function printPermutations(items, k) {
    const arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push([items[i], i]);
    }

    sort(arr);

    let count = 1;
    for (let i = 1; i < items.length; i++) {
        if (arr[i][0] === arr[i - 1][0]) {
            count++;
        }
    }

    if (count < k) {
        console.log('fail', -1);
        return;
    }

    for (let i = 0; i < k - 1; i++) {
        printIndices(arr);
        for (let j = 1; j < items.length; j++) {
            if (arr[j][0] === arr[j - 1][0]) {
                const tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
                break;
            }
        }
    }

    printIndices(arr);
}

// printPermutations([1, 3, 3, 1], 3);
printPermutations([1, 1, 1, 1], 3);
