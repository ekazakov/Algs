function MaxPriorityQueue(capacity) {
    let size = 0;
    const queue = new Array(capacity + 1);
    const less = (i, j) => queue[i] < queue[j];
    const exch = (i, j) => {
        const tmp = queue[i];
        queue[i] = queue[j];
        queue[j] = tmp;
    };

    const percolateUp = k => {
        let i = Math.floor(k / 2);
        while (k > 1 && less(i, k)) {
            exch(i, k);
            k = i;
            i = Math.floor(k / 2);
        }
    };

    const percolateDown = k => {
        while (2 * k <= size) {
            let i = 2 * k;
            if (i < size && less(i, i + 1)) i++;
            if (!less(k, i)) break;
            exch(i, k);
            k = i;
        }
    };

    const insert = item => {
        size++;
        queue[size] = item;
        percolateUp(size);
    };
    const delMax = () => {
        const max = queue[1];
        exch(1, size);
        queue[size] = null;
        size--;
        percolateDown(1);
        return max;
    };
    const isEmpty = () => queue.length === 0;

    return {
        percolateUp,
        percolateDown,
        insert,
        delMax,
        isEmpty,
        getSize: () => size
    };
}

exports.MaxPriorityQueue = MaxPriorityQueue;
