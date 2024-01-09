<template>
    <BaseCard>
        <template #cabecalho>
            <section class="flex items-center">
                <PhProhibit class="w-14 h-14" />
                <span class="font-roboto mt-1">Oops!</span>
            </section>
        </template>
        <template #conteudo>
            <h1 class="font-roboto font-semibold text-4xl text-center text-gray-700 mb-1 mt-4">
                Erro de permissão
            </h1>
            <h2 class="font-arimo text-2xl text-center text-gray-700 mt-8 mb-4">
                <p>Você não tem permissão para acessar esta página.</p>
                <p class="mt-8">
                    Voltar para a
                    <a class="text-cyan-500" @click="$router.push(props.nomeRotaAnterior)">
                        Página anterior
                        <PhArrowSquareOut class="inline-block" />
                    </a>
                </p>
            </h2>
        </template>
    </BaseCard>
</template>

<script setup>
import { PhArrowBendUpLeft, PhArrowSquareOut, PhProhibit } from '@phosphor-icons/vue';
import BaseCard from '../components/BaseCard.vue';

const props = defineProps({
    nomeRotaAnterior: {
        type: String,
        required: true,
    }
})
</script>