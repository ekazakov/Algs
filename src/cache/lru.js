class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
// TESTS
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = { prev: null, next: null };
        this.tail = { prev: this.head, next: null };
        this.head.next = this.tail;
    }

    removeNode(node) {
        const nextNode = node.next;
        const prevNode = node.prev;
        node.next = null;
        node.prev = null;
        nextNode.prev = prevNode;
        prevNode.next = nextNode;
    }

    insertNode(node) {
        const prevNode = this.tail.prev;
        prevNode.next = node;
        node.prev = prevNode;
        node.next = this.tail;
        this.tail.prev = node;
    }

    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this.removeNode(node);
            this.insertNode(node);
            return node.value;
        }
        return -1;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            this.removeNode(node);
            this.insertNode(node);
            return;
        }

        if (this.cache.size >= this.capacity) {
            const oldNode = this.head.next;
            this.removeNode(this.head.next);
            this.cache.delete(oldNode.key);
        }

        const node = new Node(key, value);
        this.insertNode(node);
        this.cache.set(key, node);
    }
}
