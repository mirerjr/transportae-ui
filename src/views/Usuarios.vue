<template>
    <div>
        <BaseCard class="mb-8">
            <template #cabecalho>
                Usuários
            </template>
            <template #conteudo>
                    <div class="flex justify-end mb-2">
                        <InputPesquisa 
                            placeholder="Pesquisar Usuário" 
                            @update:model-value="pesquisarUsuario"
                        />
                    </div>
                    <Tabela :colunas="colunas" :carregando="isCarregando">
                        <tr 
                            v-for="usuario in usuarios"
                            :key="usuario.nome"
                            class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                        >
                            <td class="w-4 p-4">
                                <input type="checkbox">
                            </td>
                            <td class="flex items-center px-6 py-4 whitespace-nowrap">
                                <ImgUsuario :nome="usuario.nome ?? 'N/D'" />
                                <div class="ps-3">
                                    <div class="font-bold">{{ usuario.nome ?? 'N/D' }}</div>
                                    <div class="text-gray-600">{{ usuario.email ?? 'N/D' }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4">{{ usuario.perfil ?? 'N/D' }}</td>
                            <td class="px-6 py-4">{{ usuario.matricula ?? 'N/D' }}</td>
                            <td class="px-6 py-4">{{ usuario.telefone ?? 'N/D' }}</td>
                            <td class="px-6 py-4">
                                <button class="flex items-center text-blue-500">
                                    <PhPencilSimple class="me-1" /> Editar
                                </button>
                            </td>
                        </tr>
                        <tr 
                            v-show="usuarios.length == 0"
                            class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-10"
                        >
                            <td colspan="6" align="center" class="px-6 py-4">Nenhum usuário foi encontrado</td>
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
import { ref, reactive, onMounted } from "vue";
import { PhPencilSimple } from '@phosphor-icons/vue';
import Tabela from "../components/table/Tabela.vue";
import BaseCard from "../components/BaseCard.vue";
import Paginacao from "../components/table/Paginacao.vue";
import ImgUsuario from "../components/ImgUsuario.vue";
import usuarioService from "../services/usuario-service";
import InputPesquisa from "../components/table/InputPesquisa.vue";

const colunas = ref(['Nome', 'Perfil', 'Matrícula', 'Telefone', 'Ação']);
const usuarios = ref([]);
const isCarregando = ref(false);

const paginacao = reactive({
    paginaAtual: 0,
    totalPaginas: 0,
    limitePorPagina: 0,
})


onMounted(async () => {
    isCarregando.value = true;

    try {
        await listarUsuarios(1);

    } catch (erro) {
        console.log(erro);

    } finally {
        isCarregando.value = false;
    }
});

async function listarUsuarios(pagina, termoPesquisa) {
    const resposta = await usuarioService.listarUsuarios(pagina, termoPesquisa);
    const dados = resposta.data;

    usuarios.value = dados.content;
    paginacao.paginaAtual = dados.number + 1;
    paginacao.totalPaginas = dados.totalPages;
    paginacao.limitePorPagina = dados.numberOfElements;
}

async function pesquisarUsuario(termo) {
    await listarUsuarios(paginacao.paginaAtual, termo)
}
</script>