<template>
    <div 
        class="w-10 h-10 p-2 rounded-full border-2 font-bold flex items-center justify-center"
        :class="props.icone ? 'border-blue-100' : 'bg-blue-100 border-blue-100'"
    >
        <component
            v-if="icone"
            :is="icone"
        />
        <span v-else>
            {{ props.nome.charAt(0) }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    nome: {
        type: String,
        required: true,
        default: "Z",
    },
    icone: {
        type: Object,
        required: false,
        default: null,
    },
})
</script>