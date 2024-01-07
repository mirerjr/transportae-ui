import apiConsumer from "./api-consumer";

function getPonto(id) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/pontos-parada/${id}`;

    return apiConsumer.enviar(config);
}

function cadastrarPonto(ponto) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = '/pontos-parada';
    config.conteudo = ponto;

    return apiConsumer.enviar(config);
}

function listarPontosPorLinha(linhaId) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/pontos-parada?linhaTransporteId=${linhaId}`;

    return apiConsumer.enviar(config);
}

function listarPontos(pagina = 1, pesquisa = "") {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/pontos-parada?page=${pagina - 1}&search=${pesquisa}`;

    return apiConsumer.enviar(config);
}

export default {
    getPonto,
    cadastrarPonto,
    listarPontosPorLinha,
    listarPontos
}
