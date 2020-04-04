const { Node, buildList, lToA, lToS } = require('./list-tools');

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

// 1 -> 2 -> 3 -> 4 -> 5 -> 6
//           ^ -------------|

function detectLoop(head) {
    let slow = head;
    let fast = head;
    let i = 0;
    while (fast && fast.next) {
        // console.log('fast:', fast.val);
        // console.log('slow:', slow.val);

        fast = fast.next;
        if (slow === fast) {
            // console.log('fast:', fast.val);
            // console.log('slow:', slow.val);
            return true;
        }
        fast = fast.next;
        slow = slow.next;

        if (slow === fast) {
            // console.log('fast:', fast.val);
            // console.log('slow:', slow.val);
            return true;
        }
        i++;
        if (i > 100) {
            return;
        }
    }

    return false;
}

const list1 = buildListWithLoop([1, 2, 3, 4, 5, 6], 2);
detectLoop(list1);

// const describe = () => {};
describe('Find linked list middle', function() {
    const list1 = buildListWithLoop([1, 2, 3, 4, 5], 2);
    const list2 = buildList([1, 2, 3, 4, 5, 6]);
    const list3 = buildListWithLoop([1, 2, 3], 0);
    const list4 = buildListWithLoop([1, 2, 3], 2);

    it('Has loop', () => {
        expect(detectLoop(list1)).toBe(true);
    });

    it('No loop', () => {
        expect(detectLoop(list2)).toBe(false);
    });

    it('Has full loop', () => {
        expect(detectLoop(list3)).toBe(true);
    });

    it('Has loop in last item', () => {
        expect(detectLoop(list4)).toBe(true);
    });
});
