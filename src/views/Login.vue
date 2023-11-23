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
import { ref, reactive } from 'vue';
import { PhUser, PhSignIn, PhCircleNotch } from '@phosphor-icons/vue';
import { ErroPrimeiroAcesso, ErroValidacao } from '../utils/erros';
import BaseInput from '../components/form/BaseInput.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseCard from '../components/BaseCard.vue';
import usuarioService from '../services/usuario-service'; 

const isCarregando = ref(false);
const msgErro = ref("");

let usuario = reactive({
    email: "",
    senha: "",
})

let errosUsuario = reactive({
    email: [],
    senha: [],
})

async function logar() {
    let resposta;

    try {
        msgErro.value = "";
        isCarregando.value = true;
        resposta = await usuarioService.logar(usuario);    
        
    } catch (erro) {
        for (const campo in errosUsuario) {
            errosUsuario[campo] = [];
        }
        
        if (erro instanceof ErroPrimeiroAcesso) {
            //TODO: Redirecionar para tela de troca de senha
            return;
        }

        if (erro instanceof ErroValidacao) {
            for (const erroCampo of erro.campos) {
                if (errosUsuario[erroCampo.campo]) {
                    errosUsuario[erroCampo.campo].push(erroCampo.mensagem);
                }            
            }
            return;
        }

        msgErro.value = erro.message;

    } finally {
        isCarregando.value = false;
    }
}
</script>

