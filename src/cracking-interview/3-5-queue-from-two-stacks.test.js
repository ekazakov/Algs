// Implement a MyQueue class which implements a queue using two stacks.

class Queue {
    constructor() {
        this.new = [];
        this.old = [];
    }

    enqueue(val) {
        this.new.push(val);
    }

    dequeue() {
        if (this.old.length === 0) {
            while (this.new.length > 0) {
                const tmp = this.new.pop();
                this.old.push(tmp);
            }
        }
        return this.old.pop();
    }
}
// 1, 2, 3 --> 3, 2, 1
