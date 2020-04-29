// https://www.geeksforgeeks.org/bucket-sort-2/

function insertionSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = current;
    }

    return arr;
}

function bucketSort(arr) {
    const bucketsNum = 10;
    const buckets = new Array(bucketsNum);
    for (let i = 0; i < bucketsNum; i++) {
        buckets[i] = [];
    }

    for (let i = 0; i < arr.length; i++) {
        const n = Math.floor(bucketsNum * arr[i]);
        // console.log('arr[i]', arr[i], 'n:', n);
        buckets[n].push(arr[i]);
    }

    for (const bucket of buckets) {
        // console.log('bucket:', bucket);
        insertionSort(bucket);
    }

    let i = 0;
    for (const bucket of buckets) {
        for (const item of bucket) {
            arr[i] = item;
            i++;
        }
    }

    return arr;
}

const input = [0.897, 0.565, 0.8972, 0.656, 0.1234, 0.665, 0.3434, 0.492];
console.log('input:\n', [...input]);
console.log('bucketSort output:\n', bucketSort(input));
