<template>
    <button 
        type="button" 
        :disabled="props.disabled"
        :class="{
            'focus:ring-0 bg-gray-100 hover:bg-gray-100': props.disabled,
            [variantesCor[props.varianteCor]]: !props.disabled,
            [variantesTamanho[props.varianteTamanho]]: props.varianteTamanho,
        }"
        class="w-full font-gudea inline-flex justify-center items-center rounded-lg focus:outline-none">
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    disabled: {
        default: false
    },
    varianteCor: {
        type: String,
        default: 'blue'
    },
    varianteTamanho: {
        type: String,
        default: 'md'
    }
});

const variantesCor = {
    blue: 'bg-blue-200 hover:bg-blue-300 text-blue-900 focus:ring-blue-400',
    green: 'bg-green-100 hover:bg-green-300 text-green-900 focus:ring-green-400',
    red: 'bg-red-100 hover:bg-red-300 text-red-900 focus:ring-red-400',
}

const variantesTamanho = {
    sm: 'px-2.5 py-2 text-base',
    md: 'px-3 py-2.5 text-lg',
    lg: 'p-3 text-xl',
    xl: 'p-3 text-2xl',
}

</script>
