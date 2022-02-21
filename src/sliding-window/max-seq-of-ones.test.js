const { findIndexOfMaxSeq } = require('./max-seq-of-ones');

describe('Find index of 0 to be replaced to get maximum length sequence of continuous ones', () => {
    it('index should be 7', () => {
        const data = [0, 0, 1, 0, 1, 1, 1, 0, 1, 1];
        expect(findIndexOfMaxSeq(data)).toBe(7);
    });

    it('index should be 1', () => {
        const data = [0, 0, 0];
        expect(findIndexOfMaxSeq(data)).toBe(0);
    });

    it('index should be -1', () => {
        const data = [1, 1, 1];
        expect(findIndexOfMaxSeq(data)).toBe(-1);
    });

    it('index should be 0', () => {
        const data = [0, 1, 1, 1];
        expect(findIndexOfMaxSeq(data)).toBe(0);
    });

    it('index should be 3', () => {
        const data = [1, 1, 1, 0];
        expect(findIndexOfMaxSeq(data)).toBe(3);
    });

    it('index should be 1', () => {
        const data = [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1];
        expect(findIndexOfMaxSeq(data)).toBe(1);
    });

    it('index should be 1', () => {
        const data = [1, 0, 1, 0, 1, 0];
        expect(findIndexOfMaxSeq(data)).toBe(1);
    });

    it('index should be 2', () => {
        const data = [0, 1, 0, 1, 0];
        expect(findIndexOfMaxSeq(data)).toBe(2);
    });
});
