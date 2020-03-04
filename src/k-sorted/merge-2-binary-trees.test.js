// https://leetcode.com/problems/merge-two-binary-trees/
/*
Given two binary trees and imagine that when you put one of them to cover
the other, some nodes of the two trees are overlapped while the others are not.

You need to merge them into a new binary tree. The merge rule is that if two
nodes overlap, then sum node values up as the new value of the merged node.
Otherwise, the NOT null node will be used as the node of new tree.

Example 1:

Input:
	Tree 1                     Tree 2
          1                         2
         / \                       / \
        3   2                     1   3
       /                           \   \
      5                             4   7
Output:
Merged tree:
	     3
	    / \
	   4   5
	  / \   \
	 5   4   7


Note: The merging process must start from the root nodes of both trees.
*/

function node(val, left, right) {
    if (val == null) {
        return null;
    }
    return {
        val,
        left,
        right
    };
}

function buildTree(data, i = 0) {
    const leftIndex = i * 2 + 1;
    const rightIndex = i * 2 + 2;

    const left = leftIndex < data.length ? buildTree(data, leftIndex) : null;
    const right = rightIndex < data.length ? buildTree(data, rightIndex) : null;

    return node(data[i], left, right);
}

function stringify(tree) {
    return JSON.stringify(tree, null, '\t');
}

/*
Time complexity:
O(m). A total of m nodes need to be traversed.
Here, m represents the number of overlapping nodes between the two trees.

Space complexity:
O(m). The depth of the recursion tree can go upto m in the case of a skewed tree.
In average case, depth will be O(log m).
*/
function mergeTreesRecursive(tree1, tree2) {
    if (tree1 == null && tree2 == null) {
        return null;
    }

    if (tree1 == null) {
        return tree2;
    }

    if (tree2 == null) {
        return tree1;
    }

    return node(
        tree1.val + tree2.val,
        mergeTreesRecursive(tree1.left, tree2.left),
        mergeTreesRecursive(tree1.right, tree2.right)
    );
}

function mergeTreesIterative(tree1, tree2) {
    const stack = [[tree1, tree2]];
    while (stack.length > 0) {
        const [t1, t2] = stack.pop();

        if (t2 == null) {
            continue;
        }

        t1.val = t1.val + t2.val;

        if (t1.left == null) {
            t1.left = t2.left;
        } else {
            stack.push([t1.left, t2.left]);
        }

        if (t1.right == null) {
            t1.right = t2.right;
        } else {
            stack.push([t1.right, t2.right]);
        }
    }
    return tree1;
}

describe('Merge Two Binary Trees', () => {
    describe('Recursive solution', () => {
        it('one', () => {
            const tree1 = buildTree([1, 3, 2, 6]);
            const tree2 = buildTree([2, 1, 3, null, 4, null, 7]);
            const result = buildTree([3, 4, 5, 6, 4, null, 7]);
            // console.log(`Tree1:\n${stringify(tree1)}`);
            // console.log(`Tree2:\n${stringify(tree2)}`);
            expect(mergeTreesRecursive(tree1, tree2)).toEqual(result);
        });
    });

    describe('Iterative solution', () => {
        const tree1 = buildTree([1, 3, 2, 6]);
        const tree2 = buildTree([2, 1, 3, null, 4, null, 7]);
        const result = buildTree([3, 4, 5, 6, 4, null, 7]);
        expect(mergeTreesIterative(tree1, tree2)).toEqual(result);
    });
});
