const {
    topologicalSortAdjList,
    topologicalSortAdjMatrix,
} = require('./topological-sort');

function shortestPathInDag(graph) {
    const ordering = topologicalSortAdjMatrix(graph);
    const size = ordering.length;
    const dp = new Array(size).fill(Infinity);

    dp[ordering[size - 1]] = 0;
    for (let i = size - 2; i >= 0; i--) {
        const at = ordering[i];
        for (let v = 0; v < graph[at].length; v++) {
            const weight = graph[at][v];
            if (weight > 0) {
                dp[at] = Math.min(dp[at], dp[v] + weight);
            }
        }
    }

    return dp[ordering[0]];
}

if (require.main === module) {
    const graph3 = Array.from({ length: 7 }, () => new Array(7).fill(0));

    graph3[0][3] = 1;
    graph3[0][1] = 1;
    graph3[1][3] = 1;
    graph3[2][4] = 1;
    graph3[3][2] = 6;
    graph3[3][6] = 1;
    graph3[4][5] = 1;
    graph3[6][2] = 1;

    const dist = shortestPathInDag(graph3);
    console.log('dist:', dist); // expect 5
}
