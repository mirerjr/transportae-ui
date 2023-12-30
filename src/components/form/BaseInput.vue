<template>
<div class="flex flex-col">
    <label
        v-if="props.nome"
        :class="{'text-red-500': hasErros}"
        :for="props.nome"
    >
        {{ props.nome }}
    </label>
    <input
        v-if="props.tipo != 'select'"
        :type="props.tipo"
        :name="props.nome"
        :placeholder="props.placeholder ?? props.nome"
        :value="props.modelValue"
        :autocomplete="props.autocomplete"
        @input="atualizarValorInput"
        :class="{
            'pl-7': props.iconeFinal,
            'border-red-400 text-red-400 focus:border-red-400 focus:outline-red-400 focus:ring-red-400': hasErros,
            'focus:outline-yellow-400 focus:ring-yellow-400': !hasErros,
            'p-3 border-2 text-xl border-blue-100 rounded-lg': props.variante == 'v1',
            'p-2 border-2 text-md border-blue-100 rounded-lg': props.variante == 'v2',
        }"
        class="text-gray-700"
    >
    <select 
        v-if="props.tipo == 'select'"
        :name="props.nome"
        :value="props.modelValue"
        :autocomplete="props.autocomplete"
        @input="atualizarValorInput"
        :class="{
            'pr-6': props.iconeFinal,
            'border-red-400 text-red-400 focus:border-red-400 focus:outline-red-400 focus:ring-red-400': hasErros,
            'focus:outline-yellow-400 focus:ring-yellow-400': !hasErros,
            'p-3 border-2 text-xl border-blue-100 rounded-lg': props.variante == 'v1',
            'p-2 border-2 text-md border-blue-100 rounded-lg': props.variante == 'v2',
        }"
        class="text-gray-700"
    >
            <option 
                value=""
                disabled
                selected
                hidden
            >
                {{ props.placeholder ?? props.nome }}
            </option>
            <option
                v-for="opcao in props.opcoes"
                :value="opcaoValor ? opcao[opcaoValor] : opcao"
            >
                {{ opcaoExibida ? opcao[opcaoExibida] : opcao }}
            </option>
    </select>
    <div v-if="props.iconeFinal" class="absolute translate-y-3 translate-x-2.5 mt-0.5 ">
        <component :is="props.iconeFinal" />
    </div>
    <ul
        v-if="hasErros"
        class="mt-1 text-red-400"
        :class="{
            'text-xl': props.variante == 'v1',
            'text-md': props.variante == 'v2',
        }"
    >
        <li v-for="erro in props.erros" :key="erro">
            - {{ erro }}
        </li>
    </ul>
</div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    nome: {
        type: String,
        default: ""
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
        default: "autocomplete-desabilitado"
    },
    modelValue: {
        required: true
    },
    opcoes: {
        type: Array,
        default: []
    },
    opcaoExibida: {
        type: String,
    },
    opcaoValor: {
        type: String,
    },
    variante: {
        type: String,
        default: "v1",
        validator: (variante) => {
            return ["v1", "v2"].includes(variante)
        }
    },
    iconeFinal: {
        required: false
    }
});

const hasErros = computed(() => props.erros.length > 0);

function atualizarValorInput(event) {
    emit("update:modelValue", event.target.value);
}
</script>