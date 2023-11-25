import axios from 'axios';
import { ErroPadrao, ErroPrimeiroAcesso, ErroValidacao} from '../utils/erros';

const API_HOST = import.meta.env.VITE_API_HOST;

const getUrlCompleta = (endpoint) => `${API_HOST}${endpoint}`;

const configuracao = {
    metodo: 'GET',
    endpoint: '/',
    conteudo: null,
};

async function enviar(config) {
    try {
        const url = getUrlCompleta(config.endpoint);
        const resposta = await axios[config.metodo](url, config.conteudo);

        return resposta

    } catch (erro) {
        console.log("Ocorreu um erro ao enviar a requisição", config, erro);
        
        const erroRequisicao = erro?.response?.data
        
        if (!erroRequisicao)
            throw new Error("Erro não identificado. Por favor, contate os administradores");
        else        
            handleErroAxios(erroRequisicao)            
    }
}

function handleErroAxios(erro) {
    const isPrimeiroAcesso = erro?.primeiroAcesso;
    const isErroMapeado = erro?.codigoStatus;
    const hasCamposInvalidos = erro?.camposInvalidos?.length > 0;
    
    if (isPrimeiroAcesso) {
        throw new ErroPrimeiroAcesso("Para poder continuar, por favor altere a sua senha", erro.token);
    }    

    if (hasCamposInvalidos) {
        throw new ErroValidacao(erro.mensagem, erro.camposInvalidos);
    }

    if (isErroMapeado) {
        throw new ErroPadrao(erro.mensagem, erro.codigoStatus);
    }
    
    throw new Error("Erro não identificado. Por favor, contate os administradores");        
}

export default {
    enviar,
    configuracao,
};