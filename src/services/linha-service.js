import apiConsumer from "./api-consumer";

function cadastrarLinha(linha) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = '/linhas';
    config.conteudo = linha;

    return apiConsumer.enviar(config);
}

function listarLinhas(pagina = 1, pesquisa = "", turno = "") {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/linhas?page=${pagina - 1}&search=${pesquisa}&turno=${turno}`;

    return apiConsumer.enviar(config);
}

function getTurnoLinha(turno) {
    const turnos = {
        MATUTINO: 'Manhã',
        VESPERTINO: 'Tarde',
        NOTURNO: 'Noite',
        INTEGRAL: 'Integral'
    }

    return turno ? turnos[turno] : turnos;
}

function getTurnoLinhaSelecionado(turnoSelecionado) {
    const turnos = getTurnoLinha();

    for (const turno in turnos) {
        if (turnos[turno] == turnoSelecionado) {
            return turno;
        }
    }
}

export default {
    cadastrarLinha,
    listarLinhas,
    getTurnoLinha,
    getTurnoLinhaSelecionado
}