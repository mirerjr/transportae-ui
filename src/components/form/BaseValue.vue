<template>
    <div class="flex flex-col font-arimo"
        :class="{
            'mb-2': (espacamento == 'menor'),
            'mb-4': (espacamento == 'normal'),
            'mb-6': (espacamento == 'maior')
        }"
    >
        <label class="font-bold text-gray-700"
            :class="{
                'mb-0.5': (espacamento == 'menor'),
                'mb-1':   (espacamento == 'normal'),
                'mb-1.5': (espacamento == 'maior')
            }"        
        >
            <slot name="campo">
                {{ props.campo }}
            </slot>
        </label>
        <span>
            <slot name="valor">
                {{ props.valor ?? 'N/D' }}
            </slot>
        </span>
    </div>
</template>
<script setup>
const props = defineProps({
    campo: { type: String }, 
    valor: { type: Object },
    espacamento: {
        type: String,
        default: "normal"
    }
});
</script>