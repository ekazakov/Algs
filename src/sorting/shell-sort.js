function gapInsertionSort(arr, start, gap) {
    for (let i = start + gap; i < arr.length; i += gap) {
        const val = arr[i];

        let j = i;
        while (j - gap >= 0 && arr[j - gap] > val) {
            arr[j] = arr[j - gap];
            j -= gap;
        }
        arr[j] = val;
    }
}

function shellSort(arr) {
    let sublistCount = Math.floor(arr.length / 2);
    while (sublistCount > 0) {
        for (let startPos = 0; startPos < sublistCount; startPos++) {
            gapInsertionSort(arr, startPos, sublistCount);
        }
        sublistCount = Math.floor(sublistCount / 2);
    }

    return arr;
}

console.log(shellSort([4, 5, 9, 1, 2, 3, 6]));
console.log(shellSort([37, 23, 0, 17, 12, 72, 31, 46, 100, 88, 54]));
