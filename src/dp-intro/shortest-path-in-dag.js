function shortestPathInDag(graph) {
    const nodesCount = graph.length;

    if (nodesCount === 0) {
        return 0;
    }

    const dp = new Array(nodesCount).fill(Infinity);
    dp[nodesCount - 1] = 0;

    for (let i = nodesCount - 2; i >= 0; i--) {
        for (let j = 0; j < graph[i].length; j++) {
            const weight = graph[i][j];
            if (weight > 0) {
                dp[i] = Math.min(dp[i], weight + dp[j]);
            }
        }
    }

    return dp[0];
}

function shortestPathNodes(graph) {
    const nodesCount = graph.length;

    if (nodesCount === 0) {
        return [];
    }

    const dp = Array.from({ length: nodesCount }, () => [Infinity, null]);
    const lastNodeId = nodesCount - 1;
    dp[nodesCount - 1] = [0, null];

    for (let i = nodesCount - 2; i >= 0; i--) {
        // console.log(`dp[${i}][0]=${dp[i][0]}`);
        for (let j = 0; j < graph[i].length; j++) {
            const weight = graph[i][j];
            if (weight > 0) {
                // console.log('=======>>  i:', i, 'j:', j);
                if (dp[i][0] < weight + dp[j][0]) {
                    dp[i][0] = dp[i][0];
                    dp[i][1] = dp[i][1];
                    // console.log('i:', i, '_next:', dp[i][1]);
                } else {
                    dp[i][0] = weight + dp[j][0];
                    dp[i][1] = j;
                    // console.log('i:', i, 'next:', j);
                }
            }
        }
    }

    const result = [0];
    let next = 0;
    // console.log(dp);
    while (next !== lastNodeId) {
        next = dp[next][1];
        result.push(next);
    }

    // console.log('dp[0][0]:', dp[0][0]);
    return result.join('->');
}

exports.shortestPathInDag = shortestPathInDag;
exports.shortestPathNodes = shortestPathNodes;

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

// const result = shortestPathNodes(graph);

// console.log('result:', result);
