<template>
    <component :is="layoutAtual || 'div'">
        <router-view v-slot="{ Component }">
            <transition
                enter-from-class="translate-x-[100%] opacity-0"
                enter-active-class="transition duration-300"
            >
                <component :is="Component" :key="$route.path" />
            </transition>
        </router-view>
    </component>
</template>

<script setup>
import { provide, shallowRef } from 'vue';
import { RouterView } from 'vue-router';
import { router } from './routes';
import layouts from './layouts';

const layoutPadrao = shallowRef("div");
const layoutAtual = shallowRef("div");

router.afterEach((to) => {
    layoutAtual.value = layouts[to.meta.layout] ?? layoutPadrao.value;
});

provide('app:layout', layoutAtual);
</script>