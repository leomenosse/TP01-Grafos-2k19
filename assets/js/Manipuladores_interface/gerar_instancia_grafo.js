function geraMatrix(data){
    let directed = data.directed == 0 ? false : true
    let graph = new AdjMatrix(data.node_num, directed)
    
    

    data.edges.forEach((edge) => {
        graph.add_edge(edge.from, edge.to, edge.weight);
    });
    
    return graph;
}

function geraLista(data){
    let directed = data.directed == 0 ? false : true
    let graph = new AdjList(data.node_num, directed)
    
    

    data.edges.forEach((edge) => {
        graph.add_edge(edge.from, edge.to, edge.weight);
    });
    
    return graph;
}