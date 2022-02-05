const { Trie } = require('./trie2');

describe('Trie', () => {
    it('add word', () => {
        const t = new Trie();
        t.insert('hello');
        t.insert('hell');

        expect(t.search('hell')).toBeTruthy();
        expect(t.search('hello')).toBeTruthy();
        expect(t.startsWith('hel')).toBeTruthy();
        expect(t.startsWith('he')).toBeTruthy();
        expect(t.startsWith('h')).toBeTruthy();
        expect(t.startsWith('')).toBeTruthy();
        expect(t.startsWith('heo')).toBeFalsy();
    });

    it('remove word', () => {
        const t = new Trie();
        t.insert('hello');
        t.insert('hell');

        expect(t.remove('hel')).toBeFalsy();
        expect(t.remove('fool')).toBeFalsy();
        expect(t.remove('f')).toBeFalsy();

        expect(t.remove('hell')).toBeTruthy();
        expect(t.search('hell')).toBeFalsy();
        expect(t.search('hello')).toBeTruthy();

        expect(t.remove('hello')).toBeTruthy();
        expect(t.search('hello')).toBeFalsy();
    });

    it('forEach', () => {
        const t = new Trie();
        t.insert('hello');
        t.insert('hell');
        t.insert('arm');
        t.insert('armor');
        const spy = jest.fn();
        t.forEach(spy);
        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenNthCalledWith(1, 'hell');
        expect(spy).toHaveBeenNthCalledWith(2, 'hello');
        expect(spy).toHaveBeenNthCalledWith(3, 'arm');
        expect(spy).toHaveBeenNthCalledWith(4, 'armor');
    });

    it('toArray', () => {
        const t = new Trie();
        t.insert('hello');
        t.insert('hell');
        t.insert('arm');
        t.insert('armor');
        t.toArray();
        expect(t.toArray()).toEqual(['hell', 'hello', 'arm', 'armor']);
    });
});
