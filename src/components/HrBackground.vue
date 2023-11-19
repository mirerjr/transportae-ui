<template>
    <hr 
        class="bg-blue-200 blur-[2px] absolute h-1 w-full my-8 border-0 -z-10"
        :class="`translate-x-[${props.translatex}] translate-y-[${props.translatey}] rotate-[${props.rotate}]`"
    >
</template>

<script setup>
const props = defineProps({
    rotate: {
        type: String,
        required: false,
        default: "16deg",
    },
    translatex: {
        type: String,
        required: false,
        default: "0rem",
    },
    translatey: {
        type: String,
        required: false,
        default: "20rem",
    }
})
</script>