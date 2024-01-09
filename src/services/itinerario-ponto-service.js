import apiConsumer from "./api-consumer";

function confirmarPonto(itinerarioPontoId, itinerarioPontoStatus) {
    const config = apiConsumer.configuracao;
    config.metodo = 'put';
    config.endpoint = `/itinerario-ponto/${itinerarioPontoId}/status`;
    config.conteudo = itinerarioPontoStatus

    return apiConsumer.enviar(config);
}

function confirmarPontoAluno(itinerarioPontoId, itinerarioPontoStatus) {
    const config = apiConsumer.configuracao;
    config.metodo = 'put';
    config.endpoint = `/itinerario-ponto/${itinerarioPontoId}/aluno/status`;
    config.conteudo = itinerarioPontoStatus

    return apiConsumer.enviar(config);
}

function getAlunosConfirmados(itinerarioPontoId) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/itinerario-ponto/${itinerarioPontoId}/alunos`;

    return apiConsumer.enviar(config);
}

export default {
    confirmarPonto,
    confirmarPontoAluno,
    getAlunosConfirmados,
}