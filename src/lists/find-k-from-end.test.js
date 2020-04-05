// https://codingfreak.blogspot.com/2012/11/finding-nth-node-from-end-of-singly-linked-list.html
// Finding Kth node from end of a Singly Linked List

const { buildList, lToS } = require('./list-tools');

function findKFromEnd(head, k) {
    let size = 0;
    let cur = head;

    while (cur) {
        cur = cur.next;
        size += 1;
    }

    if (size - 1 - k < 0) {
        return null;
    }

    if (size - 1 - k === 0) {
        return head.val;
    }

    cur = head;
    for (let i = 0; i < size - 1 - k; i++) {
        cur = cur.next;
    }

    return cur.val;
}

function findKFromEnd2(head, k) {
    let counter = k;
    let kThPtr = head;
    let cur = head;

    while (counter > 0 && cur && cur.next) {
        cur = cur.next;
        counter--;
    }

    if (counter > 0) {
        return null;
    }
    // console.log('counter:', counter);

    while (cur && cur.next) {
        cur = cur.next;
        kThPtr = kThPtr.next;
    }

    return kThPtr.val;
}

let list1 = buildList([1, 2, 3, 4, 5]);
console.log('0th', findKFromEnd(list1, 0));
console.log('1th', findKFromEnd(list1, 1));
console.log('2th', findKFromEnd(list1, 2));
console.log('4th', findKFromEnd(list1, 4));
console.log('5th', findKFromEnd(list1, 5));

console.log('\nVariant 2');
console.log('0th', findKFromEnd2(list1, 0));
console.log('1th', findKFromEnd2(list1, 1));
console.log('2th', findKFromEnd2(list1, 2));
console.log('4th', findKFromEnd2(list1, 4));
console.log('5th', findKFromEnd2(list1, 5));
