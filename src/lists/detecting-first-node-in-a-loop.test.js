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

    // console.log('loopStart:', loopStart);
    current.next = loopStart;

    return head;
};

function detectLoopStart1(head) {
    let slow = head;
    let fast = head;
    let start = head;

    while (fast && fast.next) {
        fast = fast.next;

        if (fast === head) {
            return head.val;
        }

        if (slow === fast) {
            break;
        }
        fast = fast.next;
        slow = slow.next;

        if (slow === fast) {
            break;
        }
    }

    while (true) {
        // console.log('slow:', slow.val, 'start:', start.val);
        if (start === slow) {
            return start.val;
        }

        if (slow === fast) {
            slow = slow.next;
            start = start.next;
        }

        // console.log('slow:', slow.val, 'start:', start.val);
        if (start === slow) {
            return start.val;
        }
        slow = slow.next;
    }
}
// A is the distance from head to loop start
// B is the point where slow and fast meet
// L is the loop length
// C is the (L - B)
// Distance travelled by slowPointer = A+B
// Distance travelled by fastPointer= (A+B+C) + B = A+2B+C
// Let speed of slow pointer be X , so speed of fast pointer will be 2*X
// As per simple distance speed, time relation:
// (A+B)/X=A+2B+C/2*X
// 2*(A+B)=A+2B+C
// 2A+2B=A+2B+C
// A=C
// Hence if we set slowPointer to head and move both slowPointer and fastpointer by one node, they will meet at start node of loop.
function detectLoopStart2(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        // не делаю промежуточной проверки для fast и slow специально
        // иначе если указатели остановятся точно на начале цикла, то будет
        // неудобно потом его детектить
        fast = fast.next.next;
        slow = slow.next;

        if (slow === fast) {
            break;
        }
    }

    slow = head;
    while (true) {
        if (fast === slow) {
            return slow.val;
        }

        slow = slow.next;
        fast = fast.next;
    }
}

// const list1 = buildListWithLoop([1, 2, 3, 4, 5, 6], 2);
// detectLoop(list1);

// const describe = () => {};
describe('Find first node in a loop', function() {
    describe('Brute force', () => {
        it('One', () => {
            // console.log(list1);
            const list1 = buildListWithLoop([1, 2, 3, 4, 5], 2);
            expect(detectLoopStart1(list1)).toBe(3);
        });

        it('Two', () => {
            const list3 = buildListWithLoop([1, 2, 3], 0);
            expect(detectLoopStart1(list3)).toBe(1);
        });

        it('Three', () => {
            const list4 = buildListWithLoop([1, 2, 3], 2);
            expect(detectLoopStart1(list4)).toBe(3);
        });
    });

    describe('Optimal', () => {
        it('One', () => {
            // console.log(list1);
            const list1 = buildListWithLoop([1, 2, 3, 4, 5], 2);
            expect(detectLoopStart2(list1)).toBe(3);
        });

        it('Two', () => {
            const list3 = buildListWithLoop([1, 2, 3], 0);
            expect(detectLoopStart2(list3)).toBe(1);
        });

        it('Three', () => {
            const list4 = buildListWithLoop([1, 2, 3], 2);
            expect(detectLoopStart2(list4)).toBe(3);
        });
    });
});
