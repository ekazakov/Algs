// You have two numbers represented by a linked list,
// where each node contains a single digit. The digits are stored
// in reverse order, such that the 1'st digit is at the head of the list.
// Write a function that adds the two numbers and returns the sum as a
// linked list.

// EXAMPLE
// Input:(7-> 1 -> 6) + (5 -> 9 -> 2).That is, 617 + 295.
// Output: 2 -> 1 -> 9.That is, 912.

// FOLLOW UP
// Suppose the digits are stored in forward order. Repeat the above problem.
// EXAMPLE
// Input:(6 -> 1 -> 7) + (2 -> 9 -> 5) .That is, 617 + 295.
// Output: 9 -> 1 -> 2. That is, 912.

const { Node, buildList, lToS } = require('./list-tools');

function add(l1, l2) {
    let ptr1 = l1;
    let ptr2 = l2;
    let sumPtr = null;
    let sumPtrHead = null;
    let carry = 0;

    if (!ptr1 || !ptr2) {
        return ptr1 || ptr2;
    }

    // console.log('prev carry:', carry);
    // console.log('sum:', sum, 'carry:', carry, 'digit:', digit);
    while (ptr1 || ptr2) {
        let sum = carry;

        if (ptr1) {
            sum += ptr1.val;
            ptr1 = ptr1.next;
        }

        if (ptr2) {
            sum += ptr2.val;
            ptr2 = ptr2.next;
        }
        const digit = sum % 10;
        carry = (sum - digit) / 10;

        if (!sumPtrHead) {
            sumPtrHead = new Node(digit);
            sumPtr = sumPtrHead;
        } else {
            sumPtr.next = new Node(digit);
            sumPtr = sumPtr.next;
        }
    }

    if (carry > 0) {
        sumPtr.next = new Node(carry);
    }

    return lToS(sumPtrHead);
}

function padList(l1, l2) {}

function len(head) {
    let ptr = head;
    let length = 0;

    while (ptr) {
        length++;
        ptr = ptr.next;
    }

    // console.log('len:', length);
    return length;
}

// https://leetcode.com/problems/add-two-numbers-ii
// You are given two non-empty linked lists representing two non-negative integers.
// The most significant digit comes first and each of their nodes contain a single
// digit. Add the two numbers and return it as a linked list.
//
// You may assume the two numbers do not contain any leading zero,
// except the number 0 itself.
//
// Follow up:
// What if you cannot modify the input lists? In other words,
// reversing the lists is not allowed.
//
// Example:
//
// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 8 -> 0 -> 7

function add2(l1, l2) {
    const len1 = len(l1);
    const len2 = len(l2);
    const df = Math.abs(len1 - len2);

    function calcCarryAndRem(val) {
        if (val >= 10) {
            return { carry: 1, rem: val - 10 };
        }
        return { carry: 0, rem: val };
    }

    function _helper(ptr1, ptr2, diff) {
        let node = null;
        let val = 0;

        if (ptr1.next == null && ptr2.next == null) {
            val = ptr1.val + ptr2.val;
            return new Node(val, null);
        }

        if (diff === 0) {
            node = _helper(ptr1.next, ptr2.next, 0);
            val = ptr1.val + ptr2.val;
        } else if (len1 > len2) {
            node = _helper(ptr1.next, ptr2, diff - 1);
            val = ptr1.val;
        } else {
            node = _helper(ptr1, ptr2.next, diff - 1);
            val = ptr2.val;
        }

        const { rem, carry } = calcCarryAndRem(node.val);
        node.val = rem;
        val += carry;

        return new Node(val, node);
    }

    let head = _helper(l1, l2, df);
    if (head.val >= 10) {
        const { rem, carry } = calcCarryAndRem(head.val);
        head.val = rem;
        const newHead = new Node(carry, head);
        return lToS(newHead);
    }
    return lToS(head);
}

const list1 = buildList([1, 1, 1, 1]);
// prettier-ignore
const list2 = buildList(     [ 9, 9, 9, 9]);

console.log('1111 + 999', add2(list1, list2));

const describe = () => {};
describe('Sum numbers as lists', function() {
    describe('Digits in reverse order', function() {
        it('one', () => {
            const list1 = buildList([7, 1, 6]);
            const list2 = buildList([5, 9, 2]);

            expect(add(list1, list2)).toEqual('2 -> 1 -> 9');
        });

        it('two', () => {
            const list1 = buildList([1]);
            const list2 = buildList([2]);

            expect(add(list1, list2)).toEqual('3');
        });

        it('three', () => {
            const list1 = buildList([9]);
            const list2 = buildList([9]);

            expect(add(list1, list2)).toEqual('8 -> 1');
        });

        it('four', () => {
            const list1 = buildList([9, 9, 9]);
            const list2 = buildList([3, 3, 3]);

            expect(add(list1, list2)).toEqual('2 -> 3 -> 3 -> 1');
        });

        it('five', () => {
            const list1 = buildList([9, 9, 9]);
            const list2 = buildList([3, 3]);

            expect(add(list1, list2)).toEqual('2 -> 3 -> 0 -> 1');
        });

        it('six', () => {
            const list1 = buildList([]);
            const list2 = buildList([]);

            expect(add(list1, list2)).toEqual(null);
        });
    });

    describe.skip('Digits in normal order', function() {});
});
