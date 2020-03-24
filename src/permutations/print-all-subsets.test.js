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
    // console.log('\t'.repeat(level), ...args);
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

// https://www.geeksforgeeks.org/print-subsets-given-size-set/
function _printAllSubsetsOfSize(set, k) {
    const result = [];
    const subset = [];

    function _helper(i, j) {
        if (i === k) {
            // print(i, 'result:', subset.slice(0, k));
            result.push([...subset]);
            return;
        }

        if (j >= set.length) {
            return;
        }

        subset[i] = set[j];
        _helper(i + 1, j + 1);
        _helper(i, j + 1);
    }

    _helper(0, 0);

    return result;
}

function printAllSubsetsOfSize(set, k) {
    const result = [];

    function _helper(subset, index) {
        if (subset.length === k) {
            result.push(subset.slice(0, k));
            return;
        }

        if (index >= set.length) {
            return;
        }

        // на каждом рассматриваем 2 сценария
        // 1. Добавили эл-т в подмножество и пошли на след шаг рекурсии
        subset.push(set[index]);
        _helper(subset, index + 1);
        // 2. Пропустили текущий эл-т и пошли дальше
        subset.pop();
        _helper(subset, index + 1);
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

describe('printAllSubset of size k', () => {
    it('print for {1,2,3,4}', () => {
        // prettier-ignore
        const result = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];
        expect(printAllSubsetsOfSize([1, 2, 3, 4], 2)).toEqual(result);
    });
});
