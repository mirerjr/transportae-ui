<template>
    <BaseCard>
        <template #cabecalho>
            <PhUser/> Login
        </template>
        <template #conteudo>
            <div class="max-w-sm mb-2">
                <span class="break-words text-xl font-arimo text-red-500">{{ msgErro }}</span>
            </div>
            <form class="font-gudea w-96">
                <div class="flex flex-col text-2xl mb-4">
                    <BaseInput
                        nome="Email" 
                        tipo="email"
                        autocomplete="username"
                        v-model="usuario.email"
                        :erros="errosUsuario.email"
                    />
                </div>
                <div class="flex flex-col text-2xl mb-8">
                    <BaseInput
                        nome="Senha"
                        tipo="password"
                        autocomplete="current-password"
                        v-model="usuario.senha"
                        :erros="errosUsuario.senha"
                    />
                </div>
            </form>
        </template>
        <template #rodape>
            <BaseBtn
                :disabled="isCarregando"
                class="text-2xl font-gudea"
                @click="logar()"
            >
                    <PhCircleNotch v-if="isCarregando" class="animate-spin" /> 
                    <PhSignIn v-else class="mr-1" />
                    {{ isCarregando ? 'Entrando' : 'Entrar' }}
            </BaseBtn>
        </template>
    </BaseCard>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { PhUser, PhSignIn, PhCircleNotch } from '@phosphor-icons/vue';
import { ErroPrimeiroAcesso, ErroValidacao } from '../utils/erros';
import BaseInput from '../components/form/BaseInput.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseCard from '../components/BaseCard.vue';
import usuarioService from '../services/usuario-service'; 
import { router } from '../routes';
import { useUsuarioStore } from '../stores/usuario-store';

const usuarioStore = useUsuarioStore();

const isCarregando = ref(false);
const msgErro = ref("");

let usuario = reactive({
    email: "",
    senha: "",
});

let errosUsuario = reactive({
    email: [],
    senha: [],
});

onMounted(() => {
    usuarioStore.limparToken();
    usuarioStore.limparCredenciais();
})

async function logar() {
    isCarregando.value = true;
    limparErros();   

    try {        
        const resposta = await usuarioService.logar(usuario);
        const token = resposta?.data?.token;

        if (!token) throw new Error("Erro ao obter as informações de autenticação");

        usuarioStore.setToken(token);
        router.push("/");
        
    } catch (erro) {       
        if (erro instanceof ErroPrimeiroAcesso) {
            handleErroPrimeiroAcesso(erro);
            return;
        }

        if (erro instanceof ErroValidacao) {
            handleErroValidacao(erro);
            return;
        }

        msgErro.value = erro.message;

    } finally {
        isCarregando.value = false;
    }
    
}

function limparErros() {
    msgErro.value = "";

    for (const campo in errosUsuario) {
        errosUsuario[campo] = [];
    }
}

function handleErroPrimeiroAcesso(erro) {
    usuarioStore.tokenTemporario = erro.token; 
    usuarioStore.email = usuario.email;
    usuarioStore.senha = usuario.senha;

    router.push("/alterar-senha");
}

function handleErroValidacao(erro) {
    for (const erroCampo of erro.campos) {
        if (errosUsuario[erroCampo.campo]) {
            errosUsuario[erroCampo.campo].push(erroCampo.mensagem);
        }            
    }
}
</script>

