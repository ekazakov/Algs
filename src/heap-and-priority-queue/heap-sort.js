function createBinaryHeap(data) {
    let size = data.length;

    function getLeftChild(index) {
        const lIndex = index * 2 + 1;
        if (lIndex < size) {
            return data[lIndex];
        }

        return null;
    }

    function getRightChild(index) {
        const rIndex = index * 2 + 2;
        if (rIndex < size) {
            return data[rIndex];
        }

        return null;
    }

    function maxChildIndex(index) {
        const left = getLeftChild(index);
        const right = getRightChild(index);

        if (left == null && right == null) {
            return -1;
        }

        if (left != null && right != null) {
            if (left > right) {
                return index * 2 + 1;
            }

            return index * 2 + 2;
        }

        if (left == null) {
            return index * 2 + 2;
        }

        return index * 2 + 1;
    }

    function percolateDown(index) {
        let currentIndex = index;
        while (currentIndex < size) {
            const maxIndex = maxChildIndex(currentIndex);
            // console.log('currentIndex:', currentIndex, 'maxIndex:', maxIndex);
            // console.log('data[currentIndex]:', data[currentIndex], 'data[maxIndex]:', data[maxIndex]);
            if (maxIndex === -1 || data[currentIndex] >= data[maxIndex]) {
                break;
            }

            const tmp = data[currentIndex];
            data[currentIndex] = data[maxIndex];
            data[maxIndex] = tmp;
            currentIndex = maxIndex;
        }
    }

    const getData = () => {
        return data;
    };

    const removeTop = () => {
        if (size > 0) {
            const result = data[0];
            data[0] = data[size - 1];
            size -= 1;
            heapify(0);

            return result;
        }

        return null;
    };

    const heapify = () => {
        let i = Math.floor(data.length / 2);
        while (i >= 0) {
            percolateDown(i);
            i--;
        }
    };

    heapify();

    return {
        getData,
        removeTop,
        heapify
    };
}

function heapSort(data) {
    const bh = createBinaryHeap(data);

    for (let i = data.length - 1; i >= 0; i--) {
        const item = bh.removeTop();
        data[i] = item;
    }

    return data;
}

/*
          5                 1
       /    \            /    \
      2     1           2     4
    /  \   / \   =>   /  \   / \
   7   8  11  4      7   8  11  5
 /                 /
9                 9
*/
const input1 = [5, 2, 1, 7, 8, 11, 4, 9];
const bh = createBinaryHeap([...input1]);
bh.heapify();

// console.log(input1, '->', bh.getData());
console.log('sort', input1, '=>', heapSort(input1));
