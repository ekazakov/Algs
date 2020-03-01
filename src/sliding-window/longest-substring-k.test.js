import { findLongestSubstringK } from './longest-substring-k';

describe('Longest substring containing K distinct charactes', () => {
  const str = 'abcbdbdbbdcdabd';
  it('f("abcbdbdbbdcdabd", 2) to be bdbdbbd', () => {
    expect(findLongestSubstringK(str, 2)).toBe('bdbdbbd');
  });
  it('f("abcbdbdbbdcdabd", 3) to be bcbdbdbbdcd', () => {
    expect(findLongestSubstringK(str, 3)).toBe('bcbdbdbbdcd');
  });
  it('f("abcbdbdbbdcdabd", 5) to be abcbdbdbbdcdabd', () => {
    expect(findLongestSubstringK(str, 5)).toBe('abcbdbdbbdcdabd');
  });
});
