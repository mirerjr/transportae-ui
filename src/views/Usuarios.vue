<template>
    <div>
        <BaseCard class="mb-8">
            <template #cabecalho>
                Usuários
            </template>
            <template #conteudo>
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
                    </Tabela>
            </template>
        </BaseCard>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { PhPencilSimple } from '@phosphor-icons/vue';
import Tabela from "../components/table/Tabela.vue";
import BaseCard from "../components/BaseCard.vue";
import ImgUsuario from "../components/ImgUsuario.vue";
import usuarioService from "../services/usuario-service";

const colunas = ref(['Nome', 'Perfil', 'Matrícula', 'Telefone', 'Ação']);
const usuarios = ref();
const isCarregando = ref(false);

onMounted(async () => {
    isCarregando.value = true;

    try {
        const resposta = await usuarioService.listarUsuarios();
        usuarios.value = resposta.data.content;

    } catch (erro) {
        console.log(erro);

    } finally {
        isCarregando.value = false;
    }
});
</script>