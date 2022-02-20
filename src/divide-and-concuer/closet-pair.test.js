function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function closetPair1(points) {
    let minDist = Infinity;
    let pair = null;
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
            const dist = distance(p, points[j]);
            if (dist < minDist) {
                minDist = dist;
                pair = [i, j];
            }
        }
    }

    return pair;
}

function minOfThree(points) {
    return Math.min(
        distance(points[0], points[1]),
        distance(points[0], points[2]),
        distance(points[1], points[2])
    );
}

function closetPair2(points) {
    function stripClosest(strip, d) {
        let min = d;
        for (let i = 0; i < strip.length; i++) {
            for (let j = i + 1; j < Math.min(strip.length, 7); j++) {
                const dist = distance(strip[i], strip[j]);
                if (dist < min) {
                    min = dist;
                }
            }
        }

        return min;
    }

    function pToS(items) {
        return items.map(p => `[${p.join(',')}]`).join(',');
    }

    function _closestPair(pointsX, pointsY) {

        console.log('py:', pToS(pointsY));

        if (pointsX.length === 2) {
            console.log('2p:', pToS(pointsX));
            return distance(pointsX[0], pointsX[1]);
        }

        if (pointsX.length === 3) {
            console.log('3p:', pToS(pointsX));
            return minOfThree(pointsX);
        }

        const mid = Math.floor(pointsX.length / 2);
        console.log('midPoint:', `[${pointsX[mid].join(',')}] mid:`, mid);

        const midX = pointsX[mid][0];
        const pointsYl = [];
        const pointsYr = [];

        for (let i = 0; i < pointsY.length; i++) {
            if (pointsY[i][0] < midX) {
                pointsYl.push(pointsY[i]);
            } else {
                pointsYr.push(pointsY[i]);
            }
        }

        const dl = _closestPair(pointsX.slice(0, mid), pointsYl);
        const dr = _closestPair(pointsX.slice(mid), pointsYr);
        const d = Math.min(dl, dr);

        const strip = [];
        for (let i = 0; i < pointsY.length; i++) {
            if (Math.abs(pointsY[i][0] - midX) < d) {
                strip.push(pointsY[i]);
            }
        }

        console.log('strip:', pToS(strip));

        return stripClosest(strip, d);
    }

    const pointsX = points.slice().sort((a, b) => a[0] - b[0]);
    const pointsY = points.slice().sort((a, b) => a[1] - b[1]);


    return _closestPair(pointsX, pointsY);
}

describe('Closest Pair', () => {
    // prettier-ignore
    const points1 = [[1, 3], [1, 7], [2, 4], [2, 9], [3, 1], [3, 5], [4, 3], [4, 7]];
    // prettier-ignore
    const points2 = [[1, 2], [1, 6], [2, 4], [2, 8], [3, 1], [3, 6], [3, 10], [4, 3], [5, 1], [5, 5], [5, 9], [6, 7], [7, 1], [7, 4], [7, 9], [8, 6]];

    describe('n^2 solution', () => {
        it('test 1', () => {
            expect(closetPair1(points1)).toEqual([0, 2]);
        });

        it('test 2', () => {
            expect(closetPair1(points2)).toEqual([1, 5]);
        });
    });

    describe('N*logN solution', () => {
        it('test 1', () => {
            expect(closetPair2(points1).toFixed(4)).toEqual("1.4142");
        });

        it('test 2', () => {
            expect(closetPair2(points2)).toEqual(2);
        });
    });
});
