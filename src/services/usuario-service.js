import apiConsumer from './api-consumer';
import { useUsuarioStore } from '../stores/usuario-store';

function isUsuarioLogado() {
    const usuarioStore = useUsuarioStore();
    const token = usuarioStore.getToken() || usuarioStore.tokenTemporario;

    return token != undefined && token != null && token != '';
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

export default {
    isUsuarioLogado,
    logar,
    alterarSenha,
}
