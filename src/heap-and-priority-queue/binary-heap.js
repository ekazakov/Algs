const floordiv = (val, devider) => Math.floor(val / devider);

// index from zero
class BinaryHeap {
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
        this.data = [...data];
        while (i > 0) {
            this.percolateDown(i);
            i -= 1;
        }
    }

    percolateUp(index) {
        // find parent index
        let parentIndex = floordiv(index - 1, 2);
        while (parentIndex > 0) {
            if (this.data[index] < this.data[parentIndex]) {
                const tmp = this.data[parentIndex];
                this.data[parentIndex] = this.data[index];
                this.data[index] = tmp;
            }
            parentIndex = floordiv(index, 2);
        }
    }

    insert(value) {
        this.data.push(value);
        this.currentSize += 1;
        this.percolateUp(this.currentSize);
    }

    _minChild(index) {
        if (index * 2 + 2 > this.currentSize) {
            return index * 2 + 1;
        }

        if (this.data[index * 2 + 1] < this.data[index * 2 + 2]) {
            return index * 2 + 1;
        }

        return index * 2 + 2;
    }

    percolateDown(index) {
        while (index * 2 + 1 <= this.currentSize) {
            const minChildIndex = this._minChild(index);

            if (this.data[index] > this.data[minChildIndex]) {
                const tmp = this.data[index];
                this.data[index] = this.data[minChildIndex];
                this.data[minChildIndex] = tmp;
            }
            index = minChildIndex;
        }
    }

    delMin() {
        const min = this.data[0];
        this.data[0] = this.data[this.currentSize];
        this.currentSize -= 1;
        this.data.pop();
        this.percolateDown(0);
        return min;
    }

    toString() {
        return `[${this.data.join(', ')}]`;
    }
}

const bh = new BinaryHeap();
const data = [5, 9, 14, 18, 33, 17, 27, 7, 19, 21, 11];
bh.buildHeap(data);

console.log('bhs:', bh.toString());
// const bhTree = buildTree(bh.data);
// console.log('bh', JSON.stringify(bhTree, null, '\t'));
