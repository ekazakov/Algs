// https://www.geeksforgeeks.org/stable-quicksort/?ref=rp
// Quicksort can be stable but it typically isn’t implemented that way. Making it stable either requires order N storage (as in a naive implementation) or a bit of extra logic for an in-place version.
// In below implementation, we use extra space. The idea is to make two separate lists:
// 1) First list contains items smaller than pivot.
// 2) Second list contains items greater than pivot.

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const pivot = arr[mid];
    const left = [];
    const right = [];

    //  Put greater elements in greater list,
    //  smaller elements in smaller list. Also,
    //  compare positions to decide where to put.
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        if (i !== mid) {
            if (val < pivot) {
                left.push(val);
            } else if (val > pivot) {
                right.push(val);
            } else {
                // If value is same, then considering
                // position to decide the list.
                if (index < mid) {
                    left.push(val);
                } else {
                    right.push(val);
                }
            }
        }
    }

    return quickSort(left)
        .concat(pivot)
        .concat(quickSort(right));
}
