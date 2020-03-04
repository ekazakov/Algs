// https://leetcode.com/problems/merge-k-sorted-lists/
/*
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
*/

function Node(val, next = null) {
    this.val = val;
    this.next = next;
}

function buildList(items) {
    let head = new Node(items[0]);
    let current = head;

    for (let i = 1; i < items.length; i++) {
        current.next = new Node(items[i]);
        current = current.next;
    }

    return head;
}

function listToString(head) {
    const arr = [head.val];
    let current = head;
    while (current.next != null) {
        current = current.next;
        arr.push(current.val);
    }

    return arr.join(' -> ');
}

function mergeLists(list1, list2) {
    const head = new Node(0);
    let pointer = head;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            pointer.next = list1;
            list1 = list1.next;
        } else {
            pointer.next = list2;
            list2 = list2.next;
        }

        pointer = pointer.next;
    }

    if (list1) {
        pointer.next = list1;
    } else {
        pointer.next = list2;
    }

    return head.next;
}

describe('Merge Two sorted lists', () => {
    // console.log('list:', listToString(list));
    it('one', () => {
        const list1 = buildList([1, 3, 4]);
        const list2 = buildList([2, 5, 8]);
        const result = buildList([1, 2, 3, 4, 5, 8]);
        expect(mergeLists(list1, list2)).toEqual(result);
    });

    it('two', () => {
        const list1 = buildList([1, 3, 4]);
        const list2 = buildList([5, 8, 9]);
        const result = buildList([1, 3, 4, 5, 8, 9]);
        expect(mergeLists(list1, list2)).toEqual(result);
    });
});

function mergeKSortedLists(lists) {
    return;
}

describe('Merge K sorted lists', () => {
    it('one', () => {
        const lists = [
            buildList([1, 3, 4]),
            buildList([2, 5, 8]),
            buildList([5, 6, 9, 11, 14])
        ];
        const result = buildList([1, 2, 3, 4, 5, 5, 6, 8, 9, 11, 14]);
        expect(mergeKSortedLists(lists)).toEqual(result);
    });
});
