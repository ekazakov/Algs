const { buildList } = require('./list-tools');

function findMiddle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    return slow.val;
}

describe('Find linked list middle', function() {
    const list1 = buildList([1, 2, 3, 4, 5]);
    const list2 = buildList([1, 2, 3, 4, 5, 6]);

    it('Odd list', () => {
        expect(findMiddle(list1)).toBe(3);
    });

    it('Event list', () => {
        expect(findMiddle(list2)).toBe(4);
    });
});
