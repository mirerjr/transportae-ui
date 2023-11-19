<template>
    <HrBackground translatey="0rem" />
    <HrBackground />
    <HrBackground rotate="-16deg" />
    <HrBackground translatey="50rem" />
        
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