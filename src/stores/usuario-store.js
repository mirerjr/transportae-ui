import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUsuarioStore = defineStore('usuario', () => {
    const email = ref("");
    const senha = ref("");
    
    const tokenTemporario = ref("");

    function limparCredenciais() {
        tokenTemporario.value = "";
        email.value = "";
        senha.value = "";
    }

    function getToken() {
        return JSON.parse(localStorage.getItem('transportae_token'));
    }

    function setToken(novoToken) {
        localStorage.setItem('transportae_token', JSON.stringify(novoToken));
    }

    function limparToken() {
        localStorage.removeItem('transportae_token');
    }

    return { email, senha, tokenTemporario, setToken, getToken, limparToken, limparCredenciais };
}); 