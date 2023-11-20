<template>
    <button 
        type="button" 
        :disabled="props.disabled"
        :class="{
            'focus:ring focus:ring-blue-400': !props.disabled,
            'bg-gray-100 hover:bg-gray-100': props.disabled
        }"
        class="bg-blue-200 border-none rounded-lg w-full p-3 text-blue-900 inline-flex justify-center items-center
            hover:bg-blue-300 focus:outline-none">
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    disabled: {
        default: false
    }
});
</script>