<template>
    <div>
        <BaseCard class="w-full mx-auto md:w-3/6 lg:w-3/5 xl:w-2/5">
            <template #cabecalho>
                <PhBuildings class="mr-2" />
                Nova Instituição
            </template>
            <template #conteudo>
                <div class="max-w-sm mb-2">
                    <span class="break-words text-xl font-arimo text-red-400">{{ msgErro }}</span>
                </div>
                <form class="w-full flex flex-col items-center" autocomplete="off">
                    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <BaseInput 
                            nome="Nome"
                            placeholder="Nome"
                            variante="v2"
                            v-model="instituicao.nome"
                            :erros="errosInstituicao.nome"
                        />
                        <BaseInput 
                            nome="Sigla"
                            placeholder="Sigla"
                            variante="v2"
                            v-model="instituicao.sigla"
                            :erros="errosInstituicao.sigla"
                        />
                        <BaseInput
                            nome="Tipo"
                            placeholder="Selecione o tipo"
                            variante="v2"
                            tipo="select"
                            :opcoes="tiposInstituicao"
                            v-model="instituicao.tipoInstituicao"
                            :erros="errosInstituicao.tipoInstituicao"
                        />
                    </div>
                    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <EnderecoForm
                            ref="enderecoForm"
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
                </form>
            </template>
            <template #rodape>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { PhPlus, PhBuildings, PhArrowLeft, PhCircleNotch } from '@phosphor-icons/vue';
import { ref, reactive } from 'vue';
import { router } from '../routes';
import { ErroValidacao } from '../utils/erros';

import instituicaoService from '../services/instituicao-service';
import BaseCard from '../components/BaseCard.vue';
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseInput from '../components/form/BaseInput.vue';
import EnderecoForm from '../components/form/EnderecoForm.vue';

const tiposInstituicao = reactive(
    Object.values(instituicaoService.getTipoInstituicao())
);

const instituicao = reactive({
    nome: '',
    sigla: '',
    tipoInstituicao: null,
    endereco: null
});

const errosInstituicao = ref(setErrosInstituicao(instituicao));

const enderecoForm = ref(null);
const errosEndereco = ref([]);

const isCarregando = ref(false);
const msgErro = ref("");

async function cadastrar() {
    limparErros();
    isCarregando.value = true;

    try {
        const tipoSelecionado = instituicaoService.getTipoInstituicaoSelecionado(instituicao.tipoInstituicao);
        instituicao.tipoInstituicao = tipoSelecionado;
        instituicao.endereco = enderecoForm.value.endereco;

        await instituicaoService.cadastrarInstituicao(instituicao);

        router.back();

    } catch (erro) {
        console.log(erro);
        msgErro.value = erro.message;

        if (erro instanceof ErroValidacao) {
            instituicao.tipoInstituicao = instituicaoService.getTipoInstituicao(instituicao.tipoInstituicao);
            handleErroValidacao(erro);
        }        

    } finally {
        isCarregando.value = false;
    }
}

function handleErroValidacao(erro) {
    errosEndereco.value = erro.campos;
    
    for (const { campo, mensagem } of erro.campos) {
        if (errosInstituicao.value[campo] != null) {
            errosInstituicao.value[campo].push(mensagem);
        }
    }
}

function setErrosInstituicao(dadosInstituicao) {
    const erros = {};

    for (const campo in dadosInstituicao) {
        const isCampoAninhado = typeof dadosInstituicao[campo] === 'object' && dadosInstituicao[campo] !== null;

        if (isCampoAninhado) {
            erros[campo] = setErrosInstituicao(dadosInstituicao[campo]);
        } else {
            erros[campo] = [];
        }
    }

    return erros;
}

function limparErros() {
    msgErro.value = "";
    errosInstituicao.value =  setErrosInstituicao(instituicao);
    enderecoForm.value.limparErros();
}
</script>