<template>
    <div class="flex flex-col">
    <label
        v-if="props.nome"
        :class="{'text-red-500': hasErros}"
        :for="props.nome"
    >
        {{ props.nome }}
    </label>
    <div class="flex items-center">
        <label :for="props.nome" class="mr-2">{{ props.opcaoEsquerda }}</label>
        <div
            :id="props.nome"
            class="w-14 h-8 flex items-center rounded-full p-1 duration-100 cursor-pointer"
            :class="{ 'bg-blue-300': opcaoSelecionada,
                     'bg-gray-300': !opcaoSelecionada }"
            :aria-checked="opcaoSelecionada"
            @click="alternarValor"
        >
            <div
            class="bg-white w-6 h-6 rounded-full shadow-md transform duration-100"
            :class="{ 'translate-x-6': opcaoSelecionada }"
            ></div>
        </div>
        <label :for="props.nome" class="ml-2">{{ props.opcaoDireita }}</label>
    </div>
    <ul v-if="hasErros" class="mt-1 text-red-400 text-xl">
        <li v-for="erro in props.erros" :key="erro">
            - {{ erro }}
        </li>
    </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        required: false
    },
    opcaoEsquerda: {
        type: String,
        default: "Não",
    },
    opcaoDireita: {
        type: String,
        default: "Sim",
    },
    nome: {
        type: String,
        required: false
    },
    erros: {
        type: Array,
        default: []
    }
});

const opcaoSelecionada = ref(false);
const hasErros = computed(() => props.erros.length > 0);

function alternarValor() {
    opcaoSelecionada.value = !opcaoSelecionada.value;
    emit('update:modelValue', opcaoSelecionada.value);
}
</script>