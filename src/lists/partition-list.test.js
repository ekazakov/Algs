// Write code to partition a linked list around a value x,
// such that all nodes less than x come before all nodes
// greater than or equal to x.

const { buildList, lToS } = require('./list-tools');

function partition(head, val) {
    let smallHead = null;
    let small = null;
    let cur = head;
    let prev = null;

    while (cur) {
        if (cur.val < val) {
            const tmp = cur;
            if (!smallHead) {
                small = smallHead = tmp;
            } else {
                small.next = tmp;
                small = tmp;
            }

            if (cur === head) {
                head = head.next;
            } else {
                prev.next = cur.next;
            }
        } else {
            prev = cur;
        }
        cur = cur.next;
    }
    small.next = null;

    console.log('smallHead', lToS(smallHead));
    console.log('head', lToS(head));
    small.next = head;
    console.log('join', lToS(smallHead));
}

let list1 = buildList([1, 4, 6, 3, 4, 2, 3, 0, 5, 6]);

partition(list1, 4);
