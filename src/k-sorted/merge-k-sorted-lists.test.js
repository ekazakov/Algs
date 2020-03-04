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
    let head = null;
    let cur1 = list1.next;
    let cur2 = list2.next;

    if (list1.val < list2.val) {
        head = list1;
        cur1 = list1.next;
        cur2 = list2;
    } else {
        head = list2;
        cur2 = list2.next;
        cur1 = list1;
    }

    let pointer = head;

    while (cur1 || cur2) {
        if (cur1 == null) {
            pointer.next = cur2;
            cur2 = cur2.next;
        } else if (cur2 == null) {
            pointer.next = cur1;
            cur1 = cur1.next;
        } else if (cur1.val < cur2.val) {
            pointer.next = cur1;
            cur1 = cur1.next;
        } else {
            pointer.next = cur2;
            cur2 = cur2.next;
        }

        pointer = pointer.next;
    }

    return head;
}

describe('Merge Two sorted lists', () => {
    it('one', () => {
        const list1 = buildList([1, 3, 4]);
        const list2 = buildList([2, 5, 8]);
        const result = buildList([1, 2, 3, 4, 5, 8]);
        expect(mergeLists(list1, list2)).toEqual(result);
        // console.log('list:', listToString(list));
    });
});
