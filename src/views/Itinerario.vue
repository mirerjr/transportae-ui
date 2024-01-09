<!-- Caso não haja itinerário, mostrar a hora atual, e o tempo até o próximo itinerário -->
<!-- com os dados da linha e o motorista que irá conduzir -->
<template>
    <div class="grid grid-cols-1 md:grid-cols-1 justify-items-center">
        <BaseCard class="w-80">
            <template #cabecalho>
                <PhPath class="mr-2 " />
                Itinerário
            </template>
            <template #cabecalho-btn>
                <p class="font-arimo flex items-center">
                    {{ linha?.totalUsuarios }} / {{ linha?.totalAssentos }}
                </p>
            </template>
            <template #conteudo v-if="!isCarregando">
                <!-- {{ itinerario }} -->
                <!-- {{ linha }} -->
                <div class="flex items-center font-gudea ml-1.5">
                    <span class="flex items-center mr-2 font-semibold">
                        <PhBus class="mr-2 text-xl" /> {{ linha?.nome }} -
                        <span class="ml-2 text-base text-gray-700 whitespace-nowrap">
                            {{ itinerario?.codigoVeiculo ?? linha.codigoVeiculo }}
                        </span>
                    </span>
                </div>
                <div class="flex font-roboto mt-2">
                    <ImgUsuario
                        class="mr-2 w-12 h-12 font-normal bg-blue-100"
                        :nome="itinerario?.motorista?.nome"
                    />
                    <span class="text-gray-700">
                        <p class="font-bold">Motorista</p>
                        <p>{{ itinerario?.motorista?.nome ?? "N/D" }}</p>
                    </span>
                </div>
                <div class="ml-2.5">
                    <Timeline>
                        <TimelineItem
                            v-if="pontos.length > 0"
                            v-for="ponto in pontos"
                            :key="ponto.id"
                            :titulo="`${ponto.nome}`"
                        >
                            <span class="flex items-center">
                                {{ getHorarioPrevisto(ponto) }}
                                <!-- <PhCheckCircle class="ml-1 w-5 h-5 text-green-500" /> -->
                            </span>
                        </TimelineItem>
                    </Timeline>
                </div>
            </template>
            <template #rodape>
                <BaseBtn
                    v-if="perfilUsuario == 'MOTORISTA'"
                    variante-cor="blue"
                    variante-tamanho="sm"
                    class="mt-4"
                    @click="proximoPonto()"
                >
                    <PhCheck class="mr-2" />
                    Próximo ponto
                </BaseBtn>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { PhBus, PhCheck, PhCheckCircle, PhPath, PhUsers } from '@phosphor-icons/vue';
import BaseCard from '../components/BaseCard.vue';
import linhaService from '../services/linha-service';
import usuarioService from '../services/usuario-service';
import Timeline from '../components/Timeline.vue';
import TimelineItem from '../components/TimelineItem.vue';
import itinerarioService from '../services/itinerario-service';
import pontoService from '../services/ponto-service';
import filters from '../utils/filters';
import ImgUsuario from '../components/ImgUsuario.vue';
import BaseBtn from '../components/form/BaseBtn.vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const msgErro = ref('');
const isCarregando = ref(false);

const perfilUsuario = ref('');

const itinerario = ref({});
const linha = ref({});
const pontos = ref([]);

const horaAtual = ref('');

onMounted(async () => {    
    perfilUsuario.value = usuarioService.getPerfilUsuario();
    getItinerario()
});

function getHorarioPrevisto(ponto) {
    let horarioPrevisto = ponto.horarioPrevistoIda;

    if (itinerario.value.tipoItinerario == 'VOLTA') {
       horarioPrevisto = ponto.horarioPrevistoVolta; 
    }

    return filters.formatarHoraMinuto(horarioPrevisto);
}

async function getItinerario() {
    isCarregando.value = true;

    try {
        let resultado = await itinerarioService.getItinerario(props.id)
        itinerario.value = resultado?.data

        resultado = await linhaService.getLinha(itinerario.value.linhaTransporteId);
        linha.value = resultado?.data;

        resultado = await pontoService.listarPontosPorLinha(itinerario.value.linhaTransporteId);
        pontos.value = resultado?.data;

    } catch (erro) {
        console.log(erro);
        msgErro.value = "Não foi possível carregar o itinerário. Por favor, atualize a página";

    } finally {
        isCarregando.value = false;
    }
}

async function proximoPonto() {
    // TODO: implementar
}

</script>