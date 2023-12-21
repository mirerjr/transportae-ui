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
        component: () => import("../views/home.vue"),
    },
    {
        path: "/usuarios",
        name: "usuarios",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Usuarios.vue"),
    },
    {
        path: "/perfil/:id?",
        props: true,
        name: "perfil",
        meta: { layout: 'LayoutPrincipal'},
        component: () => import ("../views/Perfil.vue"),
    },
    {
        path: "/cadastrar-usuario",
        name: "cadastrar-usuario",
        meta: { layout: 'LayoutPrincipal'},
        component: () => import ("../views/NovoUsuario.vue"),
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});