// You have two very large binary trees: T1, with millions of nodes, and T2, with
// hundreds of nodes. Create an algorithm to decide if T2 is a subtree of T1.
// A tree T2 is a subtree of T1 if there exists a node n in T1 such that the
// subtree of n is identical to T2. That is, if you cut off the tree at node n,
// the two trees would be identical.

// Good analysis in 4.8 exercise of Cracking The Coding Interview (Solutions/Trees and Graphs)
/* T1
             20
         ↙       ↘
      8           22
   ↙   ↘
  4     12
      ↙    ↘
     10     14
   ↙   ↘
  6     9
*/

/* T2
        12
      ↙    ↘
     10     14
   ↙   ↘
  6     9
*/

function node(val, left = null, right = null) {
    return {
        val,
        left,
        right
    };
}

function matchTrees(r1, r2) {
    if (r1 == null && r2 == null) {
        return true;
    }

    if (r1 == null || r2 == null) {
        return false;
    }

    const isEq = r1.val === r2.val;
    return isEq && matchTrees(r1.left, r2.left) && matchTrees(r1.right, r2.right);
}

function findSubTreeRoot(r1, r2) {
    if (!r1) {
        return false;
    }

    if (r1.val === r2.val) {
        if (matchTrees(r1, r2)) {
            return true;
        }
    }

    return findSubTreeRoot(r1.left, r2) || findSubTreeRoot(r1.right, r2);
}

// Good analysis in 4.8 exercise of Cracking The Coding Interview (Solutions/Trees and Graphs)
function isSubTree(r1, r2) {
    if (!r1) {
        return false;
    }

    if (!r2) {
        return true;
    }

    return findSubTreeRoot(r1, r2);
}

describe('Check is tree T2 a subtree of T1 tree ', function() {
    // prettier-ignore
    const t1 = node(20,
        node(8,
            node(4),
            node(12,
                node(10,
                    node(6),
                    node(9)
                ),
                node(14))),
        node(22)
    );
    // prettier-ignore
    const t2 = node(12,
        node(10,
            node(6),
            node(9)
        ),
        node(14)
    );

    it('One matching subtree', () => {
        // prettier-ignore
        const t1 = node(20,
            node(8,
                node(4),
                node(12,
                    node(10,
                        node(6),
                        node(9)
                    ),
                    node(14))),
            node(22)
        );
        // prettier-ignore
        const t2 = node(12,
            node(10,
                node(6),
                node(9)
            ),
            node(14)
        );
        expect(isSubTree(t1, t2)).toBe(true);
    });

    it('Two matching subtrees', () => {
        // prettier-ignore
        const t1 = node(20,
            node(8,
                node(4),
                node(5,
                    null,
                    node(12,
                        node(10,
                            node(6),
                            node(9)
                        ),
                        node(14)))
                ),
            node(22,
                node(12,
                    node(10,
                        node(6),
                        node(9)
                    ),
                    node(14)
                )
            )
        );
        // prettier-ignore
        const t2 = node(12,
            node(10,
                node(6),
                node(9)
            ),
            node(14)
        );
        expect(isSubTree(t1, t2)).toBe(true);
    });

    it('Almost matching subtree', () => {
        // prettier-ignore
        const t1 = node(20,
            node(8,
                node(4),
                node(12,
                    node(10,
                        node(6),
                        node(9)
                    ),
                    node(14,
                        node(9)
                    )
                )
            ),
            node(22)
        );
        // prettier-ignore
        const t2 = node(12,
            node(10,
                node(6),
                node(9)
            ),
            node(14)
        );
        expect(isSubTree(t1, t2)).toBe(false);
    });

    it('No matching subtree', () => {
        // prettier-ignore
        const t1 = node(20,
            node(8,
                node(4),
                node(12,
                    node(10,
                        node(6),
                        node(9)
                    ),
                    node(14)
                )
            ),
            node(22)
        );
        // prettier-ignore
        const t2 = node(43,
            node(10),
            node(14)
        );
        expect(isSubTree(t1, t2)).toBe(false);
    });
});
