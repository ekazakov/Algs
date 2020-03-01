// https://www.programcreek.com/2015/03/leetcode-house-robber-iii-java/
// https://leetcode.com/problems/house-robber-iii/
// House Robber III
/*
The thief has found himself a new place for his thievery again.
There is only one entrance to this area, called the "root."
Besides the root, each house has one and only one parent house.
After a tour, the smart thief realized that "all houses in this
place forms a binary tree". It will automatically contact the police
if two directly-linked houses were broken into on the same night.

Determine the maximum amount of money the thief can rob
tonight without alerting the police.
*/

function node(val, left, right) {
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

/*
Т.к. нельзя заходить в напрямую связанные дома то есть два варианта обхода дерева.
1. Начать обходить с корня и тогда нельзя будет «грабить» дочерние узлы, а только узлы-внуки.
2. Пропустить корень и посещяем дочерние узлы

Комбинируем подходы 1 и 2 и выбираем максимальный результат.
Повторяем алгоритм для каждого посещещаемого поддерева.
 */
function robRecursive(root) {
    if (root === null) {
        return 0;
    }

    let sum = 0;
    if (root.left) {
        sum += robRecursive(root.left.left) + robRecursive(root.left.right);
    }

    if (root.right) {
        sum += robRecursive(root.right.left) + robRecursive(root.right.right);
    }

    return Math.max(root.val + sum, robRecursive(root.left) + robRecursive(root.right));
}

function robRecursiveWithMemo(root, memo = new Map()) {
    if (root === null) {
        return 0;
    }

    if (memo.has(root)) {
        return memo.get(root);
    }

    let sum = 0;

    if (root.left) {
        sum += robRecursive(root.left.left) + robRecursive(root.left.right);
    }

    if (root.right) {
        sum += robRecursive(root.right.left) + robRecursive(root.right.right);
    }


    const result = Math.max(root.val + sum, robRecursive(root.left) + robRecursive(root.right));
    memo.set(root, result);
    return result;
}

function _rob(root) {
    if (root == null) {
        return [0, 0];
    }

    const left = _rob(root.left);
    const right = _rob(root.right);

    return [
        //  when root is selected
        root.val + left[1] + right[1],
        // is when not.
        Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    ];
}

/*

*/
function robOptimal(root) {
    if (root == null) {
        return 0;
    }

    const result = _rob(root);
    // result[0] — sum of traversing from root
    // result[1] — sum of traversing from subtrees
    return Math.max(result[0], result[1]);
}

function toStr(arr) {
    return arr.join(', ');
}

describe('House Robber Three', () => {
    const data1 = [3, 4, 5, 1, 3, null, 1];
    const data2 = [3, 4, 1, 2, 5, 6, 3, 3, 8, null, null, null, null, null, 7];

    describe('Optimal solution', () => {
        it(`one: ${toStr(data1)}`, () => {
            expect(robOptimal(buildTree(data1))).toBe(9);
        });

        it(`two: ${toStr(data2)}`, () => {
            // console.log(JSON.stringify(buildTree(data2), null, '\t'));
            expect(robOptimal(buildTree(data2))).toBe(32);
        });
    });

    describe('Recursive solution', () => {
        it(`one: ${toStr(data1)}`, () => {
            expect(robRecursive(buildTree(data1))).toBe(9);
        });

        it(`two: ${toStr(data2)}`, () => {
            expect(robRecursive(buildTree(data2))).toBe(32);
        });
    });

    describe('Recursive solution with memoization', () => {
        it(`one: ${toStr(data1)}`, () => {
            expect(robRecursiveWithMemo(buildTree(data1))).toBe(9);
        });

        it(`two: ${toStr(data2)}`, () => {
            expect(robRecursiveWithMemo(buildTree(data2))).toBe(32);
        });
    });
});
