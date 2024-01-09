import apiConsumer from './api-consumer';

function getItinerario(id) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/itinerarios/${id}`;

    return apiConsumer.enviar(config);
}

function listarItinerarios() {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/itinerarios`;

    return apiConsumer.enviar(config);
}

function getItinerarioPorLinha(linhaId) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/linhas/${linhaId}/itinerarios`;

    return apiConsumer.enviar(config);
}

function getItinerarioEmAndamentoPorLinha(linhaId) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/linhas/${linhaId}/itinerarios?iniciado=true`;
    
    return apiConsumer.enviar(config);
}

function cadastrarItinerario(itinerario) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = `/itinerarios`;
    config.conteudo = itinerario;

    return apiConsumer.enviar(config);
}

function listarItinerarioPorUsuario(usuarioId) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/usuarios/${usuarioId}/itinerarios`;

    return apiConsumer.enviar(config);
}

function concluirItinerario(itinerarioId) {
    const config = apiConsumer.configuracao;
    config.metodo = 'put';
    config.endpoint = `/itinerarios/${itinerarioId}/concluir`;

    return apiConsumer.enviar(config);
}

export default {
    getItinerario,
    listarItinerarios,
    concluirItinerario,
    cadastrarItinerario,
    getItinerarioPorLinha,
    listarItinerarioPorUsuario,
    getItinerarioEmAndamentoPorLinha,
}