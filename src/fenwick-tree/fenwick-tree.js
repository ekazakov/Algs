// input should have 0 index empty
function createSimpleFenwickTree(input) {
    const tree = [...input];
    const size = tree.length;

    for (let i = 1; i < size; i++) {
        const parent = i + (i & -1);
        if (parent < size) {
            tree[parent] += tree[i];
        }
    }

    const prefixSum = i => {
        if (i < 1) {
            throw Error(`Can't calculate prefix sum for index less than 1`);
        }
        let sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & -i;
        }
        return sum;
    };

    return {
        update: (i, change) => {
            while (i < size) {
                tree[i] += change;
                i += i & -i;
            }
        },
        // from 5 to 1, from 7 to 4
        queryRange: (left, right) => {
            if (right < left) {
                throw Error(`right must be less than left`);
            }

            return prefixSum(right) - prefixSum(left - 1);
        },
        query: index => prefixSum(index),
    };
}
