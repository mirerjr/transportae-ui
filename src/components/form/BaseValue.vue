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
                {{ hasValor ? props.valor : 'N/D' }}
            </slot>
        </span>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    campo: { type: String }, 
    valor: { required: true },
    espacamento: {
        type: String,
        default: "normal"
    }
});

const hasValor = computed(() => {
    return props.valor != null && props.valor != undefined && props.valor != '';
});
</script>