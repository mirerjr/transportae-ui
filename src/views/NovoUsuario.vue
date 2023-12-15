
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
                        />
                        <BaseInput 
                            nome="E-mail"
                            placeholder="E-mail"
                            variante="v2"
                            v-model="usuario.email"
                        />
                        <BaseInput 
                            nome="Telefone"
                            placeholder="Telefone"
                            variante="v2"
                            v-model="usuario.telefone"
                        />
                        <BaseInput 
                            nome="Matrícula"
                            placeholder="Matrícula"
                            variante="v2"
                            v-model="usuario.matricula"
                        />
                        <BaseInput
                            nome="Data de nascimento"
                            placeholder="Data de nascimento"
                            variante="v2"
                            tipo="date"
                            v-model="usuario.dataNascimento"
                        />
                        <BaseSwitch
                            nome="Perfil"
                            opcao-esquerda="Aluno"
                            opcao-direita="Motorista"
                            v-model="usuario.perfil"
                        />
                    </div>
                    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <BaseInput
                            nome="Endereço"
                            placeholder="Endereço"
                            variante="v2"
                            v-model="usuario.endereco.descricao"
                        />
                        <BaseInput
                            nome="Número"
                            placeholder="Número"
                            variante="v2"
                            v-model="usuario.endereco.numero"
                        />
                        <BaseInput
                            nome="Bairro"
                            placeholder="Bairro"
                            variante="v2"
                            v-model="usuario.endereco.bairro"
                        />
                        <BaseInput
                            nome="Cidade"
                            placeholder="Cidade"
                            variante="v2"
                            tipo="select"
                            :opcoes="cidades"
                            v-model="usuario.endereco.cidade"
                        />
                        <BaseInput
                            nome="Complemento"
                            placeholder="Complemento"
                            variante="v2"
                            v-model="usuario.endereco.complemento"
                        />
                        <BaseInput
                            nome="CEP"
                            placeholder="CEP"
                            variante="v2"
                            v-model="usuario.endereco.cep"
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
                            <PhPlus class="mr-1" /> Cadastrar
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
import { PhPlus, PhUserPlus, PhArrowLeft } from '@phosphor-icons/vue';
import { reactive } from 'vue';

const usuario = reactive({
    nome: '',
    email: '',
    matricula: '',
    telefone: '',
    dataNascimento: '',
    perfil: 'Aluno',
    endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        complemento: '',
        cep: ''
    }
})

async function cadastrar() {
    console.log("cadastrando??");
    console.log(usuario.endereco.cidade);
}

</script>