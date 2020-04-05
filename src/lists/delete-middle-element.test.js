const { buildList, lToS } = require('./list-tools');
// Implement an algorithm to delete a node in the middle
// of a singly linked list, given only access to that node.
//    EXAMPLE
// Input: the node c from the linked list a->b->c->d->e
// Result: nothing is returned, but the new linked list
// looks like a->b->d->e

function deleteNode(node) {
    if (!node || !node.next) {
        return;
    }

    node.val = node.next.val;
    node.next = node.next.next;
}

const list1 = buildList([1, 2, 3, 4, 5]);
const node1 = list1.next.next;
const before1 = lToS(list1);
deleteNode(node1);
const after1 = lToS(list1);
console.log(before1, ' remove 3::', after1);

const list2 = buildList([1, 2, 3, 4, 5]);
const node2 = list2;
const before2 = lToS(list2);
deleteNode(node2);
const after2 = lToS(list2);
console.log(before2, 'remove 1::', after2);
