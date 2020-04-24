// A circus is designing a tower routine consisting of people standing atop
// one another's shoulders. For practical and aesthetic reasons, each
// person must be both shorter and lighter than the person below him
// or her. Given the heights and weights of each person in the circus,
// write a method to compute the largest possible number of people in
// such a tower.

// EXAMPLE:
// Input(ht,wt):
//   (65, 100) (70, 150) (56, 90) (75, 190) (60, 95) (68, 110)
// Output:
//   The longest tower is length 6 and includes from top to bottom:
//   (56, 90) (60,95) (65,100) (68,110) (70,150) (75,190)

const print = (level, ...args) => {
    console.log(''.repeat(level), ...args);
};

function isBefore(a, b) {
    return a.ht < b.ht && a.wt < b.wt;
}

function comparator(a, b) {
    if (a.ht !== b.ht) {
        return a.ht - b.ht;
    } else {
        return a.wt - b.wt;
    }
}

function maxSeq(seqA, seqB) {
    if (!seqA) {
        return seqB;
    }

    if (!seqB) {
        return seqA;
    }

    if (seqA.length > seqB.length) {
        return seqA;
    }

    return seqB;
}

function longestIncreasingSubsequence(items, solutions, index, level) {
    print(level, 'index:', index);
    if (index >= items.length || index < 0) {
        print(level, 'Out of range. End of recursion');
        return;
    }

    const current = items[index];
    print(level, 'current:', `(${current.ht}, ${current.wt})`);

    let bestSeq = null;
    for (let i = 0; i < index; i++) {
        // выбираем длиннейшую последовательнось, которую можно приставить
        // перед current
        if (isBefore(items[i], current)) {
            print(level, `  candidate(${i}):`, toStr(solutions[i]));
            bestSeq = maxSeq(bestSeq, solutions[i]);
        }
    }

    print(level, 'bestSeq:    ', toStr(bestSeq));

    const newSolution = [];
    if (bestSeq) {
        newSolution.push(...bestSeq);
    }
    newSolution.push(current);
    print(level, 'newSolution:', toStr(newSolution));
    solutions[index] = newSolution;

    longestIncreasingSubsequence(items, solutions, index + 1, level + 1);
}

function getIncreasingSequence(items) {
    console.log('input: ', toStr(items));
    items.sort(comparator);
    console.log('sorted:', toStr(items));
    const solutions = new Array(items.length);

    longestIncreasingSubsequence(items, solutions, 0, 0);

    let bestSeq = null;
    for (const solution of solutions) {
        bestSeq = maxSeq(bestSeq, solution);
    }

    return toStr(bestSeq);
}

function toStr(data) {
    if (!data) {
        return '()';
    }
    return data.map(({ ht, wt }) => `(${ht}, ${wt})`).join(', ');
}

// Example:
// input:  (65, 100), (70, 150), (56, 90), (75, 190), (60, 95), (68, 160)
// sorted: (56, 90), (60, 95), (65, 100), (68, 160), (70, 150), (75, 190)
//  index: 0
//  current: (56, 90)
//  bestSeq:     ()
//  newSolution: (56, 90)
//  index: 1
//  current: (60, 95)
//    candidate(0): (56, 90)
//  bestSeq:     (56, 90)
//  newSolution: (56, 90), (60, 95)
//  index: 2
//  current: (65, 100)
//    candidate(0): (56, 90)
//    candidate(1): (56, 90), (60, 95)
//  bestSeq:     (56, 90), (60, 95)
//  newSolution: (56, 90), (60, 95), (65, 100)
//  index: 3
//  current: (68, 160)
//    candidate(0): (56, 90)
//    candidate(1): (56, 90), (60, 95)
//    candidate(2): (56, 90), (60, 95), (65, 100)
//  bestSeq:     (56, 90), (60, 95), (65, 100)
//  newSolution: (56, 90), (60, 95), (65, 100), (68, 160)
//  index: 4
//  current: (70, 150)
//    candidate(0): (56, 90)
//    candidate(1): (56, 90), (60, 95)
//    candidate(2): (56, 90), (60, 95), (65, 100)
//  bestSeq:     (56, 90), (60, 95), (65, 100)
//  newSolution: (56, 90), (60, 95), (65, 100), (70, 150)
//  index: 5
//  current: (75, 190)
//    candidate(0): (56, 90)
//    candidate(1): (56, 90), (60, 95)
//    candidate(2): (56, 90), (60, 95), (65, 100)
//    candidate(3): (56, 90), (60, 95), (65, 100), (68, 160)
//    candidate(4): (56, 90), (60, 95), (65, 100), (70, 150)
//  bestSeq:     (56, 90), (60, 95), (65, 100), (70, 150)
//  newSolution: (56, 90), (60, 95), (65, 100), (70, 150), (75, 190)
//  index: 6
//  Out of range. End of recursion
// result: (56, 90), (60, 95), (65, 100), (70, 150), (75, 190)

const input = [
    { ht: 65, wt: 100 },
    { ht: 70, wt: 150 },
    { ht: 56, wt: 90 },
    { ht: 75, wt: 190 },
    { ht: 60, wt: 95 },
    { ht: 68, wt: 110 }
];

const input2 = [
    { ht: 65, wt: 100 },
    { ht: 70, wt: 150 },
    { ht: 56, wt: 90 },
    { ht: 75, wt: 190 },
    { ht: 60, wt: 95 },
    { ht: 68, wt: 160 }
];

console.log('result:', getIncreasingSequence(input2));
