function Node(val, next = null) {
    this.val = val;
    this.next = next;
}

function buildList(items) {
    if (!items || items.length === 0) {
        return null;
    }

    let head = new Node(items[0]);
    let current = head;

    for (let i = 1; i < items.length; i++) {
        current.next = new Node(items[i]);
        current = current.next;
    }

    return head;
}

function lToA(head) {
    const arr = [head.val];
    let current = head;
    while (current.next != null) {
        current = current.next;
        arr.push(current.val);
    }

    return arr;
}

function lToS(head) {
    return lToA(head).join(' -> ');
}

module.exports = {
    Node,
    buildList,
    lToA,
    lToS
};
