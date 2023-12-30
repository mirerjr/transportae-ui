<template>
    <BaseCard>
        <template #cabecalho>
            <PhBuildings/>
            Instituição
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
import BaseValue from '../components/form/BaseValue.vue';
import { PhBuildings } from '@phosphor-icons/vue';

const props = defineProps(['instituicao', 'isCarregando']);
</script>