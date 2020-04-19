// https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheInsertionSort.html
const print = (...args) => {
    console.log(...args);
};

function insertionSort(data) {
    for (let i = 1; i < data.length; i++) {
        const key = data[i];
        let j = i - 1;

        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j -= 1;
        }
        data[j + 1] = key;
    }
}

function binarySearch(arr, val, start, end) {
    let mid = Math.floor(start + (end - start) / 2);
    // print('start:', start, 'end:', end, 'mid:', mid, 'arr[mid]:', arr[mid]);
    while (start <= end) {
        if (val <= arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
        mid = Math.floor(start + (end - start) / 2);
        // print('start:', start, 'end:', end, 'mid:', mid, 'arr[mid]:', arr[mid]);
    }

    if (mid === -1) {
        // print('result:', 0);
        return 0;
    }

    if (mid === arr.length) {
        // print('result:', arr.length - 1);
        return arr.length - 1;
    }

    if (val > arr[mid]) {
        mid = mid + 1;
    }

    // print('result:', mid);

    return mid;
}

function binaryInsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const val = arr[i];
        const k = binarySearch(arr, val, 0, i - 1);
        // print('arr:', arr, 'i:', i, 'k:', k);
        for (let j = i; j >= k; j--) {
            arr[j] = arr[j - 1];
        }
        arr[k] = val;
    }

    return arr;
}

// [37, 23, 0, 17, 12, 72, 31, 46, 100, 88, 54]

// [1,2,4,5,7] , 3
// print(binaryInsertionSort([4, 5, 9, 1, 2, 3, 6]));
console.log(binaryInsertionSort([37, 23, 0, 17, 12, 72, 31, 46, 100, 88, 54]));
// binarySearch([1, 2, 4, 5, 7], 3, 0, 4);
// binarySearch([1, 2, 4, 5, 7], 9, 0, 4);
