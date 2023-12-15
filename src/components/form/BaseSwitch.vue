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
            :class="{ 'bg-blue-300': isOpcaoDireita,
                     'bg-gray-300': !isOpcaoDireita }"
            :aria-checked="props.modelValue.toString()"
            @click="alternarValor"
        >
            <div
            class="bg-white w-6 h-6 rounded-full shadow-md transform duration-100"
            :class="{ 'translate-x-6': isOpcaoDireita }"
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
import { ref, computed, watchEffect } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        required: true,
        default: ""
    },
    opcaoEsquerda: {
        defult: false,
    },
    opcaoDireita: {
        default: true
    },
    nome: {
        type: String,
        required: true
    },
    erros: {
        type: Array,
        default: []
    }
});

const isOpcaoDireita = computed(() => props.modelValue === props.opcaoDireita);
const hasErros = computed(() => props.erros.length > 0);

function alternarValor() {
    if (props.modelValue === props.opcaoEsquerda) {
        emit('update:modelValue', props.opcaoDireita);

    } else {
        emit('update:modelValue', props.opcaoEsquerda);
    }
}
</script>