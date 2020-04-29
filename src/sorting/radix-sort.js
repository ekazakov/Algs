// https://www.geeksforgeeks.org/radix-sort/
// https://duvanenko.tech.blog/2017/06/15/faster-sorting-in-javascript/
// https://github.com/DragonSpit/hpc-algorithms/blob/master/RadixSort.js

// Radix sort takes in a list of n integers which are in base b (the radix) and so each number
// has at most d digits where d = floor(log_b(k) +1)
// ​
//  and k is the largest number in the list. For example,
//  three digits are needed to represent decimal 104 (in base 10). It is important
//  that radix sort can work with any base since the running time of the
//  algorithm, O(d(n+b)), depends on the base it uses. The algorithm runs
//  in linear time when bb and nn are of the same size magnitude,
//  so knowing n, b can be manipulated​ to optimize the running time of the algorithm.

// Radix sort will operate on n d-digit numbers where each digit can be one of at most b
// different values (since b is the base being used). For example, in base 10,
// a digit can be 0,1,2,3,4,5,6,7,8 or 9.
//
// Radix sort uses counting sort on each digit. Each pass over nn d-digit
// numbers will take O(n + b) time, and there are d passes total. Therefore,
// the total running time of radix sort is O(d(n+b)). When d is a constant and b isn't much larger
// than n (in other words, b = O(n)), then radix sort takes linear time.
function countingSort(arr, exp) {
    const result = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (const num of arr) {
        const index = Math.floor(num / exp) % 10;
        count[index] += 1;
    }

    // Change count[i] so that count[i] now contains actual
    // position of this digit in output array
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        const pos = count[index] - 1;
        result[pos] = arr[i];
        count[index] -= 1;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = result[i];
    }
    console.log('result:', result);
}

function radixSort(arr) {
    console.log('input: ', arr);
    const max = Math.max(...arr);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        console.log('exp:', exp);
        countingSort(arr, exp);
        exp *= 10;
    }
    console.log('output:', arr);
}

const input = [170, 45, 75, 90, 802, 24, 2, 66];

radixSort(input);
