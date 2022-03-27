exports.UnionFind = function(size) {
    let numComponents = size;
    const ids = Array.from({ length: size }, (_, id) => id);
    const sz = new Array(size).fill(1);

    const find = i => {
        let root = i;

        while (root !== ids[root]) {
            root = ids[root];
        }

        while (i !== root) {
            const next = ids[i];
            ids[i] = root;
            i = next;
        }

        return root;
    };

    const connected = (p, q) => find(p) === find(q);

    const unify = (p, q) => {
        const root1 = find(p);
        const root2 = find(q);

        if (root1 === root2) return;

        if (sz[root1] >= sz[root2]) {
            sz[root1] += sz[root2];
            sz[root2] = 0;
            ids[root2] = root1;
        } else {
            sz[root2] += sz[root1];
            ids[root1] = root2;
            sz[root1] = 0;
        }

        numComponents--;
    };

    return {
        find,
        unify,
        connected,
        componentSize: p => sz[find(p)],
        components: () => numComponents,
        size: () => size
    };
};
