import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

const getUrlCompleta = (endpoint) => `${API_HOST}${endpoint}`;

class ValidacaoError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidacaoError"
    }
}

class AutenticacaoException extends Error {
    constructor(message) {
        super(message);
        this.name = "AutenticacaoException"
    }
}

const configuracao = {
    metodo: 'GET',
    endpoint: '/',
    conteudo: null,    
};

async function enviar(config) {
    try {
        const url = getUrlCompleta(config.endpoint);
        const resposta = await axios[config.metodo](url, config.conteudo);

    } catch (erro) {
        const erroMapeado = erro?.response?.data;
        const camposInvalidos = erroMapeado?.camposInvalidos;
        const codigoStatus = erroMapeado?.codigoStatus;

        if (camposInvalidos?.length > 0) {
            throw new AutenticacaoException("");
        }
    }
}

export default {
    API_HOST,    
    configuracao,
    ValidacaoError,
};