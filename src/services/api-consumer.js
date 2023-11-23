import axios from 'axios';
import { ErroPadrao, ErroPrimeiroAcesso, ErroValidacao} from '../utils/erros';
import { useUsuarioStore } from '../stores/usuario-store';

const API_HOST = import.meta.env.VITE_API_HOST;
const usuarioStore = useUsuarioStore();

const getUrlCompleta = (endpoint) => `${API_HOST}${endpoint}`;

const configuracao = {
    metodo: 'GET',
    endpoint: '/',
    conteudo: null,
};

async function enviar(config) {
    const tokenHeader = getTokenHeader();

    try {
        const url = getUrlCompleta(config.endpoint);

        const resposta = await axios[config.metodo](url, config.conteudo, {
            headers: tokenHeader
        });

        return resposta

    } catch (erro) {
        console.log("Ocorreu um erro ao enviar a requisição", config, erro);
        handleErro(erro?.response?.data ?? erro);
    }
}

function getTokenHeader() {
    const token = usuarioStore.token ?? usuarioStore.tokenTemporario;

    return token 
        ? { Authorization: `Bearer ${token}` }
        : null;
}

function handleErro(erro) {
    const isPrimeiroAcesso = erro?.primeiroAcesso;
    const isErroMapeado = erro?.codigoStatus || isPrimeiroAcesso;
    const hasCamposInvalidos = erro?.camposInvalidos?.length > 0;
    
    if (!erro || !isErroMapeado) {
        throw new Error("Erro não identificado. Por favor, contate os administradores");
    }

    if (isPrimeiroAcesso) {
        throw new ErroPrimeiroAcesso("Para poder continuar, por favor altere a sua senha", erro.token);
    }    

    if (hasCamposInvalidos) {
        throw new ErroValidacao(erro.mensagem, erro.camposInvalidos);
    }

    if (isErroMapeado) {
        throw new ErroPadrao(erro.mensagem);
    }
    
    throw new Error("Erro não identificado. Por favor, contate os administradores");        
}

export default {
    enviar,
    configuracao,
};