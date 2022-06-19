const { changeMaking } = require('./change-making-12');

describe('DP12. Change making', () => {
    it('n=29, denomination: 1,3,5', () => {
        expect(changeMaking(29, [1, 3, 5])).toBe(7);
    });

    it('n=1, denomination: 2,3,5', () => {
        expect(changeMaking(1, [2, 3, 5])).toBe(-1);
    });

    it('n=56, denomination: 15,4,3', () => {
        expect(changeMaking(56, [15, 4, 3])).toBe(6);
    });
});
