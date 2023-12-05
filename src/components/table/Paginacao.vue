<template>
    <section class="w-full flex justify-end">
        <BtnPagina
            :desabilitado="!podeVoltarPagina"
            @selecionado="voltarPagina"
        >
            <PhCaretLeft weight="bold" />
        </BtnPagina>
        <BtnPagina 
            v-for="pagina in totalPaginas"
            :key="pagina"
            :selecionado="props.paginaAtual == pagina"
            @selecionado="setPagina(pagina)"
        >        
            {{ pagina }}
        </BtnPagina>
        <BtnPagina
            :desabilitado="!podeAvancarPagina"
            @selecionado="avancarPagina"
        >
            <PhCaretRight weight="bold" />
        </BtnPagina>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PhCaretLeft, PhCaretDoubleLeft, PhCaretRight, PhCaretDoubleRight } from '@phosphor-icons/vue';
import BtnPagina from './BtnPagina.vue';

const emit = defineEmits(["alterarPagina"]);

const props = defineProps({
    totalPaginas: {
        type: Number,
        required: true,
    },
    itensPorPagina: {
        type: Number,
        default: 10,
    },
    totalPaginasVisiveis: {
        type: Number,
        default: 5,
    },
    paginaAtual: {
        type: Number,
        default: 1
    }
});

const podeVoltarPagina = computed(() => props.paginaAtual > 1);
const podeAvancarPagina = computed(() => props.paginaAtual < props.totalPaginas);
const totalPaginas = computed(() => 
    props.totalPaginas < props.totalPaginasVisiveis
        ? props.totalPaginas
        : props.totalPaginasVisiveis
);

function voltarPagina() {
    emit("alterarPagina", props.paginaAtual - 1);
}

function setPagina(numero) {
    emit("alterarPagina", numero);
}

function avancarPagina() {
    emit("alterarPagina", props.paginaAtual + 1);
}
</script>