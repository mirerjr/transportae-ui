import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
    {
        path: "/login",
        name: "login",
        meta: { layout: 'LayoutVazio' },
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/home",
        name: "home",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Home.vue"),
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});