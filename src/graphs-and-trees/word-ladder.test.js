// https://runestone.academy/runestone/books/published/pythonds/Graphs/BuildingtheWordLadderGraph.html

const { Graph, Queue } = require('./gpaph-tools');

const words = [
    'fool',
    'foul',
    'foil',
    'fail',
    'fall',
    'pall',
    'cool',
    'pope',
    'pool',
    'poll',
    'pole',
    'pale',
    'sale',
    'sage'
];

function buildGraph(words) {
    const d = {};
    const g = new Graph();

    for (const word of words) {
        for (let i = 0; i < word.length; i++) {
            const bucket = word.slice(0, i) + '_' + word.slice(i + 1);
            if (d[bucket]) {
                d[bucket].push(word);
            } else {
                d[bucket] = [word];
            }
        }
    }

    for (const bucket of Object.keys(d)) {
        for (const word1 of d[bucket]) {
            for (const word2 of d[bucket]) {
                if (word1 !== word2) {
                    g.addEdge(word1, word2);
                }
            }
        }
    }

    return g;
}

function bfs(g, start) {
    const vertQueue = new Queue();
    start.distance = 0;
    start.pred = null;
    start.visited = true;
    vertQueue.enqueue(start);
    while (!vertQueue.isEmpty()) {
        const current = vertQueue.dequeue();

        for (const nbr of current.getConnections()) {
            if (!nbr.visited) {
                nbr.visited = true;
                nbr.distance = current.distance + 1;
                nbr.pred = current;
                vertQueue.enqueue(nbr);
            }
        }
    }
}

function traverse(start) {
    const path = [];
    let current = start;

    let i = 0;

    while (current.pred) {
        console.log('current.id:', current.id);
        path.push(current.id);
        current = current.pred;
        i++;

        if (i > 20) {
            process.exit(0);
        }
    }
    path.push(current.id);
    return path;
}

const graph = buildGraph(words);
const start = graph.getVertex(words[0]); // 'fool'
// console.log('Words graph:');
// graph.print();

bfs(graph, start);

const sage = graph.getVertex('sage');
// console.log(sage);

console.log('path:', traverse(sage).join(' -> '));
