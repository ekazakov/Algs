const { Node, buildList, lToA, lToS } = require('./list-tools');
// Write code to remove duplicates from an unsorted linked list.
// FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?

function removeDuplicate1(head) {
    const map = new Map();
    let cur = head;
    let prev = null;
    while (cur) {
        if (map.has(cur.val)) {
            prev.next = cur.next;
        } else {
            map.set(cur.val, cur);
            prev = cur;
        }
        cur = cur.next;
    }

    return lToS(head);
}

function removeDuplicate2(head) {
    let outer = head;

    while (outer && outer.next) {
        let prev = outer;
        let inner = outer.next;

        while (inner) {
            if (outer.val === inner.val) {
                prev.next = inner.next;
            } else {
                prev = inner;
            }
            inner = inner.next;
        }
        outer = outer.next;
    }

    return lToS(head);
}

const list1 = buildList([1, 2, 3, 2, 4, 5, 3]);
console.log(lToS(list1), ' to ', removeDuplicate1(list1));
const list2 = buildList([1, 2, 3, 2, 4, 5, 3]);
console.log(lToS(list2), ' to ', removeDuplicate2(list2));
const list3 = buildList([1, 1, 1, 2, 3, 2, 4, 2, 5, 3, 3]);
console.log(lToS(list3), ' to ', removeDuplicate2(list3));
const list4 = buildList([1]);
console.log(lToS(list4), ' to ', removeDuplicate2(list4));
const list5 = buildList([1, 1, 1, 1, 1]);
console.log(lToS(list5), ' to ', removeDuplicate2(list5));
