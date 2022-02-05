class TrieNode {
    constructor() {
        this.children = new Map();
        this.parent = null;
        this.isEnd = false;
    }

    isLeaf() {
        return this.children.size === 0;
    }

    put(ch, node) {
        this.children.set(ch, node);
        node.parent = this;
    }

    has(ch) {
        return this.children.has(ch);
    }

    remove(ch) {
        return this.children.delete(ch);
    }

    get(ch) {
        return this.children.get(ch);
    }
}
exports.Trie = class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.has(word[i])) {
                node.put(word[i], new TrieNode());
            }
            node = node.get(word[i]);
        }
        node.isEnd = true;
    }

    _searchPrefix(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.has(word[i])) {
                return null;
            }
            node = node.get(word[i]);
        }

        return node;
    }

    search(word) {
        const node = this._searchPrefix(word);
        return node && node.isEnd;
    }

    startsWith(word) {
        const node = this._searchPrefix(word);
        return node != null;
    }

    remove(word) {
        // traverse tree ch by ch until prefix is ended
        // if ch is not found return false;
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.has(word[i])) {
                return false;
            }
            node = node.get(word[i]);
        }
        // if prefix found check that it is a whole word
        // if not return false
        if (!node.isEnd) {
            return false;
        }

        // if word found
        //      node.isEnd = false;
        node.isEnd = false;
        //  if last node is not leaf then
        //      return true;
        if (!node.isLeaf()) {
            return true;
        }

        // if last node is leaf then
        //         remove nodes up to the tree until curNode is Root || is Leaf || isEnd
        // return true;
        for (let i = word.length - 1; i >= 0; i--) {
            if (!node.parent || !node.isLeaf() || node.isEnd) {
                break;
            }
            node.parent.remove(word[i]);
            node = node.parent;
        }
        return true;
    }

    forEach(cb) {
        function traverse(word, node) {
            if (node.isEnd) {
                cb(word);
            }

            node.children.forEach((child, char) => {
                traverse(word + char, child);
            });
        }

        traverse('', this.root);
    }

    toArray() {
        const words = [];
        this.forEach(word => {
            words.push(word);
        });

        return words;
    }
};
