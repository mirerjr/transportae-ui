<template>
    <section class="bg-white font-gudea rounded-2xl p-6 md:p-8 text-gray-800">
        <header class="flex flex-row justify-between mb-6">
            <h3 
                class="inline-flex items-center text-gray-700"
                :class="variantes[props.variante]"
            >
                <slot name="cabecalho" />
            </h3>
            <div class="justify-end">
                <slot name="cabecalho-btn" />
            </div>
        </header>
        <slot name="conteudo" />
        <footer>
            <slot name="rodape" />
        </footer>        
    </section>
</template>

<script setup>
const props = defineProps({
    variante: {
        type: String,
        default: 'v1',
    },
});

const variantes = {
    "v1": "text-3xl",
    "v2": "text-4xl",
}
</script>