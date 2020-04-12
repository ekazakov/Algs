// Given a sorted (increasing order) array with unique integer elements, write an
// algorithm to create a binary search tree with minimal height.

function node(val, left = null, right = null) {
    return {
        val,
        left,
        right
    };
}

function add(root, val) {
    if (root.val >= val) {
        if (root.right) {
            add(root.right, val);
        } else {
            root.right = node(val);
        }
    } else {
        if (root.left) {
            add(root.left, val);
        } else {
            root.left = node(val);
        }
    }
}

const arrayToTree = data => {
    const _arrayToTree = (data, lo, hi) => {
        if (lo > hi) {
            return null;
        }

        const mid = Math.floor((hi + lo) / 2);
        // console.log('mid:', mid, 'hi:', hi, 'lo:', lo);

        const root = node(data[mid]);
        root.left = _arrayToTree(data, lo, mid - 1);
        root.right = _arrayToTree(data, mid + 1, hi);

        return root;
    };

    return _arrayToTree(data, 0, data.length - 1);
};

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// console.log(arrayToTree(data));
// console.log(JSON.stringify(arrayToTree(data), null, '\t'));

// [1,2,3,4,5,6,7,8,9]
/*

*/
// [1,2,3,4,5,6,7,8,9,10,11]
/*
                 6
           3           9
        1    4       7   10
         2    5       8    11

*/
describe('Convert sorted array to binary search tree', () => {
    it('One', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const output = node(
            6,
            node(3, node(1, null, node(2)), node(4, null, node(5))),
            node(9, node(7, null, node(8)), node(10, null, node(11)))
        );

        expect(arrayToTree(input)).toEqual(output);
    });

    it('Two', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // prettier-ignore
        const output = node(5,
            node(2,
                node(1),
                node(3, null, node(4))),
            node(7,
                node(6),
                node(8, null, node(9))));

        expect(arrayToTree(input)).toEqual(output);
    });
});
