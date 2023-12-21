<template>
    <nav class="w-full mx-auto p-2  md:w-2/3 lg:px-12 lg:w-2/4 xl:w-1/3 ">
        <MenuPrincipal />
    </nav>
    <main class="p-4 lg:px-12">
        <slot />
    </main>
</template>

<script setup>
import MenuPrincipal from '../components/menu/MenuPrincipal.vue';
</script>