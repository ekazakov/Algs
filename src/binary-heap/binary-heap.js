const floordiv = (val, devider) => Math.floor(val / devider);

function node(val, left, right) {
    return {
        val,
        left,
        right
    };
}

function buildTree(data, i = 1) {
    const leftIndex = i * 2;
    const rightIndex = i * 2 + 1;

    const left = leftIndex < data.length ? buildTree(data, leftIndex) : null;
    const right = rightIndex < data.length ? buildTree(data, rightIndex) : null;

    return node(data[i], left, right);
}

class BinaryHeap {
    constructor() {
        // real data stored from index 1
        this.data = [0];
        this.currentSize = 0;
    }

    // build the whole heap in 𝑂(𝑛) operations
    buildHeap(data) {
        // we take middle of the tree to start percolating down
        // because all nodes below middle is already leaves
        let i = floordiv(data.length, 2);
        this.currentSize = data.length;
        this.data = [0, ...data];
        while (i > 0) {
            this.percolateDown(i);
            i -= 1;
        }
    }

    percolateUp(index) {
        // find parent index
        let parentIndex = floordiv(index, 2);
        while (parentIndex > 0) {
            if (this.data[index] < this.data[parentIndex]) {
                const tmp = this.data[parentIndex];
                this.data[parentIndex] = this.data[index];
                this.data[index] = tmp;
            }
        }
        parentIndex = floordiv(index, 2);
    }

    insert(value) {
        this.data.push(value);
        this.currentSize += 1;
        this.percolateUp(this.currentSize);
    }

    minChild(index) {
        if (index * 2 + 1 > this.currentSize) {
            return index * 2;
        }

        if (this.data[index * 2] < this.data[index * 2 + 1]) {
            return index * 2;
        }

        return index * 2 + 1;
    }

    percolateDown(index) {
        while (index * 2 <= this.currentSize) {
            const minChildIndex = this.minChild(index);

            if (this.data[index] > this.data[minChildIndex]) {
                const tmp = this.data[index];
                this.data[index] = this.data[minChildIndex];
                this.data[minChildIndex] = tmp;
            }
            index = minChildIndex;
        }
    }

    delMin() {
        const min = this.data[1];
        this.data[1] = this.data[this.currentSize];
        this.currentSize -= 1;
        this.data.pop();
        this.percolateDown(1);
        return min;
    }

    toString() {
        return `[${this.data.slice(1).join(', ')}]`;
    }
}

// index from zero
class BinaryHeap2 {
    constructor() {
        // real data stored from index 1
        this.data = [];
        this.currentSize = 0;
    }

    // build the whole heap in 𝑂(𝑛) operations
    buildHeap(data) {
        // we take middle of the tree to start percolating down
        // because all nodes below middle is already leaves
        let i = floordiv(data.length, 2);
        this.currentSize = data.length;
        this.data = [0, ...data];
        while (i > 0) {
            this.percolateDown(i);
            i -= 1;
        }
    }

    percolateUp(index) {
        // find parent index
        let parentIndex = floordiv(index, 2);
        while (parentIndex > 0) {
            if (this.data[index] < this.data[parentIndex]) {
                const tmp = this.data[parentIndex];
                this.data[parentIndex] = this.data[index];
                this.data[index] = tmp;
            }
        }
        parentIndex = floordiv(index, 2);
    }

    insert(value) {
        this.data.push(value);
        this.currentSize += 1;
        this.percolateUp(this.currentSize);
    }

    minChild(index) {
        if (index * 2 + 1 > this.currentSize) {
            return index * 2;
        }

        if (this.data[index * 2] < this.data[index * 2 + 1]) {
            return index * 2;
        }

        return index * 2 + 1;
    }

    percolateDown(index) {
        while (index * 2 <= this.currentSize) {
            const minChildIndex = this.minChild(index);

            if (this.data[index] > this.data[minChildIndex]) {
                const tmp = this.data[index];
                this.data[index] = this.data[minChildIndex];
                this.data[minChildIndex] = tmp;
            }
            index = minChildIndex;
        }
    }

    delMin() {
        const min = this.data[1];
        this.data[1] = this.data[this.currentSize];
        this.currentSize -= 1;
        this.data.pop();
        this.percolateDown(1);
        return min;
    }

    toString() {
        return `[${this.data.slice(1).join(', ')}]`
    }
}

const bh = new BinaryHeap();
const bh2 = new BinaryHeap2();
const data = [5, 9, 14, 18, 33, 17, 27, 7, 19, 21, 11];
bh.buildHeap(data);
// bh2.buildHeap(data);

console.log('bhs:', bh.toString());
// console.log('bh2:', bh2.toString());
// const bhTree = buildTree(bh.data);
// console.log('bh', JSON.stringify(bhTree, null, '\t'));
