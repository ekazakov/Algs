// Given an M x N matrix in which each row and each
// column is sorted in ascending order, write a method
// to find an element.

function findElement1(m, item) {
    const rows = m.length;
    const cols = m[0].length;

    let r = 0;
    let c = cols - 1;
    while (c >= 0 && r < rows) {
        console.log('row:', r, 'col:', c);
        if (m[r][c] === item) {
            return [r, c];
        }

        // item > end of row
        if (item > m[r][c]) {
            r += 1;
            /* item < start of column*/
        } else if (item < m[r][c]) {
            c -= 1;
        }
    }

    return null;
}

function isBefore(a, b) {
    return a.x <= b.x && a.y <= b.y;
}

function isInbounds(m, p) {
    const startX = 0;
    const startY = 0;
    const endX = m.length - 1;
    const endY = m[0].length - 1;

    return p.x >= startX && p.x <= endX && p.y >= startY && p.y <= endY;
}

function avgPoint(a, b) {
    return { x: Math.floor((a.x + b.x) / 2), y: Math.floor((a.y + b.y) / 2) };
}

const print = (level, ...args) => {
    console.log('\t'.repeat(level), ...args);
};

function findHelper(m, origin, dest, item, level) {
    print(level, 'origin:', origin, 'dest:', dest, 'item:', item);

    if (!isInbounds(m, origin) || !isInbounds(m, dest)) {
        print(level, 'out of bound');
        return null;
    }

    if (m[origin.x][origin.y] === item) {
        print(level, 'Found');
        return origin;
    }

    if (!isBefore(origin, dest)) {
        print(level, 'dest is before origin');
        return null;
    }

    const diagDist = Math.min(dest.x - origin.x, dest.y - origin.y);
    const start = { ...origin };
    const end = { x: start.x + diagDist, y: start.y + diagDist };

    while (isBefore(start, end)) {
        const p = avgPoint(start, end);
        print(level, `start:`, start, 'end:', end, 'p:', p, 'mid:', m[p.x][p.y]);
        if (item > m[p.x][p.y]) {
            start.x += 1;
            start.y += 1;
        } else if (item < m[p.x][p.y]) {
            end.x -= 1;
            end.y -= 1;
        } else {
            print(level, 'Found2');
            return p;
        }
    }
    print(level, `start:`, start, 'end:', end);

    const pivot = start;
    print(level, 'pivot:', pivot);
    const lowerLeftDest = { x: dest.x, y: pivot.y - 1 };
    const lowerLeftOrigin = { x: pivot.x, y: origin.y };
    const upperRightOrigin = { x: origin.x, y: pivot.y };
    const upperRightDest = { x: pivot.x - 1, y: dest.y };

    print(level, 'left search');
    const lowerLeft = findHelper(m, lowerLeftOrigin, lowerLeftDest, item, level + 1);

    if (!lowerLeft) {
        print(level, 'right search');
        return findHelper(m, upperRightOrigin, upperRightDest, item, level + 1);
    }

    return lowerLeft;
}

function findElement2(m, item) {
    const origin = { x: 0, y: 0 };
    const dest = { x: m[0].length - 1, y: m.length - 1 };

    return findHelper(m, origin, dest, item, 0);
}

// input:
// [ [ 15, 20, 40, 85 ],
//   [ 20, 35, 80, 95 ],
//   [ 30, 55, 95, 105 ],
//   [ 40, 80, 100, 120 ] ]
// Solution:
// origin: { x: 0, y: 0 } dest: { x: 3, y: 3 } item: 55
//  start: { x: 0, y: 0 } end: { x: 3, y: 3 } p: { x: 1, y: 1 } mid: 35
//  start: { x: 1, y: 1 } end: { x: 3, y: 3 } p: { x: 2, y: 2 } mid: 95
//  start: { x: 1, y: 1 } end: { x: 2, y: 2 } p: { x: 1, y: 1 } mid: 35
//  start: { x: 2, y: 2 } end: { x: 2, y: 2 } p: { x: 2, y: 2 } mid: 95
//  start: { x: 2, y: 2 } end: { x: 1, y: 1 }
//  pivot: { x: 2, y: 2 }
//  left search
//          origin: { x: 2, y: 0 } dest: { x: 3, y: 1 } item: 55
//          start: { x: 2, y: 0 } end: { x: 3, y: 1 } p: { x: 2, y: 0 } mid: 30
//          start: { x: 3, y: 1 } end: { x: 3, y: 1 } p: { x: 3, y: 1 } mid: 80
//          start: { x: 3, y: 1 } end: { x: 2, y: 0 }
//          pivot: { x: 3, y: 1 }
//          left search
//                  origin: { x: 3, y: 0 } dest: { x: 3, y: 0 } item: 55
//                  start: { x: 3, y: 0 } end: { x: 3, y: 0 } p: { x: 3, y: 0 } mid: 40
//                  start: { x: 4, y: 1 } end: { x: 3, y: 0 }
//                  pivot: { x: 4, y: 1 }
//                  left search
//                          origin: { x: 4, y: 0 } dest: { x: 3, y: 0 } item: 55
//                          out of bound
//                  right search
//                          origin: { x: 3, y: 1 } dest: { x: 3, y: 0 } item: 55
//                          dest is before origin
//          right search
//                  origin: { x: 2, y: 1 } dest: { x: 2, y: 1 } item: 55
//                  Found
// 55 -> { x: 2, y: 1 }

// prettier-ignore
const input = [
    [15, 20,  40,  85],
    [20, 35,  80,  95],
    [30, 55,  95, 105],
    [40, 80, 100, 120]
];

console.log('input:');
console.log(input);
// console.log('55 ->', findElement1(input, 55));
// console.log('54 ->', findElement1(input, 54));
// console.log('200 ->', findElement1(input, 200));
// console.log('10 ->', findElement1(input, 10));
// console.log('81 ->', findElement1(input, 81));
// console.log('80 ->', findElement1(input, 80));

console.log('55 ->', findElement2(input, 55));
// console.log('54 ->', findElement2(input, 54));
// console.log('200 ->', findElement2(input, 200));
// console.log('10 ->', findElement2(input, 10));
// console.log('81 ->', findElement2(input, 81));
// console.log('80 ->', findElement2(input, 80));
// console.log('35 ->', findElement2(input, 35));
