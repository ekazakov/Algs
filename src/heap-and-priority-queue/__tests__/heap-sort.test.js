const { HeapSort } = require('../heap-sort');

describe.only('HeapSort', () => {
    it('test1', () => {
        const values = [65, 77, 69, 76, 69, 79, 80, 82, 83, 84, 88];
        const heap = HeapSort(values);

        const expected = [65, 69, 69, 76, 77, 79, 80, 82, 83, 84, 88];
        expect(heap.sort()).toEqual(expected);
    });
});
