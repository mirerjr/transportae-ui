<template>
    <BaseInput
        nome="Endereço"
        placeholder="Endereço"
        variante="v2"
        v-model="endereco.descricao"
        :erros="errosEndereco.descricao"
    />
    <BaseInput
        nome="Número"
        placeholder="Número"
        variante="v2"
        v-model="endereco.numero"
        :erros="errosEndereco.numero"
    />
    <BaseInput
        nome="Bairro"
        placeholder="Bairro"
        variante="v2"
        v-model="endereco.bairro"
        :erros="errosEndereco.bairro"
    />
    <BaseInput
        nome="Cidade"
        placeholder="Cidade"
        variante="v2"
        tipo="select"
        :opcoes="cidades"
        v-model="endereco.cidade"
        :erros="errosEndereco.cidade"
    />
    <BaseInput
        nome="Complemento"
        placeholder="Complemento"
        variante="v2"
        v-model="endereco.complemento"
        :erros="errosEndereco.complemento"
    />
    <BaseInput
        nome="CEP"
        placeholder="CEP"
        variante="v2"
        v-model="endereco.cep"
        :erros="errosEndereco.cep"
    />
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue';
import BaseInput from './BaseInput.vue';
import cidades from '../../utils/cidades';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    erros: {
        type: Array,
        default: []
    }
});

const endereco = reactive({
    descricao: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
    cep: ''
});

const errosEndereco = reactive({
    descricao: [],
    numero: [],
    bairro: [],
    cidade: [],
    complemento: [],
    cep: []
});

watchEffect(() => {
    if (props.erros.length == 0) return;
    handleErroValidacao(props.erros);
});

// Ex.: endereco.cep -> cep = ["CEP obrigatório", ...]
function handleErroValidacao(erro) {
    for (const { campo, mensagem } of erro) {
        const isErroEndereco = campo.includes("endereco.");
        const erroAninhado = campo.split('.');

        if (!isErroEndereco || erroAninhado.length == 0) continue;

        const campoEndereco = erroAninhado[1];

        if (errosEndereco[campoEndereco] != null) {
            errosEndereco[campoEndereco].push(mensagem);
        }
    }
}

function limparErros() {
    for (const campo in errosEndereco) {
        errosEndereco[campo] = [];
    }
}

defineExpose({
    endereco,
    limparErros,
});
</script>