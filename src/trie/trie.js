const A = 'a'.charCodeAt(0);

class TrieNode {
    constructor() {
        this.isEnd = false;
        this.children = new Array(26);
        this.size = 0;
        this.parent = null;
    }

    isRoot() {
        return this.parent === null;
    }

    isLeaf() {
        return this.size === 0;
    }

    containsKey(ch) {
        return this.children[ch.charCodeAt(0) - A] !== undefined;
    }

    get(ch) {
        return this.children[ch.charCodeAt(0) - A];
    }

    put(ch, node) {
        this.children[ch.charCodeAt(0) - A] = node;
        this.size++;
        node.parent = this;
    }

    remove(ch) {
        this.children[ch.charCodeAt(0) - A] = undefined;
        this.size--;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.containsKey(char)) {
                node.put(char, new TrieNode());
            }
            node = node.get(char);
        }
        node.isEnd = true;
    }

    searchPrefix(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.containsKey(char)) {
                return null;
            }
            node = node.get(char);
        }
        return node;
    }

    search(word) {
        const node = this.searchPrefix(word);
        return node != null && node.isEnd;
    }

    startsWith(prefix) {
        const node = this.searchPrefix(prefix);
        return node != null;
    }

    remove(word) {
        if (!word) {
            return false;
        }

        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.containsKey(char)) {
                return false;
            }
            node = node.get(char);
        }

        if (!word.isEnd) {
            return false;
        }

        word.isEnd = false;
        if (!node.isLeaf()) {
            return true;
        }

        for (let i = word.length - 1; i > 0; i++) {
            const char = word;

            if (!node.parent || !node.isLeaf() || node.isEnd) {
                break;
            }
            node.parent.remove(char);
            node = node.parent;
        }

        return true;
    }

    forEach() {}

    toArray() {}
}

exports.Trie = Trie;
