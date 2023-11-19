<template>      
    <div class="h-screen p-4 flex flex-col items-center lg:flex-row justify-center lg:pt-4">
        <aside class="flex flex-col justify-start items-center mb-10 ">
            <Logo />
        </aside>
        <div class="lg:w-1/12"></div>
        <main class="">
            <slot />
        </main>
    </div>
</template>

<script setup>
import Logo from '../components/Logo.vue';
import HrBackground from '../components/HrBackground.vue';
</script>