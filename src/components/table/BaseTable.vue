<template>
    <div
        class="relative overflow-x-auto rounded-xl"
    >
        <table 
            class="w-full text-left text-md font-gudea"
        >
            <thead
                class="text-md text-gray-800 uppercase bg-gray-100 bg-opacity-30 rounded-xl"
            >
                <tr>
                    <th scope="col" class="p-4 first:rounded-tl-xl last:rounded-tr-xl">
                        <input type="checkbox">
                    </th>
                    <th
                        scope="col"
                        v-for="coluna in props.colunas"
                        :key="coluna"
                        class="px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl"
                    >
                        {{ coluna }}
                    </th>
                </tr>
            </thead>
            <tbody class="font-arimo text-gray-700">
                <tr
                    v-if="props.carregando"
                    class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-20"                
                >
                    <td
                        v-for="coluna in props.colunas.length + 1"
                        class="px-4 py-4"
                    >
                        <div class="animate-pulse flex space-x-4">
                            <div class="h-2.5 w-2/4 bg-gray-100 rounded"></div>
                        </div>
                    </td>
                </tr>
                <slot v-else></slot>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const props = defineProps({
    colunas: {
        type: Array,
        default: [],
    },
    carregando: {
        type: Boolean,
        default: false,
    }
})
</script>