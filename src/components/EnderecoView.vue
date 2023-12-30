<template>
    <BaseCard>
        <template #cabecalho>
            <PhMapPin />
            Endereço
        </template>
        <template #conteudo>
            <section class="grid grid-cols-2">
                <BaseValue
                    campo="Endereço"
                    :valor="props.endereco?.descricao"
                    :carregamento="props.isCarregando"
                />
                <BaseValue
                    campo="Número"
                    :valor="props.endereco?.numero"
                    :carregamento="props.isCarregando"
                />
                <BaseValue
                    campo="Complemento"
                    :valor="props.endereco?.complemento"
                    :carregamento="props.isCarregando"
                />                
                <BaseValue
                    campo="CEP"
                    :valor="props.endereco?.cep"
                    :carregamento="props.isCarregando"
                />
                <BaseValue
                    campo="Bairro"
                    :valor="props.endereco?.bairro"
                    :carregamento="props.isCarregando"
                />
                <BaseValue
                    campo="Cidade"
                    :valor="props.endereco?.cidade"
                    :carregamento="props.isCarregando"
                />                    
            </section>
        </template>
        <template #rodape>                
        </template>
    </BaseCard>
</template>

<script setup>
import BaseCard from './BaseCard.vue';
import { PhMapPin } from '@phosphor-icons/vue';
import BaseValue from './form/BaseValue.vue';

const props = defineProps(['endereco', 'isCarregando']);
</script>