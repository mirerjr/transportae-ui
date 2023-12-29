<template>
    <div>
        <BaseCard class="w-full mx-auto md:w-5/6 lg:w-4/6 xl:w-3/5">
            <template #cabecalho>
                <PhBuildings class="mr-2" />
                Instituições de Ensino
            </template>
            <template #cabecalho-btn>
                <BaseBtn
                    @click="$router.push('/cadastrar-instituicao')"
                    variante-tamanho="sm"
                >
                    <PhPlus class="mr-0.5" /> Adicionar
                </BaseBtn>
            </template>
            <template #conteudo>
                <div class="flex justify-between mb-2">
                    <div></div>
                    <div class="flex justify-end">
                        <InputPesquisa
                            placeholder="Pesquisar Instituição" 
                            @update:model-value="pesquisarInstituicao"
                        />
                    </div>
                </div>
                <Tabela :colunas="colunas" :carregando="isCarregando">
                    <tr
                        v-for="instituicao in instituicoes"
                        :key="instituicao.nome"
                        class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                    >
                        <td class="w-4 p-4">
                            <input type="checkbox">
                        </td>
                        <td class="px-6 py-4">{{ instituicao.nome ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ instituicao.sigla ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ instituicao.tipoInstituicao ?? 'N/D' }}</td>
                        <td class="px-6 py-4">
                            <button
                                @click="$router.push(`/instituicoes/${instituicao.id}`)"
                                class="flex items-center text-blue-500"
                            >
                                <PhPencilSimple class="me-1" /> Exibir
                            </button>
                        </td>
                    </tr>
                    <tr 
                        v-show="instituicoes.length == 0"
                        class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                    >
                        <td colspan="6" align="center" class="px-6 py-4">Nenhuma instituição foi encontrada</td>
                    </tr>
                </Tabela>
                <div class="mt-4">
                    <Paginacao
                        v-if="instituicoes?.length > 0"
                        :total-paginas="paginacao.totalPaginas"
                        :itens-por-pagina="paginacao.limitePorPagina"
                        :pagina-atual="paginacao.paginaAtual"
                        :total-paginas-visiveis="5"
                        @alterar-pagina="(pagina) => listarInstituicoes(pagina)"
                    />
                </div>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { PhBuildings, PhPencilSimple, PhPlus } from '@phosphor-icons/vue';
import { ref, reactive, onMounted } from 'vue';
import BaseCard from '../components/BaseCard.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import instituicaoService from '../services/instituicao-service';
import InputPesquisa from '../components/table/InputPesquisa.vue';
import Tabela from '../components/table/Tabela.vue';
import Paginacao from '../components/table/Paginacao.vue';

const colunas = ref(['nome', 'sigla', 'Tipo', 'Ação']);
const instituicoes = ref([]);
const isCarregando = ref(false);

const paginacao = reactive({
    paginaAtual: 0,
    totalPaginas: 0,
    limitePorPagina: 0,
});

onMounted(async () => {
    isCarregando.value = true;

    try {
        await listarInstituicoes(1);

    } catch (erro) {
        console.log(erro);

    } finally {
        isCarregando.value = false;
    }
});

async function listarInstituicoes(pagina, termoPesquisa) {
    const resposta = await instituicaoService.listarInstituicoes(pagina, termoPesquisa);
    const dados = resposta.data;

    instituicoes.value = dados.content.map(instituicao => {
        instituicao.tipoInstituicao = instituicaoService.getTipoInstituicao(instituicao.tipoInstituicao);        
        return instituicao;
    });

    paginacao.paginaAtual = dados.number + 1;
    paginacao.totalPaginas = dados.totalPages;
    paginacao.limitePorPagina = dados.numberOfElements;
}

async function pesquisarInstituicao(termo) {
    await listarInstituicoes(paginacao.paginaAtual, termo)
}

</script>