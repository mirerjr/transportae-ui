<template>
    <div class="grid grid-cols-1 gap-4 justify-items-center">
        <BaseCard class="w-full lg:w-3/4 xl:w-2/6">
            <template #cabecalho>
                <PhBuildings/>
                Instituição de Ensino
            </template>
            <template #conteudo>
                <BaseValue
                    campo="Nome"
                    :valor="instituicao.nome"
                    :carregamento="isCarregando"
                />
                <BaseValue
                    campo="Sigla"
                    :valor="instituicao.sigla"
                    :carregamento="isCarregando"
                />
                <BaseValue
                    campo="Tipo"
                    :valor="instituicao.tipoInstituicao"
                    :carregamento="isCarregando"
                />
            </template>
            <template #rodape>                
            </template>
        </BaseCard>
        <EnderecoView
            :endereco="instituicao?.endereco"
            :isCarregando="isCarregando"
            class="w-full lg:w-3/4 xl:w-2/6"
        />
        <!-- TODO: View de alunos matriculados -->
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { PhBuildings } from '@phosphor-icons/vue';

import instituicaoService from '../services/instituicao-service';
import BaseValue from '../components/form/BaseValue.vue';
import BaseCard from '../components/BaseCard.vue';
import EnderecoView from '../components/EnderecoView.vue';

const props = defineProps(['id']);

const instituicao = ref({});
const isCarregando = ref(true);

onMounted(async () => {
    await getInstituicao(props.id);
});

async function getInstituicao(id) {
    isCarregando.value = true;

    const resultado = await instituicaoService.getInstituicao(id);
    instituicao.value = resultado.data;
    instituicao.value.tipoInstituicao = instituicaoService.getTipoInstituicao(instituicao.value.tipoInstituicao);

    isCarregando.value = false;
}

</script>