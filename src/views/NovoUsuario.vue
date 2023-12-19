
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
                            nome="Matrícula"
                            placeholder="Matrícula"
                            variante="v2"
                            v-model="usuario.matricula"
                            :erros="errosUsuario.matricula"
                        />
                        <BaseInput
                            nome="Data de nascimento"
                            placeholder="Data de nascimento"
                            variante="v2"
                            tipo="date"
                            v-model="usuario.dataNascimento"
                            :erro="errosUsuario.dataNascimento"
                        />
                        <BaseSwitch
                            opcao-esquerda="Aluno"
                            opcao-direita="Motorista"
                            @update:model-value="atualizarPerfil"
                            :erros="errosUsuario.perfil"
                        />
                    </div>
                    <div v-show="usuario.perfil == 'ALUNO'" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <BaseInput
                            nome="Endereço"
                            placeholder="Endereço"
                            variante="v2"
                            v-model="usuario.endereco.descricao"
                            :erro="errosUsuario.endereco.descricao"
                        />
                        <BaseInput
                            nome="Número"
                            placeholder="Número"
                            variante="v2"
                            v-model="usuario.endereco.numero"
                            :erro="errosUsuario.endereco.numero"
                        />
                        <BaseInput
                            nome="Bairro"
                            placeholder="Bairro"
                            variante="v2"
                            v-model="usuario.endereco.bairro"
                            :erro="errosUsuario.endereco.bairro"
                        />
                        <BaseInput
                            nome="Cidade"
                            placeholder="Cidade"
                            variante="v2"
                            tipo="select"
                            :opcoes="cidades"
                            v-model="usuario.endereco.cidade"
                            :erro="errosUsuario.endereco.cidade"
                        />
                        <BaseInput
                            nome="Complemento"
                            placeholder="Complemento"
                            variante="v2"
                            v-model="usuario.endereco.complemento"
                            :erro="errosUsuario.endereco.complemento"
                        />
                        <BaseInput
                            nome="CEP"
                            placeholder="CEP"
                            variante="v2"
                            v-model="usuario.endereco.cep"
                            :erro="errosUsuario.endereco.cep"
                        />
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
import cidades from '../utils/cidades';
import usuarioService from '../services/usuario-service';
import apiConsumer from '../services/api-consumer';
import { PhPlus, PhUserPlus, PhArrowLeft } from '@phosphor-icons/vue';
import { ref, reactive } from 'vue';
import { router } from '../routes';
import { ErroValidacao } from '../utils/erros';

const usuario = reactive({
    nome: '',
    email: '',
    cpf: '',
    matricula: '',
    telefone: '',
    dataNascimento: '',
    perfil: 'ALUNO',
});

const errosUsuario = reactive({
    nome: [],
    email: [],
    cpf: [],
    matricula: [],
    telefone: [],
    dataNascimento: [],
    perfil: [],
    endereco: {
        rua: [],
        numero: [],
        bairro: [],
        cidade: [],
        complemento: [],
        cep: []
    }
});

const isCarregando = ref(false);
const msgErro = ref("");

const atualizarPerfil = (opcao) => {
    usuario.perfil = opcao ? 'MOTORISTA' : 'ALUNO';
}

async function cadastrar() {
    isCarregando.value = true;
    limparErros();

    try {
        usuario.endereco = usuario.perfil == 'ALUNO' ? endereco : null;
        await usuarioService.cadastrarUsuario(usuario);

        router.back();

    } catch (erro) {
        console.log(erro);

        if (erro instanceof ErroValidacao) {
            handleErroValidacao(erro);
            return;
        }

        msgErro.value = erro.message;

    } finally {
        isCarregando.value = false;
    }
}

function handleErroValidacao(erro) {
    for (const { campo, mensagem } of erro.campos) {
        if (errosUsuario[campo]) {
            errosUsuario[campo].push(mensagem);
        } else {
            errosUsuario.endereco[campo].push(mensagem);
        }
    }
}

function limparErros() {
    msgErro.value = "";

    for (const campo in errosUsuario) {
        if (campo instanceof Array) {
            for (const subCampo in campo) {
                errosUsuario[campo][subCampo] = [];
            }

        } else {
            errosUsuario[campo] = [];
        }
    }
}

</script>