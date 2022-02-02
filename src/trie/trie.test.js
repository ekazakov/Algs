const { Trie } = require('./trie');

describe('Trie', () => {
    it('add word', () => {
        const t = new Trie();
        t.insert('hello');
        t.insert('hell');

        expect(t.search('hell')).toBeTruthy();
        expect(t.search('hello')).toBeTruthy();
        expect(t.searchPrefix('hel')).toBeTruthy();
        expect(t.searchPrefix('he')).toBeTruthy();
        expect(t.searchPrefix('h')).toBeTruthy();
        expect(t.searchPrefix('')).toBeTruthy();
        expect(t.searchPrefix('heo')).toBeFalsy();
    });
});
