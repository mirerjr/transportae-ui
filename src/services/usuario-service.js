import apiConsumer from './api-consumer';

async function logar(usuario) {
    const config = apiConsumer.configuracao;
    config.metodo = 'post';
    config.endpoint = '/auth/login';
    config.conteudo = usuario;
        
   return await apiConsumer.enviar(config);
}

export default {
    logar
}
