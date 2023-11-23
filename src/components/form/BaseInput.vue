<template>
    <label :class="{'text-red-500': hasErros}" :for="props.nome">
        {{ props.nome }}
    </label>
    <input
        :type="props.tipo"
        :name="props.nome"
        :placeholder="props.placeholder ?? props.nome"
        :value="props.modelValue"
        :autocomplete="props.autocomplete"
        @input="atualizarValorInput"
        :class="hasErros 
            ? 'border-red-400 text-red-400 focus:border-red-400 focus:outline-red-400 focus:ring-red-400'
            : 'focus:outline-yellow-400 focus:ring-yellow-400'"
        class="p-3 border-2 text-xl border-blue-100 rounded-lg"
    >
    <ul v-if="hasErros" class="mt-1 text-red-400 text-xl">
        <li v-for="erro in props.erros" :key="erro">
            - {{ erro }}
        </li>
    </ul>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    nome: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,        
    },
    tipo: {
        type: String,
        default: "text"
    },
    erros: {
        type: Array,
        default: [],
    },
    autocomplete: {
        type: String,
        default: ""
    },
    modelValue: {
        required: true
    }
});

const hasErros = computed(() => props.erros.length > 0);

function atualizarValorInput(event) {
    emit("update:modelValue", event.target.value);
}
</script>