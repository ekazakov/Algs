// https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheQuickSort.html
function quickSort(arr) {
    function _quickSort(arr, start, end) {
        if (start < end) {
            const split = partition(arr, start, end);
            _quickSort(arr, start, split - 1);
            _quickSort(arr, split + 1, end);
        }

        return arr;
    }

    function partition(arr, start, end) {
        const pivot = arr[start];
        let left = start + 1;
        let right = end;

        while (true) {
            while (arr[left] <= pivot && left <= right) {
                left++;
            }

            while (arr[right] >= pivot && left <= right) {
                right--;
            }

            if (right < left) {
                break;
            }

            [arr[right], arr[left]] = [arr[left], arr[right]];
        }

        [arr[right], arr[start]] = [arr[start], arr[right]];

        return right;
    }

    return _quickSort(arr, 0, arr.length - 1);
}

// console.log(quickSort([54, 26, 93, 17, 77, 31, 44, 55, 20]));
// console.log(quickSort([1, 2, 3, 4, 5, 6, 7]));
// console.log(quickSort([1, 2, 3, 4, 5, 6, 7].reverse()));

// https://www.baeldung.com/cs/algorithm-quicksort

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

// Partition example
// Sorting arr: 3,7,8,5,2,1,9,5,4 from 0 to 8
// Pivot: 4
// Partition Index: 0
//
// When j == 0 => arr[0] == 3 => Swap 3 for 3 => arr := 3,7,8,5,2,1,9,5,4, partitionIndex := 1
// When j == 1 => arr[1] == 7 => No Change
// When j == 2 => arr[2] == 8 => No Change
// When j == 3 => arr[3] == 5 => No Change
// When j == 4 => arr[4] == 2 => Swap 7 for 2 => arr := 3,2,8,5,7,1,9,5,4, partitionIndex := 2
// When j == 5 => arr[5] == 1 => Swap 8 for 1 => arr := 3,2,1,5,7,8,9,5,4, partitionIndex := 3
// When j == 6 => arr[6] == 9 => No Change
// When j == 7 => arr[7] == 5 => No Change
//
// After Loop => Swap 4 for 5 => arr := 3,2,1,4,7,8,9,5,5, partitionIndex := 3
function quickSortLomuto(arr) {
    function partition(arr, low, high) {
        const pivot = arr[high];
        let pi = low; // partition index
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                swap(arr, pi, j);
                pi += 1;
            }
        }
        //[arr[pi], arr[high]] = [arr[high], arr[pi]];
        swap(arr, pi, high);

        return pi;
    }
    function _quickSort(arr, low, high) {
        if (low < high) {
            const p = partition(arr, low, high);
            _quickSort(arr, low, p - 1);
            _quickSort(arr, p + 1, high);
        }
    }

    _quickSort(arr, 0, arr.length - 1);
    return arr;
}

// Sorting input: 3,7,8,5,2,1,9,5,4 from 0 to 8
// Pivot: 2
//
// Loop #1
//     Iterate low => input[0] == 3 => Stop, low == 0
//     Iterate high => input[8] == 4 => high := 7
//     Iterate high => input[7] == 5 => high := 6
//     Iterate high => input[6] == 9 => high := 5
//     Iterate high => input[5] == 1 => Stop, high == 5
//     Swap 1 for 3 => input := 1,7,8,5,2,3,9,5,4
//     Low := 1
//     High := 4
// Loop #2
//     Iterate low => input[1] == 7 => Stop, low == 1
//     Iterate high => input[4] == 2 => Stop, high == 4
//     Swap 2 for 7 => input := 1,2,8,5,7,3,9,5,4
//     Low := 2
//     High := 3
// Loop #3
//     Iterate low => input[2] == 8 => Stop, low == 2
//     Iterate high => input[3] == 5 => high := 2
//     Iterate high => input[2] == 8 => high := 1
//     Iterate high => input[1] == 2 => Stop, high == 1
//     Return 1
function quickSortHoare(arr) {
    function partition(arr, low, high) {
        // const pivotPoint = low + Math.floor((high - low) / 2);
        const pivotPoint = low;
        const pivot = arr[pivotPoint];
        // let i = low;
        let i = low + 1; // because pivot is low
        let j = high;
        // prettier-ignore
        // console.log('low:', low, 'high:', high, 'pivotPoint:', pivotPoint, 'pivot:', pivot)

        while (true) {
            while (arr[i] <= pivot && i <= j) {
                i++;
            }
            // console.log('i:', i, 'arr[i]:', arr[i]);

            while (arr[j] >= pivot && i <= j) {
                j--;
            }
            // console.log('j:', j, 'arr[j]:', arr[j]);

            if (i > j) {
                [arr[low], arr[j]] = [arr[j], arr[low]];
                return j;
            }

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function _quickSort(arr, low, high) {
        if (low < high) {
            const p = partition(arr, low, high);
            _quickSort(arr, low, p - 1); // Note that this is different than when using Lomuto
            _quickSort(arr, p + 1, high);
        }
    }

    _quickSort(arr, 0, arr.length - 1);
    return arr;
}

function quickSortHoareRandP(arr) {
    function partition(arr, low, high) {
        const pivot = arr[low];
        let i = low + 1;
        let j = high;

        while (true) {
            while (arr[i] <= pivot && i <= j) {
                i++;
            }
            while (arr[j] >= pivot && i <= j) {
                j--;
            }

            if (i > j) {
                [arr[low], arr[j]] = [arr[j], arr[low]];
                return j;
            }

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function randomPartition(arr, low, high) {
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const pi = rand(low, high);
        [arr[low], arr[pi]] = [arr[pi], arr[low]];

        return partition(arr, low, high);
    }

    function _quickSort(arr, low, high) {
        if (low < high) {
            const p = randomPartition(arr, low, high);
            _quickSort(arr, low, p - 1);
            _quickSort(arr, p + 1, high);
        }
    }

    _quickSort(arr, 0, arr.length - 1);
    return arr;
}

const sort = arr => arr.sort((a, b) => a - b);

const input1 = [3, 7, 8, 5, 2, 1, 9, 5, 4];
const out1 = sort([...input1]);
const input2 = [54, 26, 93, 17, 77, 31, 44, 55, 20];
const out2 = sort([...input2]);
const input3 = [1, 2, 3, 4, 5, 6, 7, 8];
const out3 = sort([...input3]);
const input4 = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
const out4 = sort([...input4]);

// console.log(quickSortHoare([...input1]));

// const describe = () => {};
describe('Quick sort', function() {
    it('Lomuto partitioning', () => {
        expect(quickSortLomuto([...input1])).toEqual(out1);
        expect(quickSortLomuto([...input2])).toEqual(out2);
        expect(quickSortLomuto([...input3])).toEqual(out3);
        expect(quickSortLomuto([...input4])).toEqual(out4);
    });

    it('Hoare partitioning', () => {
        expect(quickSortHoare([...input1])).toEqual(out1);
        expect(quickSortHoare([...input2])).toEqual(out2);
        expect(quickSortHoare([...input3])).toEqual(out3);
        expect(quickSortHoare([...input4])).toEqual(out4);
    });
    it('Hoare random partitioning', () => {
        expect(quickSortHoareRandP([...input1])).toEqual(out1);
        expect(quickSortHoareRandP([...input2])).toEqual(out2);
        expect(quickSortHoareRandP([...input3])).toEqual(out3);
        expect(quickSortHoareRandP([...input4])).toEqual(out4);
    });
});
