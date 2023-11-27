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
                    <th scope="col" class="px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl">Nome</th>
                    <th scope="col" class="px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl">Perfil</th>
                    <th scope="col" class="px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl">Matrícula</th>
                    <th scope="col" class="px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl">Telefone</th>
                    <th scope="col" class="px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl">Ação</th>
                </tr>
            </thead>
            <tbody class="font-arimo text-gray-700">
                <tr class="border-gray-100 last:border-none even:bg-gray-100 even:bg-opacity-20">
                    <td class="w-4 p-4">
                        <input type="checkbox">
                    </td>
                    <td
                        class="flex items-center px-6 py-4 whitespace-nowrap"
                    >
                        <div class="w-10 h-10 p-2 rounded-full bg-blue-100 font-bold text-center align-middle">
                            M
                        </div>
                        <div class="ps-3">
                            <div class="font-bold">Mirer Balbino de Andrade Junior</div>
                            <div class="text-gray-600">mirer.rmj@gmail.com</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">ADMIN</td>
                    <td class="px-6 py-4">007</td>
                    <td class="px-6 py-4">(00) 0 0000-0000</td>
                    <td class="px-6 py-4">
                        <button class="flex items-center text-blue-500">
                            <PhPencilSimple class="me-1" /> Editar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { PhPencilSimple } from '@phosphor-icons/vue';
</script>