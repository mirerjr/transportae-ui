<template>
    <BaseCard>
        <template #cabecalho>
            <PhUser/> Login
        </template>
        <template #conteudo>
            <form class="font-gudea w-96">
                <div class="flex flex-col text-2xl mb-4">
                    <BaseInput
                        v-model="usuario.email"
                        nome="Email" 
                        tipo="email"
                    />
                </div>
                <div class="flex flex-col text-2xl mb-8">
                    <BaseInput
                        v-model="usuario.senha"
                        nome="Senha"
                        tipo="password"
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
import BaseInput from '../components/form/BaseInput.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseCard from '../components/BaseCard.vue';
import usuarioService from '../services/usuario-service'; 

const isCarregando = ref(false);

let usuario = reactive({
    email: "",
    senha: "",
})

async function logar() {
    isCarregando.value = true;
    const resposta = await usuarioService.logar(usuario);    
    isCarregando.value = false;
}
</script>

