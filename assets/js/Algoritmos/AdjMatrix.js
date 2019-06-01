/**
 *  Classe que implementa um grafo em Matriz de Adjacencia
 *
 * @class AdjMatrix
 */
class AdjMatrix {
    constructor(node_num, directed = false) {
        this.directed = directed
        this.node_num = node_num;
        this.matrix = []

        for (let i = 0; i < node_num; i++) {
            this.matrix.push([])
            for (let j = 0; j < node_num; j++) {
                this.matrix[i].push(0)
            }
        }

        this.BFS_data = null;
        this.DFS_data = null;
    }

    /**
     *  Adiciona uma aresta, dada sua Origem, Destino e Peso
     *
     * @param {number} sourceID
     * @param {number} targetID
     * @param {number} [weight=1]
     * @memberof AdjMatrix
     */
    add_edge(sourceID, targetID, weight = 1) {
        this.matrix[sourceID][targetID] = (weight)
        if (!this.directed) {
            this.matrix[targetID][sourceID] = (weight)
        }
    }

    /**
     *  Cores:
     *      c = cinza
     *      b = branco
     *      p = preto   
     */

    /**
     *  Coloca os dados da Busca em Largura em estado inicial
     *
     * @param {number} startID
     * @memberof AdjMatrix
     */
    bfsdata_set(startID) {
        this.BFS_data = {
            start_node: startID,
            color: (new Array(this.node_num)).fill('b'),
            father: (new Array(this.node_num)).fill(null),
            dist: (new Array(this.node_num)).fill(NaN)
        };
    }

    /**
     * Coloca os dados da Busca em Profundidade em estado inicial
     *
     * @param {number} startID
     * @memberof AdjMatrix
     */
    dfsdata_set(startID) {
        this.DFS_data = {
            start_node: startID,
            color: (new Array(this.node_num)).fill('b'),
            father: (new Array(this.node_num)).fill(null),
            d: (new Array(this.node_num)).fill(null),
            f: (new Array(this.node_num)).fill(null),
            time: 0
        };
    }

    /**
     *  Faz o processo de varredura via Largura, dado um nó inicial 
     *
     * @param {number} startID
     * @memberof AdjMatrix
     */
    BFS(startID) {
        this.bfsdata_set(startID);
        this.BFS_data.color[startID] = 'c';
        this.BFS_data.dist[startID] = 0;

        let queue = [];
        queue.push(startID);

        while (queue.length > 0) {
            let u = queue.shift()

            for (let v = 0; v < this.node_num; v++) {
                if (this.matrix[u][v] != 0 && this.BFS_data.color[v] === 'b') {
                    this.BFS_data.color[v] = 'c';
                    this.BFS_data.dist[v] = this.BFS_data.dist[u] + 1;
                    this.BFS_data.father[v] = u;
                    queue.push(v)
                }
            }
            this.BFS_data.color[u] = 'p';
        }
    }

    dfsdata_set(startID) {
        this.DFS_data = {
            start_node: startID,
            color: (new Array(this.node_num)).fill('b'),
            father: (new Array(this.node_num)).fill(null),
            d: (new Array(this.node_num)).fill(null),
            f: (new Array(this.node_num)).fill(null),
            time: 0
        };
    }

    DFS(startID) {
        this.dfsdata_set(startID);
        let list = [];
        for (let i = 0; i < this.node_num; i++) {
            if (startID === i) list.unshift(i);
            else list.push(i)
        }

        for (let i in list) {
            if (this.DFS_data.color[list[i]] === 'b') this.DFS_VISIT(list[i]);
        }
    }

    DFS_VISIT(node) {
        this.DFS_data.color[node] = 'c';
        this.DFS_data.time = this.DFS_data.time + 1;
        this.DFS_data.d[node] = this.DFS_data.time

        for (let v = 0; v < this.node_num; v++) {
            if (this.matrix[node][v] !== 0 && this.DFS_data.color[v] === 'b') {
                this.DFS_data.father[v] = node;
                this.DFS_VISIT(v);
            }
        }
        this.DFS_data.color[node] = 'p';
        this.DFS_data.f[node] = this.DFS_data.time += 1;
    }

    isConnected() {
        let sets = []

        for (let i = 0; i < this.node_num; i++) {
            let set = new NumberSet();
            set.add(i)
            sets.push(set)
        }

        for (let i = 0; i < this.node_num; i++) {
            for (let j = 0; j < this.node_num; j++) {
                if (this.matrix[i][j] === 0) continue;

                let set1, set2;
                for (let k in sets) {
                    if (sets[k].has(i)) set1 = sets[k];
                    if (sets[k].has(j)) set2 = sets[k];
                }
                if (!set1.equals(set2)) {
                    sets.push(set1.union(set2));
                    sets.splice(sets.indexOf(set1), 1);
                    sets.splice(sets.indexOf(set2), 1)
                }
            }
        }
        return {
            connected: (sets.length === 1),
            components: sets
        }

    }

