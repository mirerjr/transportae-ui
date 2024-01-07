<template>
    <h4 
        v-if="props.titulo"
        class="text-xl text-gray-700 font-bold"
    >
        {{ props.titulo }}
    </h4>
    <div class="relative px-2.5">
        <div class="absolute h-full border border-dashed ml-[0.2rem] border-gray-400"></div>
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    titulo: {
        type: String,
    },
})
</script>
