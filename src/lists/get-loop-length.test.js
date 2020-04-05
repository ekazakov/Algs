const { Node, buildList } = require('./list-tools');

const buildListWithLoop = (items, startIndex) => {
    let head = null;
    let current = null;
    let prev = null;
    let loopStart = null;

    for (let i = 0; i < items.length; i++) {
        current = new Node(items[i]);
        if (startIndex === i) {
            loopStart = current;
        }

        if (!head) {
            head = current;
        }
        if (prev) {
            prev.next = current;
        }
        prev = current;
    }

    current.next = loopStart;

    return head;
};

function loopLength(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        if (slow === fast) {
            break;
        }
    }

    if (slow !== fast) {
        return 0;
    }

    let counter = 1;
    slow = slow.next;
    while (slow !== fast) {
        slow = slow.next;
        counter++;
    }

    return counter;
}

describe('Calculate length of a loop in a linked list', function() {
    const list1 = buildListWithLoop([1, 2, 3, 4, 5], 2);
    const list2 = buildList([1, 2, 3, 4, 5, 6]);
    const list3 = buildListWithLoop([1, 2, 3], 0);
    const list4 = buildListWithLoop([1, 2, 3], 2);

    it('Has loop', () => {
        expect(loopLength(list1)).toBe(3);
    });

    it('No loop', () => {
        expect(loopLength(list2)).toBe(0);
    });

    it('Has full loop', () => {
        expect(loopLength(list3)).toBe(3);
    });

    it('Has loop in last item', () => {
        expect(loopLength(list4)).toBe(1);
    });
});
