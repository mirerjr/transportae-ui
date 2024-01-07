
<template>
    <div class="w-full mx-auto md:w-3/6 lg:w-3/5 xl:w-2/5">
        <section class="bg-white font-gudea rounded-2xl p-8 text-gray-800">
            <header class="flex flex-row justify-between mb-6">
                <h3 class=" text-3xl inline-flex items-center">
                    <slot name="cabecalho">
                        <PhUserPlus class="mr-2" />
                        Novo usuário
                    </slot>
                </h3>
            </header>
            <slot name="conteudo">
                <div class="mb-2">
                    <span class="break-words text-xl font-arimo text-red-400">{{ msgErro }}</span>
                </div>
                <form class="w-full flex flex-col items-center" autocomplete="off">
                    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <BaseInput 
                            nome="Nome"
                            placeholder="Nome"
                            variante="v2"
                            v-model="usuario.nome"
                            :erros="errosUsuario.nome"
                        />
                        <BaseInput 
                            nome="E-mail"
                            placeholder="E-mail"
                            variante="v2"
                            v-model="usuario.email"
                            :erros="errosUsuario.email"
                        />
                        <BaseInput 
                            nome="CPF"
                            placeholder="CPF"
                            variante="v2"
                            v-model="usuario.cpf"
                            :erros="errosUsuario.cpf"
                        />
                        <BaseInput 
                            nome="Telefone"
                            placeholder="Telefone"
                            variante="v2"
                            v-model="usuario.telefone"
                            :erros="errosUsuario.telefone"
                        />
                        <BaseInput
                            nome="Data de nascimento"
                            placeholder="Data de nascimento"
                            variante="v2"
                            tipo="date"
                            v-model="usuario.dataNascimento"
                            :erro="errosUsuario.dataNascimento"
                        />
                        <BaseInput
                            nome="Linha"
                            placeholder="Linha de transporte"
                            tipo="select"
                            variante="v2"
                            :opcoes="linhas"
                            opcao-exibida="nome"
                            opcao-valor="id"
                            v-model="usuario.linhaTransporteId"
                            :erros="errosUsuario.linhaTransporteId"
                        />
                    </div>
                    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <BaseSwitch
                            opcao-esquerda="Aluno"
                            opcao-direita="Motorista"
                            @update:model-value="atualizarPerfil"
                            :erros="errosUsuario.perfil"
                        />
                    </div>
                    <div v-show="usuario.perfil == 'ALUNO'" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <BaseInput 
                            nome="Instituição"
                            placeholder="Instituição de ensino"
                            tipo="select"
                            variante="v2"
                            :opcoes="instituicoes"
                            opcao-exibida="nome"
                            opcao-valor="id"
                            v-model="usuario.instituicaoId"
                            :erros="errosUsuario.instituicaoId"
                        />
                        <BaseInput 
                            nome="Matrícula"
                            placeholder="Matrícula"
                            variante="v2"
                            v-model="usuario.matricula"
                            :erros="errosUsuario.matricula"
                        />
                    </div>
                    <div v-show="usuario.perfil == 'ALUNO'" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">

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
            </slot>
            <footer>
                <slot name="rodape" />
            </footer>        
        </section>
    </div>
</template>

<script setup>
import BaseBtn from '../components/form/BaseBtn.vue';
import BaseInput from '../components/form/BaseInput.vue';
import BaseSwitch from '../components/form/BaseSwitch.vue';
import usuarioService from '../services/usuario-service';
import { PhPlus, PhUserPlus, PhArrowLeft, PhCircleNotch } from '@phosphor-icons/vue';
import { ref, reactive, onMounted } from 'vue';
import { router } from '../routes';
import { ErroValidacao } from '../utils/erros';
import EnderecoForm from '../components/form/EnderecoForm.vue';
import instituicaoService from '../services/instituicao-service';
import formService from '../services/form-service';
import linhaService from '../services/linha-service';

const props = defineProps(['instituicaoId', 'linhaTransporteId']);

const usuario  = reactive({
    nome: '',
    email: '',
    cpf: '',
    matricula: '',
    telefone: '',
    dataNascimento: '',
    perfil: 'ALUNO',
    endereco: null,
    instituicaoId: null,
    linhaTransporteId: null,
});

const errosUsuario = ref(formService.setErros(usuario));

const enderecoForm = ref(null);
const errosEndereco = ref([]);

const instituicoes = ref([]);
const linhas = ref([]);

const isCarregando = ref(false);
const msgErro = ref("");

onMounted(async () => {
    await listarInstituicoes();
    await listarLinhas()
    
    if (props.instituicaoId) {
        const instituicao = instituicoes.value.find(instituicao => instituicao.id == props.instituicaoId);
        usuario.instituicaoId = instituicao?.id;
    }
    if (props.linhaTransporteId) {
        const linha = linhas.value.find(linha => linha.id == props.linhaTransporteId);
        usuario.linhaTransporteId = linha?.id;
    }
});

const atualizarPerfil = (opcao) => {
    usuario.perfil = opcao ? 'MOTORISTA' : 'ALUNO';
}

async function listarInstituicoes() {
    try {
        const resposta = await instituicaoService.listarInstituicoes();
        const dados = resposta?.data?.content;

        instituicoes.value = dados

    } catch (erro) {
        console.log('Erro ao listar instituições', erro);
        msgErro.value = "Erro ao exibir as instituições.";
    }
}

async function listarLinhas() {
    try {
        const resposta = await linhaService.listarLinhas();
        const dados = resposta?.data?.content;

        linhas.value = dados

    } catch (erro) {
        console.log('Erro ao listar linhas', erro);
        msgErro.value = "Erro ao exibir as linhas.";
    }
}

async function cadastrar() {
    isCarregando.value = true;
    limparErros();

    try {
        usuario.endereco = usuario.perfil == 'ALUNO' 
            ? enderecoForm.value.endereco
            : null;
        
        usuario.instituicaoId = usuario.perfil == 'ALUNO' 
            ? usuario.instituicaoId
            : null;

        await usuarioService.cadastrarUsuario(usuario);
        router.back();

    } catch (erro) {
        console.log(erro);
        msgErro.value = erro.message;

        if (erro instanceof ErroValidacao) {
            handleErroValidacao(erro);
            return;
        }        

    } finally {
        isCarregando.value = false;
    }
}

function handleErroValidacao(erro) {
    errosEndereco.value = erro.campos;

    for (const { campo, mensagem } of erro.campos) {
        if (errosUsuario.value[campo] != null) {
            errosUsuario.value[campo].push(mensagem);
        }
    }
}

function limparErros() {
    msgErro.value = "";
    errosUsuario.value =  formService.setErros(usuario);
    enderecoForm.value.limparErros();
}
</script>