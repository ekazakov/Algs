const { numWaysToPaint } = require('./coloring-fence-07');

describe('DP07. Coloring fence', () => {
    it('n=3', () => {
        expect(numWaysToPaint(3)).toBe(6);
    });

    it('n=4', () => {
        expect(numWaysToPaint(4)).toBe(10);
    });
    it('n=5', () => {
        expect(numWaysToPaint(5)).toBe(16);
    });
});
