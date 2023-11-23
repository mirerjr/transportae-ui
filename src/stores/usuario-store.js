import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUsuarioStore = defineStore('usuario', () => {
    const email = ref("");
    const senha = ref("");
    
    const token = computed(() => JSON.parse(localStorage.getItem('transportae_token')));
    const tokenTemporario = ref("");

    function limparCredenciais() {
        tokenTemporario.value = "";
        email.value = "";
        senha.value = "";
    }

    function setToken(novoToken) {
        localStorage.setItem('transportae_token', JSON.stringify(novoToken));
    }

    function limparToken() {
        localStorage.removeItem('transportae_token');
    }

    return { email, senha, token, tokenTemporario, setToken, limparToken, limparCredenciais };
}); 