<template>
    <BaseCard>
        <template #cabecalho>
            <PhUser/> Login
        </template>
        <template #conteudo>
            <form class="font-gudea w-96">
                <div class="flex flex-col text-2xl mb-4">
                    <BaseInput nome="Email" tipo="email"  />
                </div>
                <div class="flex flex-col text-2xl mb-8">
                    <BaseInput nome="Senha" tipo="password" />
                </div>
            </form>
        </template>
        <template #rodape>
            <BaseBtn class="text-2xl font-gudea">
                <PhSignIn class="mr-1" /> Entrar
            </BaseBtn>            
        </template>
    </BaseCard>
</template>

<script setup>
import { PhUser, PhSignIn } from '@phosphor-icons/vue';
import BaseInput from '../components/form/BaseInput.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseCard from '../components/BaseCard.vue';
</script>

