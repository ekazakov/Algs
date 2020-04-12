// Design an algorithm and write code to find the first common ancestor
// of two nodes in a binary tree. Avoid storing additional nodes in a data structure.
// NOTE: This is not necessarily a binary search tree.

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

function getPath(root, target, path = []) {
    path.push(root);
    if (!root) {
        return [false, path];
    }

    // console.log('path', path.map(n => n.val));
    if (root === target) {
        return [true, path];
    }

    const [l] = getPath(root.left, target, path);
    if (!l) {
        path.pop();
    }

    const [r] = getPath(root.right, target, path);
    if (!r) {
        path.pop();
    }

    return [l || r, path];
}
function findCommonAncestor1(root, node1, node2) {
    const [_1, path1] = getPath(root, node1);
    const [_2, path2] = getPath(root, node2);

    let ancestor = null;
    while (path1.length > 0 && path2.length > 0) {
        const a = path1.shift();
        const b = path2.shift();

        if (a === b) {
            ancestor = a;
        }
    }

    return ancestor;
}

function contains(root, node) {
    if (!root) {
        return false;
    }

    if (root === node) {
        return true;
    }

    return contains(root.left, node) || contains(root.right, node);
}

function findCommonAncestor2(root, node1, node2) {
    if (!contains(root, node1) || !contains(root, node2)) {
        return null;
    }

    function find(root, node1, node2) {
        if (!root) {
            return null;
        }
        if (root === node1 || root === node2) {
            return root;
        }

        const node1_in_left = contains(root.left, node1);
        const node2_in_right = contains(root.right, node2);

        if ((node1_in_left && node2_in_right) || (!node1_in_left && !node2_in_right)) {
            return root;
        }
        if (node1_in_left && !node2_in_right) {
            return find(root.left, node1, node2);
        }
        return find(root.right, node1, node2);
    }

    return find(root, node1, node2);
}

// const [_, path] = getPath(root, node14);
// console.log('20 -> 14', getPath(root, node14)[1].map(n => n.val));
// console.log('20 -> 12', getPath(root, node12)[1].map(n => n.val));

// console.log(findCommonAncestor1(root, node12, node14).val);

describe('Find common ancestor of two nodes of the tree', function() {
/*
             20
         ↙       ↘
      8           22
   ↙   ↘
  4     12
      ↙    ↘
    10      14
*/
    const node10 = node(10);
    const node14 = node(14);
    const node4 = node(4);
    const node12 = node(12, node10, node14);
    const node8 = node(8, node4, node12);
    const node22 = node(22);
    const root = node(20, node8, node22);
    const node42 = node(42);
    // describe('Solution 1')

    describe('Solution without extra space', () => {
        it('10 and 14', () => {
            expect(findCommonAncestor2(root, node10, node14)).toBe(node12);
        });

        it('4 and 22', () => {
            expect(findCommonAncestor2(root, node4, node22)).toBe(root);
        });

        it('12 and 14', () => {
            expect(findCommonAncestor2(root, root, node22)).toBe(root);
        });

        it('8 and 42', () => {
            expect(findCommonAncestor2(root, node8, node42)).toBe(null);
        });
    });
});
