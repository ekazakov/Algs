function node(val, left = null, right = null) {
    return {
        val,
        left,
        right
    };
}

function printIter(node) {
    let current = [node];

    while (current.length > 0) {
        // prettier-ignore
        console.log('current:', current.map(n => n.val));
        const parent = current;
        current = [];

        for (const node of parent) {
            if (node.left) {
                current.push(node.left);
            }
            if (node.right) {
                current.push(node.right);
            }
        }
    }
}

function printRecursive(node) {
    const results = [];

    function print(node, level) {
        if (results.length === level) {
            results.push([node.val]);
        } else {
            results[level].push(node.val);
        }

        if (node.left) {
            print(node.left, level + 1);
        }

        if (node.right) {
            print(node.right, level + 1);
        }
        // console.log('current:', results[results.length - 1]);
    }

    print(node, 0);
    console.log(results);
}

// prettier-ignore
const tree = node(1,
    node(2,
        node(4),
        node(5)),
    node(3,
        node(6,
            node(8, node(9))),
        node(7)
    )
);

// printIter(tree);
printRecursive(tree);
