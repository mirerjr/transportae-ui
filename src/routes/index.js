import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
    {
        path: "/login",
        name: "login",
        meta: { layout: 'LayoutLogo' },
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/alterar-senha",
        name: "senha",
        meta: { layout: 'LayoutLogo'},
        component: () => import("../views/AlterarSenha.vue"),
    },
    {
        path: "/",
        name: "home",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/perfil",
        name: "perfil",
        meta: { layout: 'LayoutPrincipal'},
        component: () => import ("../views/Perfil.vue"),
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});