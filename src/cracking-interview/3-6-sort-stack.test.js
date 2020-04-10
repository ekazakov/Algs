// Write a program to sort a stack in ascending order (with biggest items on top).
// You may use at most one additional stack to hold items, but you may not copy the elements into
// any other data structure (such as an array). The stack supports the following
// operations: push, pop, peek, and isEmpty

class Stack {
    constructor(data = []) {
        this.data = data;
    }

    isEmpty() {
        return this.data.length === 0;
    }

    pop() {
        return this.data.pop();
    }

    push(val) {
        this.data.push(val);
    }

    peek() {
        return this.data[this.data.length - 1];
    }
}

function sortStack(stack) {
    const helper = new Stack();

    if (stack.isEmpty()) {
        return stack;
    }

    helper.push(stack.pop());

    while (!stack.isEmpty()) {
        const tmp = stack.pop();
        while (!helper.isEmpty() && tmp > helper.peek()) {
            stack.push(helper.pop());
        }
        helper.push(tmp);
    }

    while (!helper.isEmpty()) {
        stack.push(helper.pop());
    }

    return stack;
}

describe('Sort stack', function() {
    it('Random', () => {
        const input = new Stack([3, 5, 1, 0, 22, 8, 7, 9, 11, 4]);
        expect(sortStack(input).data).toEqual([0, 1, 3, 4, 5, 7, 8, 9, 11, 22]);
    });

    it('Sorted', () => {
        const input = new Stack([1, 2, 3, 4, 5, 6]);
        expect(sortStack(input).data).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('Reverse', () => {
        const input = new Stack([6, 5, 4, 3, 2, 1]);
        expect(sortStack(input).data).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('Empty', () => {
        const input = new Stack([]);
        expect(sortStack(input).data).toEqual([]);
    });

    it('One item', () => {
        const input = new Stack([1]);
        expect(sortStack(input).data).toEqual([1]);
    });
});
