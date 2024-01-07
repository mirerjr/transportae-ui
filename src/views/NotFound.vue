<template>
    <BaseCard>
        <template #cabecalho>
            <section class="flex items-center">
                <PhHexagon class="w-14 h-14" />
                <span class="font-roboto mt-1">Oops!</span>
            </section>
        </template>
        <template #conteudo>     
        <h1 class="font-roboto font-semibold text-4xl text-center text-gray-700 mb-1 mt-4">
            Página não encontrada.
        </h1>
        <h2 class="font-arimo text-2xl text-center text-gray-700 mt-8">
            <p>A página que você está tentando acessar não existe.</p>
            <p class="mt-6 mb-2">
                <a class="text-cyan-500" href="#" @click="$router.back()">
                    Página anterior
                    <PhArrowBendUpLeft class="inline-block" />
                </a>
            </p>
            Ou
            <p class="mt-2">
                <a class="text-cyan-500" href="#" @click="$router.push('/')">
                    Página inicial
                    <PhArrowSquareOut class="inline-block" />
                </a>
            </p>
        </h2>
    </template>
    </BaseCard>
</template>

<script setup>
import { PhArrowBendUpLeft, PhArrowSquareOut, PhHexagon } from '@phosphor-icons/vue';
import BaseCard from '../components/BaseCard.vue';
</script>