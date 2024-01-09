<template>
    <div class="w-full md:w-5/12 lg:w-4/12 xl:w-3/12 mx-auto grid gap-4">
        <BaseCard>
            <template #cabecalho>
                <PhHouse class="mr-2" />
                Início
            </template>
            <template #conteudo>
                <div v-if="perfilUsuario == 'MOTORISTA'">
                    <span class="text-xl text-gray-700">
                    <!-- Existe um itinerário em andamento -->
                        <BaseBtn variante-cor="green" class="mt-4" @click="cadastrarItinerario">
                            <PhPath class="mr-2" />
                            Iniciar itinerário
                        </BaseBtn>
                    </span>
                </div>
            </template>
        </BaseCard>
        <BaseCard>
            <template #cabecalho>
                <PhBus class="mr-2" />
                Minhas Linhas
            </template>
            <template #conteudo>
                <span class="text-2xl font-gudea">
                    
                </span>
                <div class="max-w-sm mb-2">
                    <span class="break-words text-lg font-arimo text-red-400">{{ msgErro }}</span>
                </div>
                <div 
                    v-if="linhas.length > 0"
                    v-for="linha in linhas"
                    :key="linha.id"
                    class="flex flex-col mt-4 shadow-sm rounded-lg p-2.5 hover:pt-3 hover:shadow-md cursor-pointer"
                >
                    <div class="flex">
                        <IdentificadorLinha :linha="linha" :motorista="linha?.motorista"/>
                        <div class="flex flex-col pl-4 py-0.5 mt-2 font-arimo overflow-x-clip">
                            <span class="flex items-center text-base text-gray-700">
                                <PhBus class="mr-2 text-xl" />
                                {{ linha?.codigoVeiculo ?? 'N/D' }}
                            </span>
                            <span v-if="perfilUsuario == 'ALUNO'" class="flex items-center text-base text-gray-700 whitespace-nowrap">
                                <PhSteeringWheel class="mr-2 text-xl" /> 
                                {{ linha?.motorista?.nome ? $filters.getPrimeiroUltimoNome(linha?.motorista?.nome) : 'N/D' }}
                            </span>
                            <span v-else  class="flex items-center text-base text-gray-700 whitespace-nowrap">
                                <PhUsers class="mr-2 text-xl" />
                                {{ linha?.totalUsuarios ?? 'X' }} / {{ linha?.totalAssentos ?? 'X' }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span class="text-sm text-gray-700">
                            <!-- Status: Próximo itinerário: 21/01/2024 -->
                        </span>
                    </div>
                </div>
            </template>            
        </BaseCard>
    </div>       
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { PhBus, PhHouse, PhPath, PhSteeringWheel, PhUsers } from '@phosphor-icons/vue';
import BaseCard from '../components/BaseCard.vue';
import IdentificadorLinha from '../components/IdentificadorLinha.vue';
import linhaService from '../services/linha-service';
import usuarioService from '../services/usuario-service';
import itinerarioService from '../services/itinerario-service';
import BaseBtn from '../components/form/BaseBtn.vue';
import { router } from '../routes';

const msgErro = ref('');
const isCarregando = ref(false);

const nomeUsuario = ref('')
const perfilUsuario = ref('');
const linhas = ref({});

onMounted(async () => {    
    perfilUsuario.value = usuarioService.getPerfilUsuario();
    await getLinhas();   
});

async function getLinhas() {
    isCarregando.value = true;

    try {
        const id = usuarioService.getIdUsuario();
        const resultado = await usuarioService.getLinhas(id)
        linhas.value = resultado?.data;

        for (const linha of linhas.value) {
            const resposta = await linhaService.getMotorista(linha.id);
            linha.motorista = resposta?.data[0];

            const itinerario = await itinerarioService.getItinerarioEmAndamentoPorLinha(linha.id);
            linha.itinerario = itinerario?.data[0];
        }

    } catch (erro) {
        console.log(erro);
        msgErro.value = "Não foi possível carregar todos os dados. Por favor, atualize a página";

    } finally {
        isCarregando.value = false;
    }
}

async function cadastrarItinerario() {
    const idLinha = linhas.value[0].id;

    try {
        const novoItinerario = formatarItinerarioParaCadastro();
        const resposta = await itinerarioService.cadastrarItinerario(novoItinerario);

        const itinerario = resposta.data;

        if (itinerario) {
            router.push(`/itinerario/${itinerario.id}`);
        }

    } catch (erro) {
        console.log(erro);
        msgErro.value = "Não foi possível iniciar o itinerário. Por favor, tente novamente";
    }
}

function formatarItinerarioParaCadastro() {
    const itinerario = {
        linhaTransporteId: linhas.value[0].id,
        tipoItinerario: "IDA",
    }

    return itinerario;
}

</script>