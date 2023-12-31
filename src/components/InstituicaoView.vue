<template>
    <BaseCard>
        <template #cabecalho>
            <PhBuildings />
            Instituição
        </template>
        <template #cabecalho-btn>
            <PhArrowSquareOut 
                v-if="instituicao?.id"
                class="text-2xl align-middle cursor-pointer hover:text-gray-600"
                @click="$router.push(`/instituicao/${instituicao.id}`)"
            />
        </template>
        <template #conteudo>
            <BaseValue 
                campo="Nome"
                :valor="instituicao?.nome"
                :isCarregando="isCarregando"
            />
            <BaseValue 
                campo="Siga"
                :valor="instituicao?.sigla"
                :isCarregando="isCarregando"
            />
            <BaseValue 
                campo="Tipo"
                :valor="instituicao?.tipo"
                :isCarregando="isCarregando"
            />
        </template>
        <template #rodape>                
        </template>
    </BaseCard>
</template>

<script setup>
import BaseCard from '../components/BaseCard.vue';
import BaseValue from './form/BaseValue.vue';
import { PhBuildings, PhArrowSquareOut } from '@phosphor-icons/vue';

const props = defineProps(['instituicao', 'isCarregando']);
</script>