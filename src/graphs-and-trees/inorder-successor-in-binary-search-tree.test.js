// https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/

// In Binary Tree, Inorder successor of a node is the next node in Inorder
// traversal of the Binary Tree. Inorder Successor is NULL for the last
// node in Inoorder traversal.
// In Binary Search Tree, Inorder Successor of an input
// node can also be defined as the node with the
// smallest key greater than the key of input node.
// So, it is sometimes important to find next node in sorted order.

/*
                 20
             ↙       ↘
          8           22
       ↙   ↘
      4     12
          ↙    ↘
        10      14
*/
// In the above diagram, inorder successor of 8 is 10, inorder successor
// of 10 is 12 and inorder successor of 14 is 20.

function node(val, left = null, right = null) {
    const root = {
        val,
        left,
        right
    };

    if (root.left) {
        root.left.parent = root;
    }

    if (root.right) {
        root.right.parent = root;
    }

    return root;
}

function mostLeftNode(node) {
    if (!node.left) {
        return node;
    }

    while (node.left) {
        node = node.left;
    }

    return node;
}

function getSuccessor(node) {
    if (node.right) {
        return mostLeftNode(node.right);
    }

    let parent = node.parent;

    while (parent) {
        if (node !== parent.right) {
            break;
        }

        node = parent;
        parent = parent.parent || null;
    }

    return parent;
}

function getSuccessor2(root, node) {
    if (node.right) {
        return mostLeftNode(node.right);
    }

    let successor = null;
    while (root !== null) {
        if (node.val < root.val) {
            successor = root;
            root = root.left;
        } else if (node.val > root.val) {
            root = root.right;
        } else {
            break;
        }
    }

    return successor;
}

describe('Inorder Successor in Binary Search Tree', () => {
    const node10 = node(10);
    const node14 = node(14);
    const node4 = node(4);
    const node12 = node(12, node10, node14);
    const node8 = node(8, node4, node12);
    const node22 = node(22);
    const root = node(20, node8, node22);

    describe('Solution one', function() {
        it('4 -> 8', () => {
            expect(getSuccessor(node4)).toBe(node8);
        });

        it('22 -> null', () => {
            expect(getSuccessor(node22)).toBe(null);
        });

        it('8 -> 10', () => {
            expect(getSuccessor(node8)).toBe(node10);
        });

        it('14 -> 20', () => {
            expect(getSuccessor(node14)).toBe(root);
        });
    });

    describe('Solution two', function() {
        it('4 -> 8', () => {
            expect(getSuccessor2(root, node4)).toBe(node8);
        });

        it('22 -> null', () => {
            expect(getSuccessor2(root, node22)).toBe(null);
        });

        it('8 -> 10', () => {
            expect(getSuccessor2(root, node8).val).toBe(node10.val);
        });

        it('14 -> 20', () => {
            expect(getSuccessor2(root, node14)).toBe(root);
        });
    });
});
