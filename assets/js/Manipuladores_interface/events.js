
// Seleção da representação por lista
$('#adjlist').on('click', () => {
    $('#selection_label').text($('#adjlist').text())
    tipo_rep = 0;
});

// Seleção da representação por matriz
$('#adjmtx').on('click', () => {
    $('#selection_label').text($('#adjmtx').text())
    tipo_rep = 1;
});


// Botão que dispara o input para o arquivo
$('#fileButton').on('click',  () => {
    if (tipo_rep === -1) return alert('Selecione o tipo de representação primeiro')
    $('#graph_input').click();
});


// Botao que dispara o modal de Busca
$('#btn_busca').on('click', () =>{
    $('#no_busca').val('');
   $('#modal_busca').modal('show'); 
});


// Botao que dispara o modal de caminho entre vertices
$('#btn_buscacaminho').on('click', () => {
    $('#no_buscaini').val('');
    $('#no_buscafim').val('');
    $('#modal_buscacaminho').modal('show')
})


// Botao que dispara a verificaçao de conexidade
$('#btn_conexo').on('click', () => {
    let result = graph.isConnected();
    if (result.connected){
        $('#txtarea_saida').val('O grafo é conexo!')
    }
    else{
        let out = 'O grafo não é conexo\n';
        out += `Tem ${result.components.length} componentes.\n\n`
        out += 'Componentes e seus respectivos vertices:\n\n'
        for(let i in result.components){
            out += `Componente ${Number(i)+1}: `
            for(let j in result.components[i]){
                out += result.components[i][j];
                if (j != result.components[i].length-1) out += ', '
            }
            out += '\n'
        }
        $('#txtarea_saida').val(out)
    }
    
    
    $('#label_operacao').text('Verificar se o grafo é conexo.');
    $('#modal_saida').modal('show');
});


// Botao que dispara o modal de gerar caminho minimo
$('#btn_caminho').on('click', () =>{
    if (!graph.isConnected().connected) return alert('Não é possivel fazer a operação, pois o grafo não é conexo')
    $('#no_caminhomin').val('');
   $('#modal_caminho').modal('show'); 
});


// Botao que dispara o modal de gerar AGM
$('#btn_agm').on('click', () =>{
    if (!graph.isConnected().connected) return alert('Não é possivel fazer a operação, pois o grafo não é conexo')
    $('#no_prim').val('');
   $('#modal_agm').modal('show'); 
});


// Confirmação no modal da Busca
$('#btn_fazerbusca').on('click', ()=>{
    let ini = Number($('#no_busca').val());
    if(ini >= graph.node_num) return alert('Vértice inválido')
    let caminho;
    let descricao;;
    if($('#radiobusca1').prop( "checked" )){
        descricao = `Busca em Profundidade iniciada no vértice ${ini}`;
        graph.DFS(ini);
        $('#txtarea_saida').val(profundidade_string(graph))
    }
    else{
        descricao = `Busca em Largura iniciada no vértice ${ini}`;
        graph.BFS(ini);
        $('#txtarea_saida').val(largura_string(graph))
    }
    
    $('#label_operacao').text(descricao);
    $('#modal_saida').modal('show');
});


// Confirmação no modal do caminho entre vertices
$('#btn_fazerbuscacaminho').on('click', ()=>{
    let ini = Number($('#no_buscaini').val());
    let fim = Number($('#no_buscafim').val());
    if(ini >= graph.node_num || fim >= graph.node_num) return alert('Vértice inválido')
    let caminho;
    let descricao = `Verificação da existência de caminho entre ${ini} e ${fim}, utilizando `;
    if($('#radiobuscacaminho1').prop( "checked" )){
        caminho = graph.searchBy_dfs(ini, fim);
        descricao += 'Busca em Profundidade';
    }
    else{
        descricao += 'Busca em Largura';
        caminho = graph.searchBy_bfs(ini, fim);
    }
    
    $('#label_operacao').text(descricao);
    $('#txtarea_saida').val(geraString_caminho(ini, fim, caminho))
    $('#modal_saida').modal('show');
})


// Confirmação no modal da geracao de caminho mínimo
$('#btn_fazercaminho').on('click', ()=>{
    let ini = Number($('#no_caminhomin').val())
    if(ini >= graph.node_num) return alert('Vértice inválido')
    let descricao = 'Computar Caminho Mínimo usando ';
    if($('#radiocaminho1').prop( "checked" )){
        descricao += 'Dijkstra a partir do vértice ' + ini
        $('#txtarea_saida').val(cMin_string(ini, graph.dijkstra(ini)));
    }
    else{
        let ini = Number($('#no_prim').val())
        descricao += 'Bellman-Ford a partir do vértice ' + ini;
        $('#txtarea_saida').val(cMin_string(ini, graph.bellman_ford(ini)));
    }
    $('#label_operacao').text(descricao);
    $('#modal_saida').modal('show');
});


// Confirmação no modal da geraçao da AGM
$('#btn_fazeragm').on('click', ()=>{
    let descricao = 'Computar Árvore Geradora Mínima usando ';
    if($('#radioagm1').prop( "checked" )){
        descricao += 'Kruskal'
        $('#txtarea_saida').val(agm_string(graph.kruskal()));
    }
    else{
        let ini = Number($('#no_prim').val())
        if(ini >= graph.node_num) return alert('Vértice inválido')
        descricao += 'Prim a partir do vértice ' + ini;
        $('#txtarea_saida').val(agm_string(graph.prim(ini)));
    }
    $('#label_operacao').text(descricao);
    $('#modal_saida').modal('show');
});

// Botao que reexibe o resultado da ultima operação
$('#btn_reexibir').on('click', ()=> {
    $('#modal_saida').modal('show');
    
})

// Recentrar visualização
$('#recenterbtn').on("click", ()=> {
    if(VisNetwork){
        VisNetwork.moveTo({
            position:{
                x:0,
                y:0
            },
            scale: 1.0,
        });
    }
});