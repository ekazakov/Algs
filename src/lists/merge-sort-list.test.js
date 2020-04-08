// https://www.geeksforgeeks.org/merge-sort-for-linked-list/
const { Node, buildList, lToS } = require('./list-tools');

function getMiddle(head) {
    if (!head) {
        return head;
    }

    let fast = head;
    let middle = head;

    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        middle = middle.next;
    }

    return middle;
}

function merge(l1, l2) {
    let dummy = new Node();
    let tail = dummy;
    let p1 = l1;
    let p2 = l2;

    while (p1 && p2) {
        if (p1.val < p2.val) {
            tail.next = p1;
            p1 = p1.next;
        } else {
            tail.next = p2;
            p2 = p2.next;
        }

        tail = tail.next;
    }

    if (p1) {
        tail.next = p1;
    }

    if (p2) {
        tail.next = p2;
    }

    return dummy.next;
}

function mergeSort(head) {
    if (!head || !head.next) {
        return head;
    }

    function _helper(head) {
        if (!head || !head.next) {
            return head;
        }
        const middle = getMiddle(head);
        const l1 = head;
        const l2 = middle.next;
        middle.next = null;

        const sl1 = _helper(l1);
        const sl2 = _helper(l2);

        return merge(sl1, sl2);
    }

    return _helper(head);
}

console.log('getMiddle([1])', getMiddle(buildList([1])));
console.log('getMiddle([1,2])', getMiddle(buildList([1, 2])));
console.log('getMiddle([1,2,3])', getMiddle(buildList([1, 2, 3])));
console.log('getMiddle([1,2,3,4])', getMiddle(buildList([1, 2, 3, 4])));
console.log('merge([1,3],[2,4,5])', lToS(merge(buildList([1, 3]), buildList([2, 4, 5]))));

const list1 = buildList([5, 4, 3, 2, 1, 0]);
console.log('mergeSort for', lToS(list1), '\n::', lToS(mergeSort(list1)));

const list2 = buildList([2, 4, 3, 6, 1, 0, 5]);
console.log('mergeSort for', lToS(list2), '\n::', lToS(mergeSort(list2)));

const list3 = buildList([0, 1, 2, 3, 4, 5, 6]);
console.log('mergeSort for', lToS(list3), '\n::', lToS(mergeSort(list3)));

const list4 = buildList([1]);
console.log('mergeSort for', lToS(list4), '\n::', lToS(mergeSort(list4)));

const list5 = buildList([3, 1]);
console.log('mergeSort for', lToS(list5), '\n::', lToS(mergeSort(list5)));

const list6 = buildList([4, 2, 5]);
console.log('mergeSort for', lToS(list6), '\n::', lToS(mergeSort(list6)));

const list7 = buildList([]);
console.log('mergeSort for', lToS(list7), '\n::', lToS(mergeSort(list7)));
