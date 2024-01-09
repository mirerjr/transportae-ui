import apiConsumer from "./api-consumer";

function confirmarPonto(itinerarioPontoId, itinerarioPontoStatus) {
    const config = apiConsumer.configuracao;
    config.metodo = 'put';
    config.endpoint = `/itinerario-ponto/${itinerarioPontoId}/status`;
    config.conteudo = itinerarioPontoStatus

    return apiConsumer.enviar(config);
}

export default {
    confirmarPonto,
}