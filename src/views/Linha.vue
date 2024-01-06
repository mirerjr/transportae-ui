<template>
    <div class="grid grid-cols-1 md:grid-cols-1 justify-items-center gap-4 md:gap-8">
        <BaseCard class="w-full md:w-8/12 lg:w-6/12 xl:w-4/12">
            <template #cabecalho>
                <PhBus class="mr-2"/>
                Linha
            </template>
            <template #cabecalho-btn>
                <span class="flex items-center">
                    <IdentificadorLinha
                        :linha="linha"
                        class="text-lg"
                    />
                </span>
            </template>
            <template #conteudo>
                <!-- TODO: Ativar Linha -->
            </template>
        </BaseCard>
        <BaseCard  class="w-full md:w-8/12 lg:w-6/12 xl:w-4/12">
            <template #cabecalho>
                <PhUser class="mr-2"/>
                Usuários
            </template>
            <template #cabecalho-btn>
                <div class="font-roboto flex items-center">
                    {{ linha?.totalUsuarios }} / {{ linha?.totalAssentos }}
                    <div class="w-8 ml-2">
                        <BaseBtn
                            v-show="linha.totalUsuarios < linha.totalAssentos"
                            @click="adicionarAluno()"
                            variante-tamanho="sm"
                            variante-cor="blue"
                        >
                            <PhPlus />
                        </BaseBtn>
                    </div>
                </div>
            </template>
            <template #conteudo>
                <!-- TODO: remover usuários da linha -->
                <!-- Uma linha só poderá ser ativada caso tenha motorista e alunos -->
                <!-- Na tela de usuários, poder adicionar a uma linha existente -->

                <ul class="mt-4 grid grid-cols-2">
                    <li 
                        v-for="usuario in usuarios" 
                        :key="usuario.id"
                        class="flex items-center p-2 mb-2 rounded-lg shadow-sm text-gray-700"
                        :class="isMotorista(usuario) ? '' : ''"
                    >
                        <ImgUsuario
                            v-if="isMotorista(usuario)"
                            :nome="usuario.nome"
                            :class="'border-red-200'"
                            :icone="PhSteeringWheel"
                        />
                        <ImgUsuario
                            v-else
                            :nome="usuario.nome"
                            :class="'border-blue-100'"
                            :icone="PhStudent"
                        />
                        <div class="flex flex-col ml-2">
                            <span class="text-sm xl:text-base text-gray-800 whitespace-nowrap">
                                {{ usuario.nome }}
                            </span>
                            <span 
                                class="text-xs xl:text-sm flex items-center "
                                :class="isMotorista(usuario) ? 'text-red-300' : 'text-blue-300'"
                            >
                                {{ usuario.perfil }}
                            </span>
                        </div>
                        <!-- TODO: definir as opções para cada usuário -->
                        <!-- <button
                            @click="$router.push(`/perfil/${usuario.id}`)"
                            class="flex items-center text-blue-500"
                        >
                            <PhPencilSimple class="me-1" /> Exibir
                        </button> -->
                    </li>
                </ul>
            </template>
        </BaseCard>
    </div>
    <!-- TODO: Adição dos pontos -->
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import { PhPlus, PhBus, PhStudent, PhSteeringWheel, PhUser } from '@phosphor-icons/vue';

import linhaService from '../services/linha-service';
import BaseValue from '../components/form/BaseValue.vue';
import BaseCard from '../components/BaseCard.vue';
import EnderecoView from '../components/EnderecoView.vue';
import IdentificadorLinha from '../components/IdentificadorLinha.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import { router } from '../routes';
import ImgUsuario from '../components/ImgUsuario.vue';

const props = defineProps(['id']);

const linha = ref({});
const usuarios = ref([]);

const isCarregando = ref(true);

onMounted(async () => {
    getLinha(props.id);
    listarUsuarios(props.id);
});

async function getLinha(id) {
    isCarregando.value = true;

    const resultado = await linhaService.getLinha(id);
    linha.value = resultado.data;
    linha.value.turno = linhaService.getTurnoLinha(linha.value.turno);

    isCarregando.value = false;
}

function adicionarAluno() {
    router.push({
        path: '/cadastrar-usuario',
        query: {
            linhaId: props.id,
        }
    })
}

async function listarUsuarios(id) {
    const resultado = await linhaService.listarUsuariosVinculados(id);
    usuarios.value = resultado.data;
}

function isMotorista(usuario){
    return usuario.perfil == 'MOTORISTA';
}
</script>