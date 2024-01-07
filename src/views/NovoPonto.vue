<template>
    <div class="grid grid-cols-1 gap-4">
        <BaseCard class="w-full mx-auto md:w-3/6 lg:w-3/5 xl:w-4/12">
            <template #cabecalho>
                <PhMapPin class="mr-2" />
                Novo Ponto de Parada
            </template>
            <template #conteudo>
                <div class="w-full grid grid-cols-1 gap-4 mb-4">
                    <BaseInput
                        v-model="ponto.linhaTransporteId"
                        nome="Linha de transporte"
                        placeholder="Linha de transporte"
                        tipo="select"
                        variante="v2"
                        opcao-exibida="nome"
                        opcao-valor="id"
                        :opcoes="linhas"
                        :erros="errosPonto.linhaTransporteId"
                    />
                    <BaseInput
                        v-model="ponto.nome"
                        nome="Nome"
                        placeholder="Nome do ponto"
                        variante="v2"
                        :erros="errosPonto.nome"
                    />
                </div>
                <div class="w-full grid grid-cols-2 gap-4 mb-4">

                    <BaseInput
                        v-model="ponto.horarioPrevistoIda"
                        nome="Horário previsto (Ida)"
                        tipo="time"
                        variante="v2"
                        :erros="errosPonto.horarioPrevistoIda"
                    />
                    <BaseInput
                        v-model="ponto.horarioPrevistoVolta"
                        nome="Horário previsto (Volta)"
                        tipo="time"
                        variante="v2"
                        :erros="errosPonto.horarioPrevistoVolta"
                    />
                </div>
                <div class="w-full grid grid-cols-1 gap-4 mb-4">
                    <BaseInput
                        v-model="ponto.instituicaoId"
                        nome="Instituição de ensino"
                        placeholder="Instituição de ensino"
                        variante="v2"
                        tipo="select"
                        opcao-exibida="nome"
                        opcao-valor="id"
                        :opcoes="instituicoes"
                        :erros="errosPonto.instituicaoId"
                    />
                </div>
                <span>
                    Possui endereço?
                </span>
                <BaseSwitch
                    @update:model-value="(resultado) => exibirEnderecoForm = resultado"
                />
                <div v-show="exibirEnderecoForm" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <EnderecoForm
                        ref="enderecoForm"
                        v-model="ponto.endereco"
                        :erros="errosEndereco"
                    />
                </div>
                <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <BaseBtn 
                        class="mt-4 lg:w-2/3"
                        variante-tamanho="md"
                        variante-cor="red"
                        @click="$router.back()"
                    >
                        <PhArrowLeft class="mr-1" /> Cancelar
                    </BaseBtn>
                    <BaseBtn 
                        class="mt-4 lg:w-2/3"
                        variante-tamanho="md"
                        variante-cor="green"
                        @click="cadastrar"
                    >
                        <PhCircleNotch v-if="isCarregando" class="animate-spin" /> 
                        <PhPlus v-else class="mr-1" />
                        {{ isCarregando ? 'Cadastrando' : 'Cadastrar' }}
                    </BaseBtn>
                </div>
            </template>
        </BaseCard>
    </div>        
</template>

<script setup>
import { PhArrowLeft, PhCircleNotch, PhMapPin, PhPlus } from '@phosphor-icons/vue';
import { ref, reactive, onMounted } from 'vue';
import BaseSwitch from '../components/form/BaseSwitch.vue';
import EnderecoForm from '../components/form/EnderecoForm.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseValue from '../components/form/BaseValue.vue';
import BaseInput from '../components/form/BaseInput.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import { ErroValidacao } from '../utils/erros';
import linhaService from '../services/linha-service';
import formService from '../services/form-service';
import instituicaoService from '../services/instituicao-service';
import pontoService from '../services/ponto-service';
import { router } from '../routes';

const props = defineProps(['linhaTransporteId']);

const ponto = reactive({
    nome: '',
    horarioPrevistoIda: null,
    horarioPrevistoVolta: null,
    linhaTransporteId: null,
    instituicaoId: null,
    endereco: null,
});

const linhas = ref([]);
const instituicoes = ref([]);

const enderecoForm = ref(null);
const exibirEnderecoForm = ref(false);

const isCarregando = ref(false);

const msgErro = ref("");
const errosPonto = ref(formService.setErros(ponto));
const errosEndereco = ref([]);

onMounted(async () => {
    await listarLinhas();
    await listarInstituicoes();

    if (props.linhaTransporteId) {
        const linha = linhas.value.find(linha => linha.id == props.linhaTransporteId);
        ponto.linhaTransporteId = linha?.id;
    }
})

async function listarInstituicoes() {
    try {
        const resposta = await instituicaoService.listarInstituicoes();
        instituicoes.value = resposta?.data?.content;

    } catch (erro) {
        console.log('Erro ao listar instituições', erro);
        msgErro.value = "Erro ao exibir as instituições.";
    }
}

async function listarLinhas() {
    try {
        const resposta = await linhaService.listarLinhas();
        linhas.value = resposta?.data?.content;

    } catch (erro) {
        console.log('Erro ao listar linhas', erro);
        msgErro.value = "Erro ao exibir as linhas.";
    }
}

async function cadastrar() {
    isCarregando.value = true;
    limparErros()

    const dados = {...ponto} 
    
    if (exibirEnderecoForm.value == true) {
        dados.endereco = enderecoForm.value.endereco;
    }

    try {
        await pontoService.cadastrarPonto(dados);
        isCarregando.value = false;
        router.back();

    } catch (erro) {
        console.log('Erro ao cadastrar ponto', erro);
        msgErro.value = "Erro ao cadastrar ponto.";        

        if (erro instanceof ErroValidacao) {
            handleErroValidacao(erro);
        }

    } finally {
        isCarregando.value = false;
    }
}

function handleErroValidacao(erro) {
    errosEndereco.value = erro.campos;

    for (const { campo, mensagem } of erro.campos) {
        if (errosPonto.value[campo] != null) {
            errosPonto.value[campo].push(mensagem);
        }
    }
}

function limparErros() {
    msgErro.value = "";
    errosPonto.value =  formService.setErros(ponto);
    enderecoForm.value.limparErros();
}
</script>