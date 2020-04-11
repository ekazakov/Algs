// Given a directed graph, design an algorithm to
// find out whether there is a route between two nodes.

const { Graph, Queue } = require('./gpaph-tools');
/*
A -->  B  --> C -> D
↓  ↙  ↓   ↘      ↗
E --> F --> G -↗
*/

const resetGraph = g => {
    g.getVertices().forEach(vert => {
        vert.visited = false;
    });
};

function isPath(start, end) {
    const queue = new Queue();
    start.visited = true;

    queue.enqueue(start);

    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        for (const nbr of current.getConnections()) {
            if (!nbr.visited) {
                if (nbr === end) {
                    return true;
                }
                nbr.visited;
                queue.enqueue(nbr);
            }
        }
    }
    return false;
}

describe('Is path between nodes', () => {
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

    beforeEach(() => {
        resetGraph(g);
    });

    it('From A to G', () => {
        const start = g.getVertex('A');
        const end = g.getVertex('G');
        expect(isPath(start, end)).toBe(true);
    });

    it('From G to A', () => {
        const start = g.getVertex('G');
        const end = g.getVertex('A');
        expect(isPath(start, end)).toBe(false);
    });
});

// console.log('From A to G', isPath(start, end));
