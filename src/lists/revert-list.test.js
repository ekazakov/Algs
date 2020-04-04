const { buildList, lToA } = require('./list-tools');

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
        const result = lToA(revertList(list));

        expect(result).toEqual(expected);
    });

    it('two', () => {
        const list = buildList([1, 2]);
        const expected = [2, 1];
        const result = lToA(revertList(list));

        expect(result).toEqual(expected);
    });

    it('three', () => {
        const list = buildList([1]);
        const expected = [1];
        const result = lToA(revertList(list));

        expect(result).toEqual(expected);
    });
});
