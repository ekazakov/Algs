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

function listToArray(head) {
    const arr = [head.val];
    let current = head;
    while (current.next != null) {
        current = current.next;
        arr.push(current.val);
    }

    return arr;
}

// A -> B -> C -> D -> E
function revertList(list) {
    let previous = null;
    let current = null;
    let forwarding = list;

    while (forwarding != null) {
        // console.log('previous:', previous);
        current = forwarding;
        forwarding = forwarding.next;
        current.next = previous;
        // console.log('current:', current);
        previous = current;

        // console.log('forwarding:', forwarding);
    }

    return current;
}

describe('Revert Linked List', () => {
    it('one', () => {
        const list = buildList([1, 2, 3, 4, 5, 6]);
        const expected = [6, 5, 4, 3, 2, 1];
        const result = listToArray(revertList(list));

        expect(result).toEqual(expected);
    });

    it('two', () => {
        const list = buildList([1, 2]);
        const expected = [2, 1];
        const result = listToArray(revertList(list));

        expect(result).toEqual(expected);
    });

    it('three', () => {
        const list = buildList([1]);
        const expected = [1];
        const result = listToArray(revertList(list));

        expect(result).toEqual(expected);
    });

});
