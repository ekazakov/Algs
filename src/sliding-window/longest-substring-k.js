/*
Find the longest substring of given string containing k distinct characters.

Given a string and a positive number k, find the longest substring of given 
string containing k distinct characters. If k is more than number of 
distinct characters in the string, return the whole string.
*/

const createCounter = () => {
  const chars = new Map();
  return {
    add(char) {
      if (chars.has(char)) {
        const count = chars.get(char);
        chars.set(char, count + 1);
      } else {
        chars.set(char, 1);
      }
    },

    remove(char) {
      if (chars.has(char)) {
        const count = chars.get(char) - 1;

        if (count > 0) {
          chars.set(char, count);
        } else {
          chars.delete(char);
        }
      }
    },

    size() {
      return chars.size;
    },
  };
};

export const findLongestSubstringK = (str, k) => {
  const counter = createCounter();
  let leftWindow = 0;
  let left = 0;
  let longest = 0;
  for (let rightWindow = 0; rightWindow < str.length; ) {
    const char = str[rightWindow];

    counter.add(char);
    if (counter.size() > k) {
      counter.remove(str[leftWindow]);
      leftWindow += 1;
    }

    const windowSize = rightWindow - leftWindow + 1;
    if (windowSize > longest) {
      longest = windowSize;
      left = leftWindow;
    }

    rightWindow += 1;
  }

  return str.slice(left, longest + left);
};
