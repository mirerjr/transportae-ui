<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div class="grid gap-4 md:gap-8 md:col-span-1 md:justify-items-end">
            <BaseCard class="w-full lg:w-7/12">
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
                class="w-full lg:w-7/12"
            />
        </div>
        <BaseCard class="w-full lg:w-7/12">
            <template #cabecalho>
                <PhStudent />
                Alunos
            </template>
            <template #cabecalho-btn>
                <BaseBtn
                    @click="adicionarAluno()"
                    variante-tamanho="sm"
                    variante-cor="blue"
                >
                    <PhPlus />
                </BaseBtn>
            </template>
            <template #conteudo>
                <ul>
                    <li 
                        v-for="aluno in alunos" 
                        :key="aluno.id"
                        class="flex justify-between items-center border-b border-gray-100 py-2"
                    >
                        {{ aluno.nome }}
                        <button
                            @click="$router.push(`/perfil/${aluno.id}`)"
                            class="flex items-center text-blue-500"
                        >
                            <PhPencilSimple class="me-1" /> Exibir
                        </button>
                    </li>
                </ul>
            </template>
        </BaseCard>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { PhBuildings, PhPencilSimple, PhPlus, PhStudent } from '@phosphor-icons/vue';

import instituicaoService from '../services/instituicao-service';
import BaseValue from '../components/form/BaseValue.vue';
import BaseCard from '../components/BaseCard.vue';
import EnderecoView from '../components/EnderecoView.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import { router } from '../routes';

const props = defineProps(['id']);

const instituicao = ref({});
const alunos = ref([]);
const isCarregando = ref(true);

onMounted(async () => {
    getInstituicao(props.id);
    listarAlunos(props.id);
});

async function getInstituicao(id) {
    isCarregando.value = true;

    const resultado = await instituicaoService.getInstituicao(id);
    instituicao.value = resultado.data;
    instituicao.value.tipoInstituicao = instituicaoService.getTipoInstituicao(instituicao.value.tipoInstituicao);

    isCarregando.value = false;
}

async function listarAlunos(id) {
    const resultado = await instituicaoService.listarAlunosVinculados(id);
    alunos.value = resultado.data;
}

function adicionarAluno() {
    router.push({
        path: '/cadastrar-usuario',
        query: {
            instituicaoId: props.id,
        }
    })
}
</script>