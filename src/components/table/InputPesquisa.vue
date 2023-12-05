<template>
    <BaseInput 
        :placeholder="props.placeholder"
        tipo="text"
        variante="v2"
        :icone-final="PhMagnifyingGlass"
        v-model="termoPesquisa"
        @update:model-value="pesquisarComDebounce"
    />
</template>

<script setup>
import { ref, computed, provide } from "vue";
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import BaseInput from "../form/BaseInput.vue";
import tailwindcss from "../../../tailwind.config";
import  { debounce } from "../../utils/utils";

const props = defineProps(["placeholder", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const cor = tailwindcss.theme.colors.cyan["600"];

provide("color", cor);
provide("weight", "bold");

const termoPesquisa = ref("");

const pesquisarComDebounce = computed(() => {
    return debounce(() => realizarPesquisa(), 300);
});

function realizarPesquisa() {
    emit('update:modelValue', termoPesquisa.value);
}
</script>