const floordiv = (a, b) => Math.floor(a / b);

exports.MaxPriorityQueue = function MaxPriorityQueue() {
    let size = 0;
    const data = [null];

    const less = (i, j) => data[i] < data[j];
    const swap = (i, j) => {
        const tmp = data[i];
        data[i] = data[j];
        data[j] = tmp;
    };

    const percolateUp = k => {
        let i = floordiv(k / 2);
        while (k > 1 && less(i, k)) {
            swap(k, i);
            k = i;
            i = floordiv(k / 2);
        }
    };
    const percolateDown = k => {
        while (2 * k <= size) {
            let j = 2 * k;
            if (j < size && less(j, j + 1)) j++;
            if (less(j, k)) break;
            swap(k, j);
            k = j;
        }
    };

    const insert = (val) => {
        size++;
        data.push(val);
        percolateUp(size);
    };


    const delMax = () => {
        const max = data[1];
        data[1] = data.pop();
        size--;
        percolateDown(1);
        return max;
    };


    return {
        insert,
        delMax,
        getSize() {
            return size;
        }
    };
};
