import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

async function logar(usuario) {
    try {
        const resposta = await axios.post(`${API_HOST}/auth/login`, usuario);

    } catch (erro) {
        console.log("Erro", erro?.response?.data ?? erro);
    }
}

export default {
    logar
}
