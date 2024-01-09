<template>
    <div class="grid grid-cols-1 gap-4 justify-items-center xl:gap-36">
        <BaseCard class="w-full lg:w-3/4 xl:w-4/5" variante="v2">
            <template #cabecalho>
                <PhPath class="mr-2" />
                Itinerários
            </template>

            <template #conteudo>
                <Tabela :colunas="colunasItinerario" :carregando="isCarregando">
                    <tr 
                        v-for="itinerario in itinerarios"
                        :key="itinerario.id"
                        class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                    >
                        <td></td>
                        <td class="px-6 py-4">{{ itinerario?.codigoVeiculo ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ itinerario?.tipoItinerario ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ itinerario?.ultimoStatus ?? 'N/D' }}</td>
                        <td class="px-6 py-4">{{ itinerario?.motorista?.nome ?? 'N/D' }}</td>
                    </tr>
                    <tr 
                        v-show="itinerarios.length == 0"
                        class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                    >
                        <td colspan="6" align="center" class="px-6 py-4">Nenhum Itinerário foi encontrado</td>
                    </tr>
                </Tabela>
                <div class="mt-4">
                    <Paginacao
                        v-if="usuarios?.length > 0"
                        :total-paginas="paginacao.totalPaginas"
                        :itens-por-pagina="paginacao.limitePorPagina"
                        :pagina-atual="paginacao.paginaAtual"
                        :total-paginas-visiveis="5"
                        @alterar-pagina="(pagina) => listarUsuarios(pagina)"
                    />
                </div>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import BaseCard from '../components/BaseCard.vue';
import Tabela from '../components/table/Tabela.vue';
import itinerarioService from '../services/itinerario-service';
import usuarioService from '../services/usuario-service';

const colunasItinerario = ref(['Código do Veículo', 'Tipo', 'Último Status', 'Motorista']);
const itinerarios = ref([]);
const isCarregando = ref(false);

const paginacao = reactive({
    paginaAtual: 0,
    totalPaginas: 0,
    limitePorPagina: 0,
})

onMounted(async () => {
    isCarregando.value = true;
    try {
        const perfilUsuario = usuarioService.getPerfilUsuario();
        const idUsuario = usuarioService.getIdUsuario();

        let resposta

        if (perfilUsuario == 'ADMIN') {
            resposta = await itinerarioService.listarItinerarios();
        } else {
            resposta = await itinerarioService.listarItinerarioPorUsuario(idUsuario);
        }

        preencherDados(resposta.data);

    } catch (erro) {
        console.error(erro);

    } finally {
        isCarregando.value = false;
    }
});

async function preencherDados(dados) {
    itinerarios.value = dados.content;
    paginacao.paginaAtual = dados.number + 1;
    paginacao.totalPaginas = dados.totalPages;
    paginacao.limitePorPagina = dados.numberOfElements;
}
</script>
