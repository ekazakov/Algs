const { Node, buildList, lToA, lToS } = require('./list-tools');

function insertItem(head, index, item) {
    let cur = head;
    let i = 0;

    if (i === index) {
        return lToS(new Node(item, head));
    }

    while (cur) {
        if (i + 1 === index) {
            const next = cur.next;
            cur.next = new Node(item, next);
        }
        i++;
        cur = cur.next;
    }

    return lToS(head);
}

let list1 = buildList([1, 2, 3]);
console.log(`${lToS(list1)} insert at ${0}:`, insertItem(list1, 0, 'x'));
list1 = buildList([1, 2, 3]);
console.log(`${lToS(list1)} insert at ${1}:`, insertItem(list1, 1, 'x'));
list1 = buildList([1, 2, 3]);
console.log(`${lToS(list1)} insert at ${2}:`, insertItem(list1, 2, 'x'));
list1 = buildList([1, 2, 3]);
console.log(`${lToS(list1)} insert at ${3}:`, insertItem(list1, 3, 'x'));

function removeItem(head, item) {
    let cur = head;
    let prev = null;
    while (cur) {
        if (cur.val === item) {
            if (cur === head) {
                return lToS(head.next);
            } else {
                prev.next = cur.next;
                return lToS(head);
            }
        }

        prev = cur;
        cur = cur.next;
    }

    return lToS(head);
}

let list2 = buildList([1, 2, 3, 4]);
console.log(`${lToS(list2)} remove ${1}:`, removeItem(list2, 1));
list2 = buildList([1, 2, 3, 4]);
console.log(`${lToS(list2)} remove ${2}:`, removeItem(list2, 2));
list2 = buildList([1, 2, 3, 4]);
console.log(`${lToS(list2)} remove ${3}:`, removeItem(list2, 3));
list2 = buildList([1, 2, 3, 4]);
console.log(`${lToS(list2)} remove ${4}:`, removeItem(list2, 4));

function revertList(head) {
    let newHead = null;
    let forward = head;
    let prev = null;

    while (forward) {
        newHead = forward;
        forward = forward.next;
        newHead.next = prev;
        prev = newHead;
    }

    return lToS(newHead);
}

const list3 = buildList([1, 2, 3, 4]);
console.log(revertList(list3));
