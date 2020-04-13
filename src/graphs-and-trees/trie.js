// https://towardsdatascience.com/implementing-a-trie-data-structure-in-python-in-less-than-100-lines-of-code-a877ea23c1a1
const util = require('util');

class TrieNode {
    constructor(char) {
        this.char = char;
        // Is it the last character of the word.`
        this.wordFinished = false;
        // How many times this character appeared in the addition process
        this.counter = 1;
        this.children = {};
    }
}

function add(root, word) {
    let node = root;
    for (const char of word) {
        const child = node.children[char];

        if (child) {
            child.counter += 1;
            node = child;
        } else {
            const newNode = new TrieNode(char);
            node.children[char] = newNode;
            node = newNode;
        }
    }

    node.wordFinished = true;
}

function findPrefix(root, prefix) {
    let node = root;

    if (Object.keys(root.children).length === 0) {
        return 0;
    }

    for (const char of prefix) {
        if (node.children[char]) {
            node = node.children[char];
        } else {
            return 0;
        }
    }

    return node.counter;
}

if (require.main === module) {
    const root = new TrieNode('*');
    add(root, 'hack');
    add(root, 'hacker');
    add(root, 'hackathon');
    add(root, 'ham');
    add(root, 'hammer');
    const opts = { showHidden: false, color: true, depth: 50 };
    // console.log(util.inspect(root, opts));
    console.log('findPrefix(root, hack):', findPrefix(root, 'hack'));
    console.log('findPrefix(root, hackathons):', findPrefix(root, 'hackathons'));
    console.log('findPrefix(root, helm):', findPrefix(root, 'helm'));
    console.log('findPrefix(root, hamm):', findPrefix(root, 'hamm'));
}
