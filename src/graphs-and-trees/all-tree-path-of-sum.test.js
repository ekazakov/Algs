// https://www.geeksforgeeks.org/print-k-sum-paths-binary-tree/

// A binary tree and a number k are given. Print every path in the
// tree with sum of the nodes in the path as k.
// A path can start from any node and end at any node
// and must be downward only, i.e. they need not be root
// node and leaf node; and negative numbers can also be
// there in the tree.
//
//
// Examples:
//
// Input : k = 5
//         Root of below binary tree:
//            1
//         /     \
//       3        -1
//     /   \     /   \
//    2     1   4     5
//         /   / \     \
//        1   1   2     6
//
// Output :
// 3 2
// 3 1 1
// 1 3 1
// 4 1
// 1 -1 4 1
// -1 4 2
// 5
// 1 -1 5

function node(val, left, right) {
    return { val, left, right };
}

function kSumPaths(tree, k) {
    const path = [];
    // const results = []

    function _helper(node) {
        if (!node) {
            return;
        }

        path.push(node.val);
        // console.log('p:', path.join(', '));
        let sum = 0;
        for (let i = path.length - 1; i >= 0; i--) {
            sum += path[i];
            if (sum === k) {
                console.log('path:', path.slice(i));
            }
        }

        _helper(node.left);
        _helper(node.right);
        path.pop();
    }

    _helper(tree);
}

// prettier-ignore
const tree = node(1,
    node(3,
        node(2),
        node(1,
            node(1)
        )
    ),
    node(-1,
        node(4,
            node(1),
            node(2)
        ),
        node(5,
            null,
            node(6)
        )
    )
);

if (require.main === module) {
    kSumPaths(tree, 5);
}
