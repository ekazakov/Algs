class Vertex {
    constructor(key) {
        this.id = key;
        this.connectedTo = new Map();
    }

    addNeighbor(nbr, weight = 0) {
        this.connectedTo.set(nbr, weight);
    }

    toString() {
        const keys = [...this.connectedTo.keys()].map(k => k.id);
        return `${this.id} connectedTo ${keys}`;
    }

    getConnections() {
        return [...this.connectedTo.keys()];
    }

    getWeight(nbr) {
        return this.connectedTo.get(nbr);
    }
}

class Graph {
    constructor() {
        this.vertList = new Map();
        this.numVertices = 0;
    }

    addVertex(key) {
        this.numVertices += 1;
        const vert = new Vertex(key);
        this.vertList.set(key, vert);
        return vert;
    }

    getVertex(key) {
        if (this.vertList.has(key)) {
            return this.vertList.get(key);
        }

        return null;
    }

    has(key) {
        return this.vertList.has(key);
    }

    addEdge(from, to, weight = 0) {
        if (!this.has(from)) {
            this.addVertex(from);
        }

        if (!this.has(to)) {
            this.addVertex(to);
        }

        this.vertList.get(from).addNeighbor(this.vertList.get(to), weight);
    }

    getVertices() {
        return [...this.vertList.values()];
    }

    print() {
        for (const vert of this.getVertices()) {
            for (const nbr of vert.getConnections()) {
                console.log(`(${vert.id}, ${nbr.id})`);
            }
        }
    }
}

class Queue {
    constructor() {
        this.data = [];
    }
    enqueue(val) {
        this.data.push(val);
    }

    dequeue() {
        return this.data.shift();
    }

    size() {
        return this.data.length;
    }

    isEmpty() {
        return this.size() === 0;
    }
}

module.exports = {
    Vertex,
    Graph,
    Queue
};
