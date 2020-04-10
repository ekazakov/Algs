// Implement a function to check if a binary tree is
// balanced. For the purposes of this question, a balanced
// tree is defined to be a tree such that
// the heights of the two subtrees of any node
// never differ by more than one.

function node(val, left = null, right = null) {
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

function isBalanced(node) {
    function _helper(node) {
        if (!node) {
            return 0;
        }
        const lHeight = _helper(node.left);

        if (lHeight === -1) {
            return -1;
        }

        const rHeight = _helper(node.right);

        if (rHeight === -1) {
            return -1;
        }

        if (Math.abs(lHeight - rHeight) > 1) {
            return -1;
        }
        return Math.max(lHeight, rHeight) + 1;
    }

    return _helper(node) !== -1;
}

describe('Is balanced binary tree', () => {
    it('empty', () => {
        const input = buildTree([]);
        expect(isBalanced(input)).toBe(true);
    });

    it('one node', () => {
        const input = buildTree([1]);
        expect(isBalanced(input)).toBe(true);
    });

    it('only one left node', () => {
        const input = buildTree([1, 2]);
        expect(isBalanced(input)).toBe(true);
    });

    it('small balanced', () => {
        const input = buildTree([1, 2, 3]);
        expect(isBalanced(input)).toBe(true);
    });

    it('medium balanced', () => {
        const input = node(1, node(2, node(4), node(5)), node(3));
        const input1 = node(1, node(2, node(4), node(5)), node(3, null, node(7)));

        expect(isBalanced(input)).toBe(true);
        expect(isBalanced(input1)).toBe(true);
    });

    it('medium unbalanced', () => {
        // prettier-ignore
        const input = node(1,
            node(2,
                node(4,
                    node(6,
                        node(7)
                    )
                ),
                node(5)
            ),
            node(3,
                node(8),
                node(9)
            )
        );
        expect(isBalanced(input)).toBe(false);
    });
});
