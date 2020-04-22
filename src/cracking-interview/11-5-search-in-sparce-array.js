// Given a sorted array of strings which is interspersed
// with empty strings, write a method to find the
// location of a given string.

const input1 = ['', 'a', '', '', '', 'b', '', 'c', 'd', '', '', 'e', '', '', 'f'];
const input2 = ['', '', '', '', 'b', '', '', 'c'];
const input3 = ['', '', '', '', 'b', '', ''];

function isEmpty(str) {
    return str === '';
}

function search(arr, item) {
    function _search(lo, hi) {
        if (lo > hi) {
            return -1;
        }

        let mid = lo + Math.floor((hi - lo) / 2);
        // console.log('lo:', lo, 'hi:', hi, 'mid:', mid, 'arr[mid]:', arr[mid]);

        if (isEmpty(arr[mid])) {
            let left = mid - 1;
            let right = mid + 1;
            while (true) {
                if (left < lo && right > hi) {
                    return -1;
                }
                if (left >= lo && !isEmpty(arr[left])) {
                    // console.log('left:', left);
                    mid = left;
                    break;
                } else if (right <= hi && !isEmpty(arr[right])) {
                    // console.log('right:', right);
                    mid = right;
                    break;
                }

                left--;
                right++;
            }
        }

        if (arr[mid] === item) {
            return mid;
        }
        if (arr[mid] < item) {
            return _search(mid + 1, hi);
        }
        return _search(lo, mid - 1);
    }

    return _search(0, arr.length - 1);
}

// console.log('input1:', input1);
console.log('look for "a"', search(input1, 'a'));
console.log('look for "b"', search(input1, 'b'));
console.log('look for "c"', search(input1, 'c'));
console.log('look for "d"', search(input1, 'd'));
console.log('look for "e"', search(input1, 'e'));
console.log('look for "f"', search(input1, 'f'));
console.log('look for "g"', search(input1, 'g'));
//
console.log('');
console.log('input2:', input2);
console.log('look for "b"', search(input2, 'b'));
console.log('look for "c"', search(input2, 'c'));
console.log('look for "d"', search(input2, 'd'));
console.log('look for "a"', search(input2, 'a'));
//
console.log('');
console.log('input3:', input3);
console.log('look for "b"', search(input3, 'b'));
console.log('look for "d"', search(input3, 'd'));
console.log('look for "a"', search(input3, 'a'));
