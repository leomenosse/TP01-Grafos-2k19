// verifica se o arquivo lido está OK, se sim, retorna um objeto contendo os dados, se nao, retorna null.

function consistence(str_graph){
    var args = str_graph.split('\n');
    var type = args[0].match(/\S+/g), 
        node_num = args[1].match(/\S+/g), 
        edges = args.slice(2);
    var graph = {};
    
    if (type.length === 1) graph.directed = Number(type[0]);
    else return null;
    
    if(node_num.length === 1) graph.node_num = Number(node_num[0]);
    else return null;
    
    graph.edges = [];
    var valid_edges = true
    
    edges.forEach( (edge) => {
        var aux = edge.match(/\S+/g);
        if(aux.length === 3) {
            graph.edges.push({
                from: Number(aux[0]),
                to: Number(aux[1]),
                weight: Number(aux[2])
            })
        }
        else return valid_edges = false
    });
    
    
    if (valid_edges) return graph;
    else return null;
    
}