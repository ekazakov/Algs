function mergeArrays(arr1, arr2) {
    const offset = arr1.length - arr2.length;
    let p1 = offset - 1;
    let p2 = arr2.length - 1;
    let i = arr1.length - 1;

    while (p1 >= 0 && p2 >= 0) {
        if (arr1[p1] > arr2[p2]) {
            arr1[i] = arr1[p1];
            p1--;
        } else {
            arr1[i] = arr2[p2];
            p2--;
        }
        i--;
    }

    while (p2 >= 0) {
        arr1[i] = arr2[p2];
        p2--;
        i--;
    }

    return arr1;
}

// [1,2,9,14,......]
// [3,6,10]
// [1,2,3, 6, 9, 10, 14]

const arr1 = [1, 2, 9, 14, -1, -1, -1, -1];
const arr2 = [3, 6, 10, 15];
console.log(mergeArrays(arr1, arr2));

const arr3 = [3, 6, 10, 15, -1, -1, -1, -1];
const arr4 = [1, 2, 9, 14];
console.log(mergeArrays(arr3, arr4));
