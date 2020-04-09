// Given two Linked Lists, create union and intersection lists that contain union and intersection of the elements
// present in the given lists. Order of elements in output lists doesn’t matter.
//
// Examples:
//
// Input:
//    List1: 10 -> 15 -> 4 ->20
//    lsit2:  8 -> 4 -> 2 -> 10
// Output:
//    Intersection List: 4 -> 10
//    Union List: 2 -> 8 -> 20 -> 4 -> 15 -> 10

// https://www.geeksforgeeks.org/union-intersection-two-linked-lists-set-3-hashing

function intersection1(l1, l2) {
    const map = new Map();
    const head = new Node();
    let tail = head;

    let p1 = l1;
    let p2 = l2;

    while (p1) {
        map.set(p1.val, p1);
        p1 = p1.next;
    }

    while (p2) {
        if (map.has(p2.val)) {
            tail.next = new Node(p2.val);
            tail = tail.next;
        }
        p2 = p2.next;
    }

    return head.next;
}

function union1(l1, l2) {
    const map = new Map();
    const head = new Node();
    let tail = head;

    let p1 = l1;
    let p2 = l2;

    while (p1) {
        map.set(p1.val, p1);
        p1 = p1.next;
    }

    while (p2) {
        map.set(p2.val, p2);
        p2 = p2.next;
    }

    map.forEach(node => {
        tail.next = node;
        tail = tail.next;
    });

    tail.next = null;

    return head.next;
}

// https://www.geeksforgeeks.org/union-intersection-two-linked-lists-set-2-using-merge-sort

const { Node, buildList, lToS, lToA } = require('./list-tools');

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

function intersection2(l1, l2) {
    l1 = mergeSort(l1);
    l2 = mergeSort(l2);

    let p1 = l1;
    let p2 = l2;
    let result = new Node();
    let tail = result;

    while (p1 && p2) {
        if (p1.val === p2.val) {
            tail.next = new Node(p1.val);
            tail = tail.next;
            p1 = p1.next;
            p2 = p2.next;
        } else if (p1.val < p2.val) {
            p1 = p1.next;
        } else {
            p2 = p2.next;
        }
    }

    return result.next;
}

function union2(l1, l2) {
    l1 = mergeSort(l1);
    l2 = mergeSort(l2);

    let p1 = l1;
    let p2 = l2;
    let result = new Node();
    let tail = result;

    while (p1 && p2) {
        if (p1.val === p2.val) {
            tail.next = new Node(p1.val);

            p1 = p1.next;
            p2 = p2.next;
        } else if (p1.val < p2.val) {
            tail.next = new Node(p1.val);
            p1 = p1.next;
        } else if (p1.val > p2.val) {
            tail.next = new Node(p2.val);
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

    return result.next;
}

// 3 4 5
// 1 2 4 5

describe('Union and intersection of two lists', function() {
    describe('Solution with sort O(m*log(m) + n*log(n))', () => {
        describe('Intersection', function() {
            it('[1,2,3,4,8,9] ⋂ [4,6,1,8,10]', () => {
                const l1 = buildList([1, 2, 3, 4, 8, 9]);
                const l2 = buildList([4, 6, 1, 8, 10]);
                expect(lToA(intersection2(l1, l2))).toEqual([1, 4, 8]);
            });

            it('[10, 15, 4, 20] ⋂ [8, 4, 2, 10]', () => {
                const l1 = buildList([10, 15, 4, 20]);
                const l2 = buildList([8, 4, 2, 10]);
                expect(lToA(intersection2(l1, l2))).toEqual([4, 10]);
            });
        });

        describe('Union', () => {
            it('[1,2,3,4,8,9] ⋃ [4,6,1,8,10]', () => {
                const l1 = buildList([1, 2, 3, 4, 8, 9]);
                const l2 = buildList([4, 6, 1, 8, 10]);
                expect(lToA(union2(l1, l2))).toEqual([1, 2, 3, 4, 6, 8, 9, 10]);
            });

            it('[10, 15, 4, 20] ⋃ [8, 4, 2, 10]', () => {
                const l1 = buildList([10, 15, 4, 20]);
                const l2 = buildList([8, 4, 2, 10]);
                expect(lToA(union2(l1, l2))).toEqual([2, 4, 8, 10, 15, 20]);
            });
        });
    });

    describe('Solution with hashing O(m + n) + memory O(n + m)', () => {
        describe('Intersection', function() {
            it('[1,2,3,4,8,9] ⋂ [4,6,1,8,10]', () => {
                const l1 = buildList([1, 2, 3, 4, 8, 9]);
                const l2 = buildList([4, 6, 1, 8, 10]);
                expect(lToA(intersection1(l1, l2))).toEqual([4, 1, 8]);
            });

            it('[10, 15, 4, 20] ⋂ [8, 4, 2, 10]', () => {
                const l1 = buildList([10, 15, 4, 20]);
                const l2 = buildList([8, 4, 2, 10]);
                expect(lToA(intersection1(l1, l2))).toEqual([4, 10]);
            });
        });

        describe('Union', () => {
            it('[1,2,3,4,8,9] ⋃ [4,6,1,8,10]', () => {
                const l1 = buildList([1, 2, 3, 4, 8, 9]);
                const l2 = buildList([4, 6, 1, 8, 10]);
                expect(lToA(union1(l1, l2))).toEqual([1, 2, 3, 4, 8, 9, 6, 10]);
            });

            it('[10, 15, 4, 20] ⋃ [8, 4, 2, 10]', () => {
                const l1 = buildList([10, 15, 4, 20]);
                const l2 = buildList([8, 4, 2, 10]);
                expect(lToA(union1(l1, l2))).toEqual([10, 15, 4, 20, 8, 2]);
            });
        });
    });
});
