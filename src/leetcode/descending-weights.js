// https://www.hackerearth.com/ru/practice/algorithms/sorting/bucket-sort/practice-problems/algorithm/sort-the-array-5/

// You have been given an array A of size N and an integer K. This array
// consists of N integers ranging from 1 to 10^7. Each element in this array is
// said to have a Special Weight. The special weight of an element a[i] is a[i] mod K .
//
// You now need to sort this array in Non-Increasing order of the weight of each
// element, i.e the element with the highest weight should appear first,
// then the element with the second highest weight and so on. In case two
// elements have the same weight, the one with the lower value should
// appear in the output first.

// Example:
// Input: K=2, A=[1, 2, 3, 4, 5]
// Output: [1, 3, 5, 2, 4]

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const tmp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > tmp) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = tmp;
    }

    return arr;
}

function sort(nums, k) {
    // console.log('input:', nums, 'k:', k);
    const buckets = new Array(k);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    for (let i = 0; i < nums.length; i++) {
        const n = nums[i] % k;
        buckets[n].push(nums[i]);
    }

    for (let i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);
    }

    // console.log('buckets:', buckets);
    // const arr = [];
    for (let i = buckets.length - 1; i >= 0; i--) {
        const bucket = buckets[i];
        for (let j = 0; j < bucket.length; j++) {
            // arr.push(bucket[j]);
            process.stdout.write(bucket[j] + ' ');
        }
    }
    process.stdout.write('\n');

    // console.log('output:', arr);
    // return arr;
}
const input1 = [1, 2, 3, 4, 5];
sort(input1, 2);
