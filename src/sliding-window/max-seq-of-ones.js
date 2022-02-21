/*
Given a binary array, find the index of 0 to be replaced
with 1 to get maximum length sequence of continuous ones.

https://www.techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/
*/
const findIndexOfMaxSeq = data => {
  let index = -1;
  let maxIndex = -1;
  let maxLength = 0;
  let curLength = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] === 1) {
      curLength += 1;
    } else {
      if (index === -1) {
        curLength += 1;
      } else {
        curLength = i - index;
      }

      index = i;
    }

    if (maxLength < curLength) {
      maxLength = curLength;
      maxIndex = index;
    }
  }

  return maxIndex;
};

exports.findIndexOfMaxSeq = findIndexOfMaxSeq;
