<template>
    <button
        @click="selecionarPagina"
        class="px-3 py-2 leading-tight border border-e-0 font-arimo border-gray-100 text-gray-600 hover:border-blue-200 hover:text-blue-400 first:rounded-l-lg last:rounded-r-lg last:border-e-[1px]"
        :class="{
            'cursor-default bg-blue-100 border-blue-200 text-blue-400 hover:bg-blue-100': props.selecionado,
            'cursor-default border-gray-100 text-gray-600 opacity-60 hover:bg-white': props.desabilitado 
        }"
        :disabled="props.desabilitado"
    >
        <slot></slot>
    </button>
</template>

<script setup>
const emit = defineEmits(["selecionado"]);

const props = defineProps({
    desabilitado: {
        type: Boolean,
        default: false,
    },
    selecionado: {
        type: Boolean,
        default: false,
    }
});

function selecionarPagina() {
    if (!props.desabilitado) {
        emit("selecionado", true);
    }
}
</script>