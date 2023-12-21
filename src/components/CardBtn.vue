<template>
    <div
        class="w-28 h-28 p-2 flex flex-col justify-center items-center text-center cursor-pointer 
        bg-white shadow drop-shadow-sm rounded-xl hover:text-blue-500 hover:shadow-lg transition-all"
        @click="$emit('click')"
    >
        <slot>
        </slot>
    </div>
</template>

<script setup>
const emit = defineEmits(['click'])
</script>