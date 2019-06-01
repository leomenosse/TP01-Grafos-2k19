function geraString_caminho(ini, fim, data){
    if(data == null) return `Não existe caminho do vértice ${ini} para ${fim}\n`;
    let out = `Caminho do vértice ${ini} para ${fim}:\n`;
    out += `    ${ini} `;
    for(let i in data){
        out += `→ ${data[i].to} `
    }
    out += `\nDistância: ${data.length}\n`
    return out;
}

function profundidade_string(graph){
    let out = 'Resultado da busca em profundidade\n\n';
        out += '\'d\' significa Tempo de Descoberta\n';
        out += '\'f\' significa Tempo de Finalização\n\n';
        out += '=========================\n'
    for(let i = 0; i < graph.node_num; i++){
        out += `Vértice: ${i}\n`;
        out += `      d: ${graph.DFS_data.d[i]}\n`
        out += `      f: ${graph.DFS_data.f[i]}\n`
        out += '=========================\n'
    }
    
    return out
}

function largura_string(graph){
    let out = 'Resultado da busca em largura\n\n';
        out += '=============================================\n\n';
    for(let i = 0; i < graph.node_num; i++){
        out += geraString_caminho(graph.BFS_data.start_node, i, graph.searchBy_bfs(graph.BFS_data.start_node, i))
        out += '=============================================\n\n';
    }
    
    return out
}

function agm_string(data){
    let out = 'Arestas pertencentes a AGM do grafo:\n\n' 
    for (let i in data){
        out += `(${data[i].from}) ── (${data[i].to}) peso: ${data[i].weight}\n` 
    }
    return out;
}

function cMin_string(start_node,cmin_data){
    let out = `Caminho Mínimo iniciado no vértice ${start_node}.\n\n`
    out += '\n\n=============================================\n\n';
    for(let i = 0; i < cmin_data.dist.length; i++){
        if (i != start_node){
           let caminho = `${i}`;
            let atual = i;
            while(cmin_data.father[atual] != null){
                caminho = `${cmin_data.father[atual]} → ` + caminho;
                atual = cmin_data.father[atual];
            }
            out += `Caminho entre ${start_node} e ${i}:\n`
            out += '    ' + caminho + '\n';
            out += `Distancia: ${cmin_data.dist[i]}`
            out += '\n\n=============================================\n\n';
        }
    }
    return out;
}