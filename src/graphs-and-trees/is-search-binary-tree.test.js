// Implement a function to check if a binary tree is a binary search tree.

function node(val, left = null, right = null) {
    return {
        val,
        left,
        right
    };
}

// works only for all unique values
function checkBST1(tree) {
    let max = -Infinity;

    const _isSearchTree = node => {
        if (!node) {
            return true;
        }

        if (!_isSearchTree(node.left)) {
            return false;
        }

        if (node.val <= max) {
            return false;
        }
        max = node.val;

        if (!_isSearchTree(node.right)) {
            return false;
        }

        return true;
    };

    return _isSearchTree(tree);
}

function checkBST2(tree) {
    const _checkBST = (node, min, max) => {
        if (!node) {
            return true;
        }

        if (node.val <= min || node.val > max) {
            return false;
        }

        if (
            !_checkBST(node.left, min, node.val) ||
            !_checkBST(node.right, node.val, max)
        ) {
            return false;
        }

        return true;
    };

    return _checkBST(tree, -Infinity, Infinity);
}

const input1 = node(
    6,
    node(3, node(1, null, node(2)), node(4, null, node(5))),
    node(9, node(7, null, node(8)), node(10, null, node(11)))
);

const input2 = node(6, node(3, node(1, null, node(2))), node(9, node(7, null, node(8))));
const input3 = node(6, node(3, node(1, null, node(22))), node(9, node(7, null, node(8))));

console.log('checkBST1(input1):', checkBST1(input1));
console.log('checkBST1(input2):', checkBST1(input2));
console.log('checkBST1(input3):', checkBST1(input3));

console.log('checkBST2(input1):', checkBST2(input1));
console.log('checkBST2(input2):', checkBST2(input2));
console.log('checkBST2(input3):', checkBST2(input3));
