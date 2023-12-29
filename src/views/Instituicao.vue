<template>
    <div class="grid grid-cols-1 gap-4 justify-items-center xl:gap-36">
        <BaseCard class="w-full lg:w-3/4 xl:w-4/5">
            <template #cabecalho>
                <PhBuildings/>
                Instituição de Ensino
            </template>
            <template #conteudo>
                <BaseValue
                    campo="Nome"
                    :valor="instituicao.nome"
                />
                <BaseValue
                    campo="Sigla"
                    :valor="instituicao.sigla"
                />
                <BaseValue
                    campo="Tipo"
                    :valor="instituicao.tipoInstituicao"
                />
                <BaseValue
                    campo="endereco"
                    :valor="instituicao.endereco"
                />
            </template>
            <template #rodape>                
            </template>
        </BaseCard>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { PhBuildings } from '@phosphor-icons/vue';

import instituicaoService from '../services/instituicao-service';
import BaseValue from '../components/form/BaseValue.vue';
import BaseCard from '../components/BaseCard.vue';

const props = defineProps(['id']);

const instituicao = ref({});

onMounted(async () => {
    await getInstituicao(props.id);
});

async function getInstituicao(id) {
    const resultado = await instituicaoService.getInstituicao(id);
    instituicao.value = resultado.data;
    instituicao.value.tipoInstituicao = instituicaoService.getTipoInstituicao(instituicao.value.tipoInstituicao);
}

</script>