    searchBy_bfs(startID, keyID) {
        let caminho = [];
        let atual = keyID;
        if (this.BFS_data != null) {
            while (this.BFS_data.father[atual] != null) {
                caminho.unshift({
                    from: this.BFS_data.father[atual],
                    to: atual,
                })
                atual = this.BFS_data.father[atual];
                if (atual === startID) break;
            }
        } else {
            this.BFS(startID);
            return this.searchBy_bfs(startID, keyID)
        }

        if (atual !== startID) {
            if (this.BFS_data.start_node === startID) return null;
            else {
                this.BFS(startID);
                return this.searchBy_bfs(startID, keyID)
            }
        } else {
            return caminho.length > 0 ? caminho : null;
        }
    }

    searchBy_dfs(startID, keyID) {
        let caminho = [];
        let atual = keyID;
        if (this.DFS_data != null) {
            while (this.DFS_data.father[atual] != null) {
                caminho.unshift({
                    from: this.DFS_data.father[atual],
                    to: atual,
                })
                atual = this.DFS_data.father[atual];
                if (atual === startID) break;
            }
        } else {
            this.DFS(startID);
            return this.searchBy_dfs(startID, keyID)
        }

        if (atual !== startID) {
            if (this.DFS_data.start_node === startID) return null;
            else {
                this.DFS(startID);
                return this.searchBy_dfs(startID, keyID)
            }
        } else {
            return caminho.length > 0 ? caminho : null;;
        }
    }

    kruskal() {
        if (this.directed && !this.isConnected.connected) return null;

        let sets = [];
        let edges = [];

        for (let i = 0; i < this.node_num; i++) {
            let set = new NumberSet();
            set.add(i)
            sets.push(set)
        }

        for (let i = 0; i < this.node_num; i++) {
            for (let j = 0; j < this.node_num; j++) {
                if (this.matrix[i][j] === 0) continue;
                edges.push({
                    from: i,
                    to: j,
                    weight: this.matrix[i][j]
                })
            }
        }

        let set1, set2, tree = [];
        edges.sort((a, b) => {
            return a.weight - b.weight
        });
        console.log('edges :', edges);

        for (let i in edges) {
            for (let k in sets) {
                if (sets[k].has(edges[i].from)) set1 = sets[k];
                if (sets[k].has(edges[i].to)) set2 = sets[k];
            }
            if (!set1.equals(set2)) {
                sets.push(set1.union(set2));
                sets.splice(sets.indexOf(set1), 1);
                sets.splice(sets.indexOf(set2), 1)
                tree.push(edges[i])
            }
        }

        return tree;

    }

    prim(startID) {
        function ordena(a, b) {
            return (d[a] - d[b])
        }

        let tree = []
        let d = (new Array(this.node_num)).fill(Infinity)
        let father = (new Array(this.node_num)).fill(null)
        d[startID] = 0;

        let Q = []
        for (let i = 0; i < this.node_num; i++) Q.push(i)
        Q.sort(ordena)

        while (Q.length != 0) {
            let u = Q.shift()

            for (let v = 0; v < this.node_num; v++) {
                let w = this.matrix[u][v]
                if (w === 0) continue; // sem aresta
                if (Q.indexOf(v) >= 0 && (w < d[v])) {
                    d[v] = w;
                    father[v] = u;
                }
            }

            if (u != startID) tree.push({
                from: u,
                to: father[u],
                weight: d[u]
            })
            Q.sort(ordena)
        }

        console.log('d :', d);
        console.log('father :', father);
        return tree;
    }



    dijkstra(startID) {
        function sort(a, b) {
            return d[a] - d[b]
        }
        let d = (new Array(this.node_num)).fill(Infinity)
        let father = (new Array(this.node_num)).fill(null)
        let Q = []
        let S = []

        for (let i = 0; i < this.node_num; i++) Q.push(i);
        d[startID] = 0;
        Q.sort(sort);

        while (Q.length != 0) {
            let u = Q.shift();

            S.push(u)
            for (let v = 0; v < this.node_num; v++) {
                if (this.matrix[u][v] === 0) continue;
                if (d[v] > (d[u] + this.matrix[u][v])) {
                    d[v] = d[u] + this.matrix[u][v]
                    father[v] = u
                }
            }
            Q.sort(sort);
        }
        return {
            father: father,
            dist: d
        }
    }

    bellman_ford(startID) {
        let d = (new Array(this.node_num)).fill(Infinity)
        let father = (new Array(this.node_num)).fill(null)
        d[startID] = 0;
        for (let i = 1; i < this.node_num; i++) {
            for (let u = 0; u < this.node_num; u++) {
                for (let v = 0; v < this.node_num; v++) {
                    if (this.matrix[u][v] === 0) continue;
                    if (d[v] > (d[u] + this.matrix[u][v])) {
                        d[v] = d[u] + this.matrix[u][v]
                        father[v] = u
                    }
                }
            }
        }

        for (let u = 0; u < this.node_num; u++) {
            for (let v = 0; v < this.node_num; v++) {
                if (this.matrix[u][v] === 0) continue;
                if (d[v] > (d[u] + this.matrix[u][v])) {
                    return null;
                }
            }
        }

        return {
            father: father,
            dist: d
        }
    }

    printEdges() {
        for (let i = 0; i < this.node_num; i++) {
            for (let j = 0; j < this.node_num; j++) {
                if (this.matrix[i][j].length != 0) console.log(i + ' => ' + j);
            }
        }
    }
}