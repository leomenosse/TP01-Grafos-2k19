// Leitura do arquivo

// Quando disparado, o grafo é carregado(se valido)
$('#graph_input').on('input', () => {
    if ($('#graph_input')[0].files[0] === undefined) return;
    $('#fname_label').text($('#graph_input')[0].files[0].name)
   
    var reader = new FileReader();
    reader.onload = () => {
        data = consistence(reader.result)
        $('#label_representacao').text((tipo_rep === 0) ? 'Lista de Adjacência' : 'Matriz de adjacência');
        $('#graph_input')[0] = undefined;
        $('#label_orientacao').text(data.directed == 0 ? 'Não' : 'Sim')
        $('#label_nos').text(data.node_num)
        $("#label_arestas").text(data.edges.length)
        $('#btn_operacao').removeAttr("disabled")
        
        if(tipo_rep === 0) graph = geraLista(data);
        else graph = geraMatrix(data);
        loadGraph(data);
        $('#graph_input').val('');
    }
    reader.readAsText($('#graph_input')[0].files[0])
});

function loadGraph(graph_data) {
    nodes = []
    edges = []

    for (let i = 0; i < graph_data.node_num; i++) {
        nodes.push({
            id: i,
            label: `${i}`
        })
    }

    graph_data.edges.forEach((edge) => {
        if(graph_data.directed === 1){
            edges.push({
                from: edge.from,
                to: edge.to,
                arrows: 'to'
            });
        }
        else {
            edges.push({
                from: edge.from,
                to: edge.to,
            });
        }
        
    })

    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {

        // Enable this to make the endpoints smaller/larger
        interaction:{
            hover: true,
        },
        edges: {
            "smooth": {
                "type": "continuous",
                "forceDirection": "none",
                "roundness": 0
            },
            hoverWidth: function (width) {return width*2;},
            arrows: {
                to: {
                    scaleFactor: 0.3
                },
            },
        },
        "physics": {
            "barnesHut": {
            "gravitationalConstant": -10000,
            "centralGravity": 3.05,
            "springLength": 50,
            "damping": 0.11
        },
        "maxVelocity": 104,
        "minVelocity": 0.45
    }
};

    VisNetwork = new vis.Network(container, data, options);
}