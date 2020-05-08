// https://java2blog.com/depth-first-search-in-java/
const { Graph, Queue } = require('./gpaph-tools');
/*

A -->  B  --> C -> D
↓  ↙  ↓   ↘      ↗
E --> F --> G -↗

*/

const g = new Graph();
g.addEdge('A', 'B');
g.addEdge('A', 'E');
g.addEdge('B', 'E');
g.addEdge('B', 'F');
g.addEdge('B', 'G');
g.addEdge('B', 'C');
g.addEdge('E', 'F');
g.addEdge('F', 'G');
g.addEdge('G', 'D');
g.addEdge('C', 'D');

const printQueue = queue => {
    const ids = queue.data.map(vert => vert.id);
    console.log(`queue:`, ids);
};

const resetGraph = g => {
    g.getVertices().forEach(vert => {
        vert.visited = false;
    });
};

function dfs(g, startKey) {
    const start = g.getVertex(startKey);

    function _dfs(vertex, level = 0) {
        vertex.visited = true;
        // console.log(' '.repeat(level), 'node:', vertex.id);
        for (const nbr of vertex.getConnections()) {
            if (!nbr.visited) {
                _dfs(nbr, level + 1);
            }
        }
    }

    _dfs(start);
}

function dfsIter(g, startKey) {
    const stack = [];
    const start = g.getVertex(startKey);
    stack.push(start);

    while (stack.length !== 0) {
        const current = stack.pop();
        // console.log('current:', current.id);

        if (!current.visited) {
            current.visited = true;
        }

        for (const nbr of current.getConnections()) {
            if (!nbr.visited) {
                stack.push(nbr);
            }
        }

        // console.log('stack:', stack.map(v => v.id));
    }
}

dfs(g, 'A');
resetGraph(g);
//  node: A
//   node: B
//    node: E
//     node: F
//      node: G
//       node: D
//    node: C

dfsIter(g, 'A');
resetGraph(g);
// current: A
// stack: [ 'B', 'E' ]
// current: E
// stack: [ 'B', 'F' ]
// current: F
// stack: [ 'B', 'G' ]
// current: G
// stack: [ 'B', 'D' ]
// current: D
// stack: [ 'B' ]
// current: B
// stack: [ 'C' ]
// current: C
// stack: []
