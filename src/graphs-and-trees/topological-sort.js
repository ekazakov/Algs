// 0 -> 1
// 0 -> 3
// 1 -> 2
// 1 -> 3
// 1 -> 6
// 2 -> 4
// 2 -> 5
// 3 -> 2
// 3 -> 4
// 4 -> 5
// 5 -> 6
//
// const graph = new Map([
//     [0, [1,3]],
//     [1, [2, 3, 6]],
//     [6, []],
//     [4, [5, 6]],
//     [5, [6]],
//     [2, [4, 5]],
//     [3, [2, 4]],
// ]);
// ordering: 0 -> 1 -> 3 -> 2 -> 4 -> 5 -> 6

function topologicalSortAdjList(graph) {
    const size = graph.size;
    const ordering = new Array(size);
    const visited = new Array(size).fill(false);

    let pointer = size - 1;

    function dfs(vertex, pointer, visited, ordering, graph) {
        visited[vertex] = true;

        for (const edge of graph.get(vertex)) {
            if (visited[edge.to]) {
                continue;
            }
            pointer = dfs(edge.to, pointer, visited, ordering, graph);
        }

        ordering[pointer] = vertex;

        return pointer - 1;
    }

    for (const vert of graph.keys()) {
        if (visited[vert]) {
            continue;
        }
        pointer = dfs(vert, pointer, visited, ordering, graph);
    }
    return ordering;
}

function topologicalSortAdjListIter(graph) {
    const size = graph.size;
    const ordering = new Array(size);
    const visited = new Array(size).fill(false);
    const stack = [];

    let pointer = size - 1;

    function dfs(vert, pointer, visited, ordering, graph) {
        visited[vert] = true;

        stack.push(vert);

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            if (
                graph.get(current).length === 0 ||
                graph.get(current).every(edge => visited[edge.to])
            ) {
                ordering[pointer] = stack.pop();
                pointer--;
                continue;
            }
            for (const edge of graph.get(current)) {
                if (visited[edge.to]) {
                    continue;
                }

                visited[edge.to] = true;
                stack.push(edge.to);
                break;
            }
        }

        return pointer;
    }

    for (const vert of graph.keys()) {
        if (visited[vert]) {
            continue;
        }
        pointer = dfs(vert, pointer, visited, ordering, graph);
    }
    return ordering;
}

function topologicalSortAdjMatrix(graph) {
    const size = graph.length;
    const ordering = new Array(size);
    const visited = new Array(size).fill(false);

    let pointer = size - 1;

    function dfs(vert, pointer) {
        visited[vert] = true;

        for (let v = 0; v < graph[vert].length; v++) {
            if (graph[vert][v] === 0 || visited[v]) {
                continue;
            }
            pointer = dfs(v, pointer);
        }

        ordering[pointer] = vert;

        return pointer - 1;
    }

    for (let v = 0; v < size; v++) {
        if (visited[v]) {
            continue;
        }
        pointer = dfs(v, pointer);
    }
    return ordering;
}

exports.topologicalSortAdjList = topologicalSortAdjList;
exports.topologicalSortAdjMatrix = topologicalSortAdjMatrix;

if (require.main === module) {
    function edge(from, to, weight = 0) {
        return { from, to, weight };
    }

    const graph = new Map([
        [0, [edge(0, 3), edge(0, 1)]],
        [6, []],
        [3, [edge(3, 4), edge(3, 2)]],
        [4, [edge(4, 5), edge(4, 6)]],
        [5, [edge(5, 6)]],
        [2, [edge(2, 4), edge(2, 5)]],
        [1, [edge(1, 2), edge(1, 6), edge(1, 3)]],
    ]);

    const graph2 = new Map([
        [4, []],
        [1, [edge(1, 3), edge(1, 2)]],
        [2, [edge(2, 3), edge(2, 4)]],
        [3, [edge(3, 4)]],
        [5, [edge(5, 4)]],
        [0, [edge(0, 1), edge(0, 2)]],
        [6, []], // isolated node
    ]);

    const graph3 = Array.from({ length: 7 }, () => new Array(7).fill(0));

    graph3[0][3] = 1;
    graph3[0][1] = 1;
    graph3[1][3] = 1;
    graph3[2][4] = 1;
    graph3[3][2] = 1;
    graph3[3][6] = 1;
    graph3[4][5] = 1;
    graph3[6][2] = 1;

    const ord1 = topologicalSortAdjList(graph);
    const ord1_1 = topologicalSortAdjListIter(graph);
    const ord2 = topologicalSortAdjList(graph2);
    const ord2_1 = topologicalSortAdjListIter(graph2);
    const ord3 = topologicalSortAdjMatrix(graph3);
    console.log('ordering1:', ord1.join('->'));
    console.log('ordering1.1:', ord1_1.join('->'));
    console.log('ordering2:', ord2.join('->'));
    console.log('ordering2.1:', ord2_1.join('->'));
    console.log('ordering3:', ord3.join('->'));
}
