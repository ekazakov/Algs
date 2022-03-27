exports.UnionFind = class UnionFind {
    constructor(size) {
        if (size <= 0) {
            throw new Error('UnionFind size should be greater than zero');
        }
        // the number of elements in this union find
        this._size = size;
        // tracks the number of components in the union find
        this.numComponents = size;
        // used to track the size of each of the component
        this.sz = new Array(size);
        // id[i] points to the parent of "i", if id[i] == i then "i" is a root node
        this.id = new Array(size);

        for (let i = 0; i < size; i++) {
            this.id[i] = i;
            this.sz[i] = 1;
        }
    }

    // Find which component 'p' belongs to, takes amortized constant time.
    find(p) {
        let root = p;

        // find the root of the component
        while (root !== this.id[root]) {
            root = this.id[root];
        }

        // Compress the path leading back to the root.
        // Doing this operation is called "path compression"
        // and is what gives us amortized time complexity.
        while (p !== root) {
            const next = this.id[p];
            this.id[p] = root;
            p = next;
        }

        return root;
    }

    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    componentSize(p) {
        return this.sz[this.find(p)];
    }

    components() {
        return this.numComponents;
    }

    size() {
        return this._size;
    }
    // unify the components containing elements "p" and "q"
    unify(p, q) {
        if (this.connected(p, q)) return;

        const root1 = this.find(p);
        const root2 = this.find(q);

        if (this.sz[root1] < this.sz[root2]) {
            this.sz[root2] += this.sz[root1];
            this.id[root1] = root2;
            this.sz[root1] = 0;
        } else {
            this.sz[root1] += this.sz[root2];
            this.id[root2] = root1;
            this.sz[root2] = 0;
        }

        this.numComponents--;
    }
};
