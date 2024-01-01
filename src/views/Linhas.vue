<template>
    <div>
        <BaseCard class="w-full mx-auto md:w-5/6 lg:w-4/6 xl:w-3/5" variante="v2">
            <template #cabecalho>
                <PhBus class="mr-2" />
                Linhas de Transporte
            </template>
            <template #cabecalho-btn>
                <BaseBtn
                    @click="$router.push('/cadastrar-linha')"
                    variante-tamanho="sm"
                >
                    <PhPlus class="mr-0.5" /> Adicionar
                </BaseBtn>
            </template>
            <template #conteudo>
                <div class="flex justify-between mb-2">
                    <div>
                    </div>
                    <div class="flex justify-end">
                        <InputPesquisa
                            placeholder="Pesquisar Linha" 
                            v-model="termoPesquisa"
                            @update:model-value="pesquisarLinha"
                            class="mr-2"
                        />
                        <BaseInput 
                            tipo="select"
                            variante="v2"
                            placeholder="Turno"
                            :opcoes="turnos"
                            v-model="turnoFiltrado"
                            @update:model-value="filtrarTurno"
                        />
                    </div>
                </div>
                <Tabela :colunas="colunas" :carregando="isCarregando">
                    <tr
                        v-for="linha in linhas"
                        :key="linha.id"
                        class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                    >
                        <td class="w-4 p-4">
                            <input type="checkbox">
                        </td>
                        <td class="px-6 py-4">{{ linha?.nome ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ linha?.turno ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ linha?.motorista?.nome ?? 'N/D' }}</td>
                        <td class="px-6 py-4">
                            <button
                                @click="$router.push(`/linha/${linha.id}`)"
                                class="flex items-center text-blue-500"
                            >
                                <PhPencilSimple class="me-1" /> Exibir
                            </button>
                        </td>
                    </tr>
                    <tr 
                        v-show="linhas.length == 0"
                        class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                    >
                        <td colspan="6" align="center" class="px-6 py-4">Nenhuma linha foi encontrada</td>
                    </tr>
                </Tabela>
                <div class="mt-4">
                    <Paginacao
                        v-if="linhas?.length > 0"
                        :total-paginas="paginacao.totalPaginas"
                        :itens-por-pagina="paginacao.limitePorPagina"
                        :pagina-atual="paginacao.paginaAtual"
                        :total-paginas-visiveis="5"
                        @alterar-pagina="(pagina) => listarLinhas(pagina)"
                    />
                </div>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { PhBus, PhPencilSimple, PhPlus } from '@phosphor-icons/vue';
import { ref, reactive, onMounted } from 'vue';
import BaseCard from '../components/BaseCard.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import InputPesquisa from '../components/table/InputPesquisa.vue';
import Tabela from '../components/table/Tabela.vue';
import Paginacao from '../components/table/Paginacao.vue';
import BaseInput from '../components/form/BaseInput.vue';
import linhaService from '../services/linha-service';

const colunas = ref(['nome', 'turno', 'motorista', 'ações']);
const linhas = ref([]);
const isCarregando = ref(false);

const turnos = reactive(getTurnosToSelect());

const termoPesquisa = ref("");
const turnoFiltrado = ref("");

const paginacao = reactive({
    paginaAtual: 0,
    totalPaginas: 0,
    limitePorPagina: 0,
});

onMounted(async () => {
    isCarregando.value = true;

    try {
        await listarLinhas(1);

    } catch (erro) {
        console.log(erro);

    } finally {
        isCarregando.value = false;
    }
});

function getTurnosToSelect() {
    const turnos = Object.values(linhaService.getTurnoLinha())
    return ["Todos",...turnos];
}

async function listarLinhas(pagina) {
    const turno = linhaService.getTurnoLinhaSelecionado(turnoFiltrado.value);
    const resposta = await linhaService.listarLinhas(pagina, termoPesquisa.value, turno);
    const dados = resposta.data;

    linhas.value = dados.content.map(linha => {
        linha.turno = linhaService.getTurnoLinha(linha.turno);
        return linha;
    });

    paginacao.paginaAtual = dados.number + 1;
    paginacao.totalPaginas = dados.totalPages;
    paginacao.limitePorPagina = dados.numberOfElements;
}

async function pesquisarLinha(termo) {
    await listarLinhas(paginacao.paginaAtual, termo)
}

async function filtrarTurno(turno) {
    await listarLinhas(paginacao.paginaAtual, null, turno);
}

</script>