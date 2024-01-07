import apiConsumer from './api-consumer';
import { useUsuarioStore } from '../stores/usuario-store';
import { jwtDecode } from 'jwt-decode';

function isUsuarioLogado() {
    const token = getToken();
    return token != undefined && token != null && token != '';
}

function getToken() {
    const usuarioStore = useUsuarioStore();
    return usuarioStore.getToken() || usuarioStore.tokenTemporario;
}

function getPerfilUsuario() {
    const token = getToken();
    const tokenDecodificado = jwtDecode(token);
    return tokenDecodificado?.authorities[0]?.authority;
}

function isTokenExpirado() {
    const token = getToken();
    const tokenDecodificado = jwtDecode(token);
    return Date.now() >= tokenDecodificado.exp * 1000;
}

async function logar(usuario) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = '/auth/login';
    config.conteudo = usuario;
        
   return await apiConsumer.enviar(config);
}

async function alterarSenha(form) {
    const config = apiConsumer.configuracao;
    config.metodo = 'patch';
    config.endpoint = '/auth/senha';
    config.conteudo = form;

    return await apiConsumer.enviar(config);
}

async function getUsuario(id) {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/usuarios/${id}`;

    return await apiConsumer.enviar(config);
}

async function getUsuarioLogado() {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = '/usuarios/logado';

    return await apiConsumer.enviar(config);
}

async function listarUsuarios(pagina = 1, pesquisa = "") {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = `/usuarios?page=${pagina - 1}&search=${pesquisa}`;

    return await apiConsumer.enviar(config);
}

async function getMotoristas() {
    const config = apiConsumer.configuracao;
    config.metodo = 'get';
    config.endpoint = '/usuarios/motoristas';

    return await apiConsumer.enviar(config);
}

async function cadastrarUsuario(usuario) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = '/usuarios';
    config.conteudo = usuario;

    return await apiConsumer.enviar(config);
}

export default {
    isUsuarioLogado,
    getToken,
    getPerfilUsuario,
    isTokenExpirado,
    logar,
    alterarSenha,
    getUsuario,
    getUsuarioLogado,
    listarUsuarios,
    getMotoristas,
    cadastrarUsuario,
}
