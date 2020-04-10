// How would you design a stack which, in
// addition to push and pop, also has a function min which
// returns the minimum element? Push, pop and min should all operate in O(1) time.

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

class MinStack {
    constructor() {
        this.data = new Stack();
        this.mins = new Stack();
        this._min = Infinity;
    }

    pop() {
        const result = this.data.pop();
        if (result === this.mins.peek()) {
            this.mins.pop();
        }
        return result;
    }

    push(val) {
        if (val <= this._min) {
            this._min = val;
            this.mins.push(val);
        }
        this.data.push(val);
    }

    min() {
        return this.mins.peek();
    }
}

describe('Stack with min', () => {
    const stack = new MinStack();

    it('push 5', () => {
        stack.push(5);
        expect(stack.min()).toBe(5);
    });

    it('push 3', () => {
        stack.push(3);
        expect(stack.min()).toBe(3);
    });

    it('push 2', () => {
        stack.push(2);
        expect(stack.min()).toBe(2);
        stack.push(2);
        expect(stack.min()).toBe(2);
    });

    it('push 1', () => {
        stack.push(1);
        expect(stack.min()).toBe(1);
    });

    it('push 4', () => {
        stack.push(4);
        expect(stack.min()).toBe(1);
    });

    it('pop 4', () => {
        stack.pop();
        expect(stack.min()).toBe(1);
    });

    it('pop 1', () => {
        stack.pop();
        expect(stack.min()).toBe(2);
    });

    it('pop 2(1)', () => {
        stack.pop();
        expect(stack.min()).toBe(2);
    });

    it('pop 2(2)', () => {
        stack.pop();
        expect(stack.min()).toBe(3);
    });

    it('pop 3', () => {
        stack.pop();
        expect(stack.min()).toBe(5);
    });

    it('pop 5', () => {
        stack.pop();
        expect(stack.min()).toBe(undefined);
    });
});
