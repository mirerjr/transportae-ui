<template>
    <HrBackground />
    <HrBackground variante="1" />
    <HrBackground variante="2" />
    <HrBackground variante="3" />
        
    <div class="p-4 flex flex-col items-center lg:flex-row lg:justify-around">
        <aside class="flex flex-col justify-start items-center mb-10 lg:mb-0 lg:pt-10">
            <Logo />
        </aside>
        <main class="">
            <slot />
        </main>
    </div>
</template>

<script setup>
import Logo from '../components/Logo.vue';
import HrBackground from '../components/HrBackground.vue';
</script>