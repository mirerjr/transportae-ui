<template>
    <div>
        <BaseCard class="w-full mx-auto md:w-3/6 lg:w-2/5 xl:w-3/12">
            <template #cabecalho>
                <PhBus class="mr-2"/>
                Nova Linha
            </template>
            <template #cabecalho-btn>
                <IdentificadorLinha
                    :linha="linha"
                    :turnos="turnos"
                    :motorista="motoristaSelecionado"
                />
            </template>
            <template #conteudo>
                <div class="max-w-sm mb-2">
                    <span class="break-words text-lg font-arimo text-red-400">{{ msgErro }}</span>
                </div>
                <form class="w-full grid grid-cols-1 justify-items-center gap-4" autocomplete="off">
                    <div class="w-full grid grid-cols-2 gap-4">
                        <BaseInput 
                            nome="Nome"
                            placeholder="Nome"
                            variante="v2"
                            v-model="linha.nome"
                            :erros="errosLinha.nome"
                        />
                        <BaseInput 
                            nome="Turno"
                            placeholder="Selecione o turno"
                            variante="v2"
                            tipo="select"
                            :opcoes="turnos"
                            v-model="linha.turno"
                            :erros="errosLinha.turno"
                        />
                    </div>
                    <div class="w-full grid grid-cols-1 gap-4">
                        <BaseInput
                            nome="Motorista"
                            placeholder="Motorista responsável"
                            variante="v2"
                            tipo="select"
                            v-model="linha.motoristaId"
                            opcao-exibida="nome"
                            opcao-valor="id"
                            :opcoes="motoristas"
                            :erros="errosLinha.motoristaId"
                        />
                    </div>
                    <div class="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                        <BaseBtn
                            class="mt-4"
                            variante-tamanho="md"
                            variante-cor="red"
                            @click="$router.back()"
                        >
                            <PhArrowLeft class="mr-1" /> Cancelar
                        </BaseBtn>
                        <BaseBtn 
                            class="mt-4"
                            variante-tamanho="md"
                            variante-cor="green"
                            @click="cadastrar"
                        >
                            <PhArrowRight class="mr-1" />
                            Avançar
                        </BaseBtn>
                    </div>
                </form>
            </template>
            <template #rodape>
            </template>
        </BaseCard>        
    </div>    
</template>

<script setup>
import BaseCard from '../components/BaseCard.vue';
import BaseInput from '../components/form/BaseInput.vue';
import linhaService from '../services/linha-service';
import { ref, reactive, onMounted, computed } from 'vue';
import { PhArrowLeft, PhArrowRight, PhBus, PhCircleNotch, PhPlus } from '@phosphor-icons/vue';
import IdentificadorLinha from '../components/IdentificadorLinha.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import usuarioService from '../services/usuario-service';
import formService from '../services/form-service';
import { router } from '../routes';
import { ErroValidacao } from '../utils/erros';

const isCarregando = ref(false);
const msgErro = ref('');

const linha = reactive({
    nome: '',
    turno: '',
    motoristaId: null,
});

const turnos = reactive(getTurnos());
const motoristas = ref([]);
const errosLinha = ref(formService.setErros(linha));

const motoristaSelecionado = computed(() => {
    return motoristas.value.find(motorista => motorista.id == linha.motoristaId);
});

onMounted(() => {
    getMotoristas();
});

function getTurnos() {
    return Object.values(linhaService.getTurnoLinha());
}

function getMotoristas() {
    usuarioService.getMotoristas()
        .then(resposta => {
            motoristas.value = resposta.data;
        })
        .catch(erro => {
            msgErro.value = erro.response.data.message;
        });
}

async function cadastrar() {
    limparErros();
    isCarregando.value = true;
    
    const turnoSelecionado = linha.turno;
    
    try {
        linha.turno = linhaService.getTurnoLinhaSelecionado(turnoSelecionado);

        const resposta = await linhaService.cadastrarLinha(linha);
        const linhaId = resposta.data?.id;

        if (!linhaId) { throw new Error("Falha ao cadastrar a linha"); }

        router.back();

        //TODO: redirecionar para a pág que cadastra o itinerário da linha
        // router.push(`/linha/${linhaId}`);

    } catch (erro) {
        linha.turno = turnoSelecionado;
        msgErro.value = erro.message;
        console.error(erro);

        if (erro instanceof ErroValidacao) {
            handleErroValidacao(erro);
        }

    } finally {
        isCarregando.value = false;
    }
}

function handleErroValidacao(erro) {
    for (const { campo, mensagem } of erro.campos) {
        console.log(errosLinha.value, errosLinha.value[campo]);
        if (errosLinha.value[campo] != null) {
            errosLinha.value[campo].push(mensagem);
        }
    }
}

function limparErros() {
    errosLinha.value = formService.setErros(linha);
}

</script>