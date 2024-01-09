<template>
    <a @click="$emit('click')" class="relative group cursor-pointer">
        <span class="flex flex-col items-center">
            <component
                v-if="props.icone"
                :is="props.icone"
                class="text-2xl pt-1 group-hover:text-blue-400" 
            />
            <span
                v-if="props.texto"
                class="text-sm group-hover:text-blue-400"
            >
                {{ props.texto }}
            </span>
        </span>
        <span class="absolute bottom-0 left-0 w-0 h-0.5 translate-y-full rounded-full bg-blue-400 group-hover:w-full group-hover:transition-all"></span>
    </a>
</template>

<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
    texto: {
        type: String,
    },
    icone: {
        required: false
    }
});

</script>