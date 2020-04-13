// https://runestone.academy/runestone/books/published/pythonds/Trees/SearchTreeImplementation.html
const node = ({ key, val, left, right, parent } = {}) => ({
    key,
    val,
    left,
    right,
    parent
});

const isLeftChild = node => node.parent && node.parent.left === node;
const isRightChild = node => node.parent && node.parent.right === node;
const isRoot = node => !node.parent;
const isLeaf = node => !node.left && !node.right;
const hasAnyChildren = node => node.left || node.right;
const hasBothChildren = node => node.left && node.right;
const replaceNodeData = ({ node, key, val, left, right }) => {
    node.key = key;
    node.val = val;
    node.left = left;
    node.right = right;
    if (node.left) {
        node.left.parent = node;
    }

    if (node.right) {
        node.right.parent = node;
    }
};

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    put(key, val) {
        const _put = (key, val, current) => {
            if (current.key > key) {
                if (current.left) {
                    _put(key, val, current.left);
                } else {
                    current.left = node({ key, val, parent: current });
                }
            } else {
                if (current.right) {
                    _put(key, val, current.right);
                } else {
                    current.right = node({ key, val, parent: current });
                }
            }
        };

        if (this.root) {
            _put(key, val, this.root);
        } else {
            this.root = node({ key, val });
        }
        this.size += 1;
    }

    get(key) {
        const _get = (key, current) => {
            if (!current) {
                return null;
            }

            if (current.key === key) {
                return current;
            }

            if (key > current.key) {
                return _get(key, current.right);
            }

            return _get(key, current.left);
        };

        if (this.root) {
            const result = _get(key, this.root);
            if (result) {
                return result;
            }
        }

        return null;
    }

    delete(key) {
        if (this.size > 1) {
            const node = this.get(key);
            if (node) {
                this._delete(node);
                this.size -= 1;
            }
        } else if (this.size === 1 && this.root.key === key) {
            this.root = null;
            this.size -= 1;
        }

        return false;
    }

    _delete(current) {
        // console.log('current:', current);
        if (isLeaf(current)) {
            if (isLeftChild(current)) {
                current.parent.left = null;
            } else {
                current.parent.right = null;
            }
        } else if (hasBothChildren(current)) {
            const successor = this.findSuccessor(current);
            console.log('succ', successor);
            this.spliceOut(successor);
            current.key = successor.key;
            current.val = successor.val;
        } else if (hasAnyChildren(current)) {
            if (current.left) {
                if (isLeftChild(current)) {
                    current.left.parent = current.parent;
                    current.parent.left = current.left;
                } else if (isRightChild(current)) {
                    current.left.parent = current.parent;
                    current.parent.right = current.left;
                } else {
                    // if node is not a child ==> it is root
                    const node = current.left;
                    const { key, val, left, right } = node;
                    replaceNodeData({ node, key, val, left, right });
                }
            } else {
                if (isLeftChild(current)) {
                    current.right.parent = current.parent;
                    current.parent.left = current.right;
                } else if (isRightChild(current)) {
                    current.right.parent = current.parent;
                    current.parent.right = current.right;
                } else {
                    // if node is not a child ==> it is root
                    const node = current.right;
                    const { key, val, left, right } = node;
                    replaceNodeData({ node, key, val, left, right });
                }
            }
        }
    }

    findSuccessor(node) {
        let successor = null;

        if (node.right) {
            successor = this.findMin(node.right);
        } else if (node.parent) {
            if (isLeftChild(node)) {
                successor = node.parent;
            } else {
                node.parent.right = null;
                successor = this.findSuccessor(node.parent);
                node.parent.right = node;
            }
        }

        return successor;
    }

    findMin(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    spliceOut(node) {
        if (isLeaf(node)) {
            if (isLeftChild(node)) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
        } else if (hasAnyChildren(node)) {
            if (node.left) {
                if (isLeftChild(node)) {
                    node.parent.left = node.left;
                } else {
                    node.parent.right = node.right;
                }
                node.left.parent = node.parent;
            } else {
                if (isLeftChild(node)) {
                    node.parent.left = node.right;
                } else {
                    node.parent.right = node.right;
                }
                node.right.parent = node.parent;
            }
        }
    }
}

function buildTree() {
    const tree = new BinarySearchTree();
    tree.put(17, 17);
    tree.put(5, 5);
    tree.put(2, 2);
    tree.put(11, 11);
    tree.put(16, 16);
    tree.put(9, 9);
    tree.put(7, 7);
    tree.put(8, 8);
    tree.put(25, 25);
    tree.put(35, 35);
    tree.put(29, 29);
    tree.put(38, 38);

    return tree;
}

function stringify(node) {
    const replacer = (key, value) => {
        if (key === 'parent') {
            return undefined;
        }

        return value;
    };
    return JSON.stringify(node, replacer, '  ');
}

if (require.main === module) {
    const tree1 = buildTree();
    tree1.delete(25);
    console.log('tree1.right', stringify(tree1.root.right));
    tree1.delete(5);
    console.log('\n');
    console.log('tree1.left', stringify(tree1.root));
}
