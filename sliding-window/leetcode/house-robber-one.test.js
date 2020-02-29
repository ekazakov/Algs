// https://leetcode.com/problems/house-robber/
// https://medium.com/outco/how-to-solve-the-house-robber-problem-f3535ebaef1b
// https://stackoverflow.com/questions/46289231/leetcodes-house-robber-problem-path-cant-print-path
function maxGoldAtRecursive(houses) {
  function _maxGoldAt(index) {
    if (index >= houses.length) {
      return 0;
    }

    return Math.max(
      houses[index] + _maxGoldAt(index + 2),
      _maxGoldAt(index + 1)
    );
  }

  return _maxGoldAt(0);
}

// TODO print all combinations
function allCombs(houses) {
  let tmp = [];
  function _maxGoldAt(index) {
    if (index >= houses.length) {
      return 0;
    }

    tmp.push(houses[index]);
    console.log(tmp.join(", "));
    const a = houses[index] + _maxGoldAt(index + 2);
    tmp.pop();
    const b = _maxGoldAt(index + 1);
    return Math.max(a, b);
  }

  return _maxGoldAt(0);
}

function maxGoldAt(arr) {
  let curSum = 0;
  let prevSum = 0;

  // Tutorial explanation
  // For every house in the list, either add its gold to the max gold 2 indices back
  // or keep the max gold 1 index back.

  // My explanation
  // ignore current house, keep current accumulated sum and move to review next
  // or abaddon idea to rob prev house, rob current and add it to one house back accumulation

  // We need review all haouses to understand which indexes should be robbed
  for (let i = 0; i < arr.length; i++) {
    const maxSum = Math.max(curSum, prevSum + arr[i]);
    prevSum = curSum;
    curSum = maxSum;
  }

  return curSum;
}

function maxGoldAtItems(arr) {
  let curSum = 0;
  let prevSum = 0;
  let prevPrevSum = 0;
  const result = [];

  console.log("arr:", arr.join(", "));
  for (let i = 0; i < arr.length; i++) {
    console.log(
      `[${i}]`,
      "curSum:",
      curSum,
      "prevSum:",
      prevSum,
      "item:",
      arr[i],
      "prevPrevSum:",
      prevPrevSum
    );
    const maxSum = Math.max(curSum, prevSum + arr[i]);

    if (curSum < prevSum + arr[i]) {
      if (prevSum > prevPrevSum) {
        // const tmp = result.pop();
        // console.log("delete:", tmp);
      }
      console.log("add", arr[i]);
      // result.push(i);
      result.push(arr[i]);
    } else {
      result.push(-1);
      // console.log("add", arr[i - 1]);
      // result.push(arr[i - 1]);
    }

    prevPrevSum = prevSum;
    prevSum = curSum;
    curSum = maxSum;
  }

  console.log("result:", result.join(", "));
  // console.log("tmp:", tmp.join(", "));
  return result;
  // return [8, 5, 2];
}

describe.only("House robber", () => {
  // it("All combinations recursive", () => {
  //   // allCombs([3, 1, 2, 5, 4, 2]);
  //   expect(maxGoldAtRecursive([3, 1, 2, 5, 4, 2])).toEqual(10);
  // });

  it("Items for max sum", () => {
    maxGoldAtItems([3, 1, 2, 5, 4, 2]);
    // maxGoldAtItems([1, 8, 2, 5, 4, 2]);
    // expect(maxGoldAtItems([3, 1, 2, 5, 4, 2])).toEqual([3, 5, 2]);
    // expect(maxGoldAtItems([1, 8, 2, 5, 4, 2])).toEqual([8, 5, 2]);
  });

  // it("Linerar solution", () => {
  //   expect(maxGoldAt([3, 1, 2, 5, 4, 2])).toEqual(10);
  //   expect(maxGoldAt([1, 8, 2, 5, 4, 2])).toEqual(15);
  // });
});
