function createNode(value) {
    return {
        value,
        next: null,
        prev: null
    };
}

class OrderedMap {
    constructor() {
        this.map = new Map();
        this.head = createNode(null);
        this.tail = createNode(null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    insertNode(node) {}

    removeNode(node) {}

    set(key, value) {}

    get(key) {}

    unshift() {}
}
