// From Competitive Programmers Handbook.pdf page 54
// consider a problem where we are given a list of n numbers and a number x,
// and we want to find out if it is possible to choose some numbers
// from the list so that their sum is x.
//
// For example, given the list [2,4,5,9] and x=15, we can choose the
// numbers [2,4,9] to get 2+4+9=15. However, if x=10 for the same list,
// it is not possible to form the sum.

function subsetsSums(set) {
    const result = [];
    const count = Math.pow(2, set.length);
    for (let i = 0; i < count; i++) {
        // const subset = [];
        let subsetSum = 0;
        for (let pos = 0; pos < set.length; pos++) {
            const item = set[pos];

            if (i & (1 << pos)) {
                subsetSum += item;
                // subset.push(item);
            }
        }
        // console.log(subset);
        result.push(subsetSum);
    }
    return result;
}

// O(2^N)
function subsetSumIsK1(set, k) {
    const sums = subsetsSums(set);
    // console.log('sums.indexOf(k):', sums.indexOf(k));
    return sums.indexOf(k) !== -1;
}
// O(2^(N/2))
function subsetSumIsK2(set, k) {
    const mid = Math.floor(set.length / 2);

    const sums1 = subsetsSums(set.slice(0, mid));
    const sums2 = subsetsSums(set.slice(mid));
    sums1.sort((a, b) => a - b);
    sums2.sort((a, b) => a - b);

    // console.log(sums1);
    // console.log(sums2);
    for (let i = 0; i < sums1.length; i++) {
        for (let j = 0; j < sums2.length; j++) {
            if (sums1[i] + sums2[j] === k) {
                return true;
            }
        }
    }

    return false;
}

console.log(subsetSumIsK1([1, 2, 3, 4], 7));
console.log(subsetSumIsK1([1, 2, 3, 4], 11));
console.log(subsetSumIsK2([1, 2, 3, 4], 7));
console.log(subsetSumIsK2([1, 2, 3, 4], 17));
