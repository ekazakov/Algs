console.clear();

export const findLongestSubstrWithoutRepeat = str => {
  const counts = {};
  let leftWindow = 0;
  let left = 0;
  let longest = 0;

  for (let rightWindow = 0; rightWindow < str.length; ) {
    const current = str[rightWindow];
    if (!counts[current]) {
      counts[current] = 0;
    }

    counts[current] += 1;

    if (Object.values(counts).some(el => el > 1)) {
      const leftChar = str[leftWindow];
      // decrement the element at leftWindow by 1, since the character is no longer in the window
      counts[leftChar] -= 1;
      // increment leftWindow to evaluate the next substring
      leftWindow += 1;
    }

    const windowSize = rightWindow - leftWindow + 1;

    if (windowSize > longest) {
      // console.log('!');
      longest = windowSize;
      left = leftWindow;
    }

    rightWindow += 1;
    // console.log('leftWindow:', leftWindow, 'rightWindow:', rightWindow);
  }

  return str.slice(left, longest + left);
};
