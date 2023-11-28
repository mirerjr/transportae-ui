<template>
    <div class="w-10 h-10 p-2 rounded-full bg-blue-100 font-bold text-center align-middle">
        {{ props.nome.charAt(0) }}
    </div>
</template>

<script setup>
const props = defineProps({
    nome: {
        type: String,
        required: true,
        default: "Z",
    }
})
</script>