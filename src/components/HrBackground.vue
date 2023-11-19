<template>
    <hr 
        class="bg-blue-200 blur-[2px] absolute h-1 w-full my-8 border-0 -z-10"
        :class="[classes, variantes[props.variante]]"
    >
</template>

<script setup>
const variantes = {
    "padrao": "rotate-[16deg] translate-X-[0rem] translate-y-[20rem]",
    "1": "rotate-[16deg] translate-X-[0rem] translate-y-[0rem]",
    "2": "rotate-[-16deg] translate-X-[0rem] translate-y-[20rem]",
    "3": "rotate-[-16deg] translate-X-[0rem] translate-y-[50rem]",
}

const props = defineProps({
    classes: {
        type: String,
        required: false,
        default: "",
    },
    variante: {
        type: String,
        required: false,
        default: "padrao"
    }
})
</script>