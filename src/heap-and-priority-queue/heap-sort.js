const floor = v => Math.floor(v);

function HeapSort(data) {
    let size = data.length;

    const less = (i, j) => data[i - 1] < data[j - 1];
    const swap = (i, j) => {
        const tmp = data[j - 1];
        data[j - 1] = data[i - 1];
        data[i - 1] = tmp;
    };

    // don't need for sort
    const percolateUp = k => {
        while (k > 1 && less(floor(k / 2), k)) {
            swap(floor(k / 2), k);
            k = floor(k / 2);
        }
    };

    const percolateDown = k => {
        while (2 * k <= size) {
            let j = 2 * k;
            if (j < size && less(j, j + 1)) j++;
            if (less(j, k)) break;
            swap(j, k);
            k = j;
        }
    };

    const sort = () => {
        // We start building heap from middle, because we don't
        // need to process leafs
        //   0  1   2   3   4   5   6   7   8   9  10  11
        //null 65, 77, 69, 76, 69, 79, 80, 82, 83, 84, 88

        /*
                             65
                     77               69
              76          69      79     80
          82    83     84   88
         */
        for (let k = floor(size / 2); k >= 1; k--) {
            percolateDown(k);
        }

        while (size > 1) {
            swap(1, size--);
            percolateDown(1);
        }

        return data;
    };

    return {
        sort
    };
}

exports.HeapSort = HeapSort;
