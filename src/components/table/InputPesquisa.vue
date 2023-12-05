<template>
    <BaseInput 
        :placeholder="props.placeholder"
        tipo="text"
        variante="v2"
        :icone-final="PhMagnifyingGlass"
        @update:model-value="(valor) => $emit('update:modelValue', valor)"
    />
</template>

<script setup>
import { provide } from "vue";
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import BaseInput from "../form/BaseInput.vue";
import tailwindcss from "../../../tailwind.config";

const props = defineProps(["placeholder", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const cor = tailwindcss.theme.colors.cyan["600"];

provide("color", cor);
provide("weight", "bold");
</script>