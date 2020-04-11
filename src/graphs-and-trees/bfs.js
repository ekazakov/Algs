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

function bfs(g, startKey) {
    const verts = new Queue();
    const start = g.getVertex(startKey);
    start.visited = true;
    verts.enqueue(start);

    printQueue(verts);
    while (!verts.isEmpty()) {
        const current = verts.dequeue();

        for (const nbr of current.getConnections()) {
            if (!nbr.visited) {
                nbr.visited = true;
                verts.enqueue(nbr);
            }
        }
        printQueue(verts);
    }
}

bfs(g, 'A');
resetGraph(g);
// queue: [ 'A' ]
// queue: [ 'B', 'E' ]
// queue: [ 'E', 'F', 'G', 'C' ]
// queue: [ 'F', 'G', 'C' ]
// queue: [ 'G', 'C' ]
// queue: [ 'C', 'D' ]
// queue: [ 'D' ]
// queue: []

bfs(g, 'F');
resetGraph(g);
// queue: [ 'F' ]
// queue: [ 'G' ]
// queue: [ 'D' ]
// queue: []
