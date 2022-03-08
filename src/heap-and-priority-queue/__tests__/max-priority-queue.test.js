const { MaxPriorityQueue } = require('../max-priority-queue');

describe('MaxPriorityQueue', () => {
    it('test1', () => {
        const values = 'SORTEXAMPLE'.split('');
        const pq = MaxPriorityQueue(values.length);

        values.forEach(ch => {
            pq.insert(ch);
        });
        const result = [];
        while (pq.getSize() > 0) {
            result.push(pq.delMax());
        }

        expect(result.join('')).toBe('XTSRPOMLEEA');
    });

    it('test2', () => {
        const values = [65, 77, 69, 76, 69, 79, 80, 82, 83, 84, 88];
        const pq = MaxPriorityQueue(values.length);

        values.forEach(ch => {
            pq.insert(ch);
        });
        const result = [];
        while (pq.getSize() > 0) {
            result.push(pq.delMax());
        }

        const expected = [65, 69, 69, 76, 77, 79, 80, 82, 83, 84, 88].reverse();
        expect(result).toEqual(expected);
    });
});
