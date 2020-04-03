// https://avikdas.com/2020/01/28/the-balanced-parentheses-problem.html
// Let’s consider the following open and close delimiter pairings:
//
// a -> A
// b -> B
// A -> a

// The characters A and a can be either open or a close delimiters.
// This leads to correctly balanced strings like the following:
//
// aAbB is balanced, but only if you consider 'a' to be an open delimiter
// and 'A' to be a close delimiter.
// AabB is balanced, but only if you consider a to be a close delimiter
// and 'A' to be an open delimiter.
// aAaA is balanced in two different ways, either as (aA)(aA) or (a(Aa)A).
// Here, parentheses are used as grouping for the sake of illustration.

// The problem cuts deeper than these examples show, because at
// least in the above examples, you have enough information early on
// to make a decision about whether to treat a character as an open or
// close delimiter. Because of the symmetric mappings (a -> A and A -> a),
// you essentially end up being able to close pairs of delimiters as you encounter them.
// But consider the following mapping:
//
// a -> A
// A -> b

function isBalanced(str, map) {
    const openList = Object.keys(map);
    const closeList = Object.values(map);

    function _helper(str, stack) {
        if (str.length === 0) {
            return stack.length === 0;
        }

        const char = str[0];
        const rest = str.slice(1);

        let isBalancedAsOpen = false;

        if (openList.includes(char)) {
            stack.push(char);
            isBalancedAsOpen = _helper(rest, stack);
            stack.pop();
        }

        let isBalancedAsClosed = false;

        if (closeList.includes(char)) {
            if (stack.length > 0) {
                const openChar = stack.pop();

                if (map[openChar] === char) {
                    isBalancedAsClosed = _helper(rest, stack);
                }

                stack.push(openChar);
            }
        }

        return isBalancedAsOpen || isBalancedAsClosed;
    }

    return _helper(str, []);
}
const map = {
    a: 'A',
    A: 'b'
};

console.log('aAAb', isBalanced('aAAb', map));
console.log('aAbA', isBalanced('aAbA', map));
console.log('abAA', isBalanced('abAA', map));
