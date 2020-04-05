const { Node, buildList } = require('./list-tools');

function revertList(head) {
    let forward = head;
    let newHead = head;
    let prev = null;

    while (forward) {
        newHead = forward;
        forward = forward.next;
        newHead.next = prev;
        prev = newHead;
    }

    return newHead;
}

function isPalindrome(head) {
    let fast = head;
    let middle = head;
    let prev = null;

    if (!head) {
        return false;
    }

    while (fast && fast.next) {
        fast = fast.next.next;
        prev = middle;
        middle = middle.next;
    }

    const head2 = revertList(middle);

    let ptr1 = head;
    let ptr2 = head2;

    while (ptr1 && ptr2) {
        if (ptr1.val !== ptr2.val) {
            return false;
        }
        ptr1 = ptr1.next;
        ptr2 = ptr2.next;
    }

    return true;
}

describe('Calculate length of a loop in a linked list', function() {
    const list1 = buildList([1, 2, 3, 3, 2, 1]);
    const list2 = buildList([1]);
    const list3 = buildList([]);
    const list4 = buildList([1, 2, 3, 2, 1]);
    const list5 = buildList([1, 1]);
    const list6 = buildList([1, 2]);
    const list7 = buildList([1, 2, 3]);

    it('Even palindrome', () => {
        expect(isPalindrome(list1)).toBe(true);
    });

    it('One element', () => {
        expect(isPalindrome(list2)).toBe(true);
    });

    it('Empty list', () => {
        expect(isPalindrome(list3)).toBe(false);
    });

    it('Odd palindrome', () => {
        expect(isPalindrome(list4)).toBe(true);
    });

    it('Even palindrome of size 2', () => {
        expect(isPalindrome(list5)).toBe(true);
    });

    it('No palindrome of size 2', () => {
        expect(isPalindrome(list6)).toBe(false);
    });

    it('No palindrome of size 3', () => {
        expect(isPalindrome(list7)).toBe(false);
    });
});
