import apiConsumer from "./api-consumer";

function getInstituicao(id) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/instituicoes/${id}`;

    return apiConsumer.enviar(config);
}

function listarInstituicoes(pagina = 1, pesquisa = "") {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/instituicoes?page=${pagina - 1}&search=${pesquisa}`;
  
    return apiConsumer.enviar(config);
}

function cadastrarInstituicao(instituicao) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = '/instituicoes';
    config.conteudo = instituicao;

    return apiConsumer.enviar(config);
}

function listarAlunosVinculados(id) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/instituicoes/${id}/alunos`;

    return apiConsumer.enviar(config);
}

function getTipoInstituicao(tipo) {
    const tipos = {
        UNIVERSIDADE: 'Universidade',
        FACULDADE: 'Faculdade',
        INSTITUTO_TECNICO: 'Instituto Técnico',
        INSTITUTO_TECNICO_SUPERIOR: 'Instituto Técnico Superior'
    }

    return tipo ? tipos[tipo] : tipos;
}

function getTipoInstituicaoSelecionado(tipoSelecionado) {
    const tipos = getTipoInstituicao();

    for (const tipo in tipos) {
        if (tipos[tipo] === tipoSelecionado) {
            return tipo;
        }
    }
}


export default {
    getInstituicao,
    listarInstituicoes,
    listarAlunosVinculados,
    cadastrarInstituicao,
    getTipoInstituicao,
    getTipoInstituicaoSelecionado
}