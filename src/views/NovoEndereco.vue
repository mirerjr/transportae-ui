<template>
    <div class="w-full px-0 md:px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BaseCard class="w-full">    
            <template #cabecalho>
                <PhMapPin class="mr-2" />
                Cadastrar Endereço
            </template>
            
            <template #conteudo>
                <div class="grid sm:grid-cols-2 gap-4">
                    <EnderecoForm 
                        v-model="endereco"
                        :erros="errosEndereco"
                    />
                </div>
            </template>
        </BaseCard>
        <BaseCard class="w-full lg:col-span-2">    
            <template #cabecalho>
                <PhMapPin class="mr-2" />
                Mapa
            </template>
            
            <template #conteudo>
                <Map />
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { PhMapPin } from '@phosphor-icons/vue';
import BaseCard from '../components/BaseCard.vue';
import EnderecoForm from '../components/form/EnderecoForm.vue';
import { ref } from 'vue';
import Map from '../components/Map.vue';

const endereco = ref(null);
const errosEndereco = ref([]);
</script>