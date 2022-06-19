const { shortestPathInDag, shortestPathNodes } = require('./shortest-path-in-dag');

describe('DP13. Shortest path in DAG', () => {
    const graph = Array.from({ length: 10 }, () => new Array(10).fill(0));

    graph[0][1] = 1;
    graph[0][2] = 2;
    graph[0][3] = 3;

    graph[1][4] = 2;
    graph[1][5] = 1;
    graph[1][6] = 1;

    graph[2][4] = 1;
    graph[2][5] = 2;
    graph[2][6] = 1;

    graph[3][4] = 2;
    graph[3][5] = 3;
    graph[3][6] = 2;

    graph[4][7] = 3;
    graph[4][8] = 2;

    graph[5][7] = 3;
    graph[5][8] = 3;

    graph[6][7] = 1;
    graph[6][8] = 3;

    graph[7][9] = 4;
    graph[8][9] = 3;

    it('simple test', () => {
        expect(shortestPathInDag(graph)).toBe(7);
    });

    it('path test', () => {
        expect(shortestPathNodes(graph)).toBe('0->1->6->7->9');
    });
});
