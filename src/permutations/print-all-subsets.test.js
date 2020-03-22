function printAllSubsetsOfKSet(k) {
    const result = [];
    const subset = [];
    function _helper(i) {
        if (i > k) {
            result.push([...subset]);
        } else {
            _helper(i + 1);
            subset.push(i);
            _helper(i + 1);
            subset.pop();
        }
    }

    _helper(0);

    return result;
}

function print(level, ...args) {
    console.log('\t'.repeat(level), ...args);
}

// https://www.geeksforgeeks.org/backtracking-to-find-all-subsets/
function printAllSubsets(set) {
    const result = [];

    function _helper(subset, i) {
        print(i, 'subset:', subset.join(', '));
        result.push([...subset]);
        for (let j = i; j < set.length; j++) {
            print(i, 'i:', i, 'j:', j, 'add:', set[j]);
            subset.push(set[j]);
            _helper(subset, j + 1);
            const tmp = subset.pop();
            print(i, 'pop:', tmp);
        }
    }

    _helper([], 0);

    return result;
}

describe('printAllSubsetOfKSet', () => {
    it('print for k=2', () => {
        const result = [[], [2], [1], [1, 2], [0], [0, 2], [0, 1], [0, 1, 2]];
        expect(printAllSubsetsOfKSet(2)).toEqual(result);
    });
});

describe('printAllSubset Of Set', () => {
    it('print for {0,1,2}', () => {
        const result = [[], [0], [0, 1], [0, 1, 2], [0, 2], [1], [1, 2], [2]];
        expect(printAllSubsets([0, 1, 2])).toEqual(result);
    });
});
