<template>
    <section class="flex items-center">
        <ImgUsuario
            v-if="props.motorista?.nome"
            class="mr-2 font-gudea font-normal"
            :class="coresTurno[props.linha.turno]"
            :nome="props.motorista.nome"
        />
        <span class="flex flex-col items-center max-w-[14rem] overflow-hidden">
            {{ props.linha.nome }}
            <label 
                v-show="props.linha.turno"
                class="rounded-lg w-fit text-center text-regular px-2 font-gudea"
                :class="coresTurno[props.linha.turno]"
            >
                {{ props.linha.turno }}
            </label>
        </span>
    </section>
</template>

<script setup>
import ImgUsuario from './ImgUsuario.vue';

const props = defineProps({
    linha: {
        type: Object,
        required: false,
    },
    turnos: {
        type: Array,
        required: false,
    },
    motorista: {
        type: Object,
        required: false,
    },
});

const coresTurno = {
    'Manhã': 'bg-blue-100',
    'Tarde': 'bg-yellow-100',
    'Noite': 'bg-gray-100',
    'Integral': 'bg-red-100',
};
</script>