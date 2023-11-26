<template>
    <BaseCard>
        <template #cabecalho>
            <PhUser/> Alterar a senha
        </template>
        <template #conteudo>
            <div class="max-w-sm mb-2">
                <span class="break-words text-xl font-arimo text-red-500">{{ msgErro }}</span>
            </div>
            <form class="font-gudea w-96">
                <div v-show="false" class="flex flex-col text-2xl mb-4">
                    <BaseInput                        
                        nome="Email" 
                        tipo="email"
                        autocomplete="username"
                        v-model="form.email"
                    />
                </div>
                <div class="flex flex-col text-2xl mb-4">
                    <BaseInput
                        nome="Senha atual"
                        tipo="password"
                        autocomplete="current-password"
                        v-model="form.senhaAtual"
                        :erros="errosForm.senhaAtual"
                    />
                </div>
                <div class="flex flex-col text-2xl mb-4">
                    <BaseInput
                        nome="Senha nova"
                        tipo="password"
                        autocomplete="new-password"
                        v-model="form.senhaNova"
                        :erros="errosForm.senhaNova"
                    />
                </div>
                <div class="flex flex-col text-2xl mb-8">
                    <BaseInput
                        nome="Repita a senha nova"
                        tipo="password"
                        autocomplete="new-password"
                        v-model="form.senhaNovaConfirmada"
                        :erros="errosForm.senhaNovaConfirmada"
                    />
                </div>
            </form>
        </template>
        <template #rodape>
            <BaseBtn
                :disabled="isCarregando"
                class="text-2xl font-gudea"
                @click="atualizarSenha()"
            >
                    <PhCircleNotch v-if="isCarregando" class="animate-spin" /> 
                    <PhSignIn v-else class="mr-1" />
                    {{ isCarregando ? 'Alterando' : 'Confirmar' }}
            </BaseBtn>
        </template>
    </BaseCard>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { PhUser, PhSignIn, PhCircleNotch } from '@phosphor-icons/vue';
import { ErroValidacao } from '../utils/erros';
import BaseInput from '../components/form/BaseInput.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseCard from '../components/BaseCard.vue';
import usuarioService from '../services/usuario-service'; 
import { router } from '../routes';
import { useUsuarioStore } from '../stores/usuario-store';

const usuarioStore = useUsuarioStore();

const isCarregando = ref(false);
const msgErro = ref("");

let form = reactive({
    email: "",
    senhaAtual: "",
    senhaNova: "",
    senhaNovaConfirmada: "",
})

let errosForm = reactive({    
    senhaAtual: [],
    senhaNova: [],
    senhaNovaConfirmada: [],
})

onMounted(() => {
    form.email = usuarioStore.email;
    form.senhaAtual = usuarioStore.senha;
})

async function atualizarSenha() {
    isCarregando.value = true;
    limparErros();

    try {                
        await usuarioService.alterarSenha(form);
        
        usuarioStore.setToken(usuarioStore.tokenTemporario);
        usuarioStore.limparCredenciais();
        
        router.push("/perfil");

    } catch (erro) {
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

    for (const campo in errosForm) {
        errosForm[campo] = [];
    }
}

function handleErroValidacao(erro) {
    for (const erroCampo of erro.campos) {
        if (errosForm[erroCampo.campo]) {
            errosForm[erroCampo.campo].push(erroCampo.mensagem);
        }            
    }
}
</script>

