// https://leetcode.com/problems/minimum-window-substring/
// https://medium.com/outco/how-to-solve-sliding-window-problems-28d67601a66
/**
 Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
 */

const incr = (map, key) => {
  map.set(key, map.get(key) + 1);
};

const decr = (map, key) => {
  map.set(key, map.get(key) - 1);
};

const minWindow = function minWindow(s, t) {
  let l = 0;
  let r = 0;
  let result = "";
  let missing = t.length;

  const map = new Map(t.split("").map(ch => [ch, 0]));
  let minSize = Number.POSITIVE_INFINITY;

  if (s.length < t.length) {
    return result;
  }

  // A D O B E C O D E B A N C
  for (r = 0; r < s.length; r++) {
    const ch = s[r];

    // console.log("add:", s[r]);
    if (map.has(ch)) {
      if (map.get(ch) === 0) {
        missing--;
      }
      incr(map, ch);
    }
    // console.log("missing:", missing);

    while (missing === 0) {
      const size = r - l + 1;
      if (minSize > size) {
        minSize = size;
        result = s.slice(l, l + minSize);
        // console.log("result:", result);
      }

      // console.log("remove:", s[l]);

      if (map.has(s[l])) {
        decr(map, s[l]);
        if (map.get(s[l]) === 0) {
          missing++;
        }
      }

      l++;
    }
  }
  return result;
};

describe.only("Min win subst https://leetcode.com/problems/minimum-window-substring/", () => {
  it("ADOBECODEEEEEEBANAC: ABC", () => {
    expect(minWindow("ADOBECODEEEEEEBANAC", "ABC")).toEqual("BANAC");
  });

  it("ADOBECODEBANC: ABC", () => {
    expect(minWindow("ADOBECODEBANC", "ABC")).toEqual("BANC");
  });
});
