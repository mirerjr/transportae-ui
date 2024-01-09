<template>
     <div class="flex items-center w-full my-6 -ml-1.5">
        <div class="w-1/12 mr-3 z-10">
            <div class="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                <component 
                    v-if="props.icone"
                    :is="props.icone"
                    class="text-cyan-700 border rounded-full border-white bg-white"
                />
                <div
                    v-else
                    class="rounded-full"
                    :class="{'w-2.5 h-2.5 bg-white': props.variante == 'v1',
                            'w-3 h-3 border-2 bg-white border-cyan-600': props.variante == 'v2',
                            'w-2.5 h-2.5 bg-cyan-600': props.variante == 'v3',
                    }"
                >
                </div>
            </div>                      
        </div>
        <div class="w-11/12">
            <p class="text-sm">{{ props?.titulo }}</p>
            <p v-if="props.conteudo" class="text-xs text-gray-500">
                {{ props?.conteudo }}
            </p>
            <p v-else class="text-xs text-gray-500">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: false
    },
    icone: {
        required: false
    },
    variante: {
        type: String,
        required: false,
        default: 'v1',
        validator: (value) => ['v1', 'v2', 'v3'].includes(value)
    },
})
</script>