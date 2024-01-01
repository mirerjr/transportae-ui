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
                campo="Sigla"
                :valor="instituicao?.sigla"
                :isCarregando="isCarregando"
            />
            <BaseValue 
                campo="Tipo"
                :valor="tipoInstituicao"
                :isCarregando="isCarregando"
            />
        </template>
        <template #rodape>                
        </template>
    </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import BaseCard from '../components/BaseCard.vue';
import instituicaoService from '../services/instituicao-service';
import BaseValue from './form/BaseValue.vue';
import { PhBuildings, PhArrowSquareOut } from '@phosphor-icons/vue';

const props = defineProps(['instituicao', 'isCarregando']);
const tiposInstituicao = instituicaoService.getTipoInstituicao();

const tipoInstituicao = computed(() => {
    return tiposInstituicao[props?.instituicao?.tipoInstituicao];
});
</script>