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
        props: (route) => ({
            instituicaoId: route.query.instituicaoId
        }),
        name: "cadastrar-usuario",
        meta: { layout: 'LayoutPrincipal'},
        component: () => import ("../views/NovoUsuario.vue"),
    },
    {
        path: "/instituicoes",
        name: "instituicoes",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Instituicoes.vue"), 
    },
    {
        path: "/cadastrar-instituicao",
        name: "cadastrar-instituicao",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/NovaInstituicao.vue"), 
    },
    {
        path: "/instituicao/:id?",
        props: true,
        name: "instituicao",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Instituicao.vue"), 
    },
    {
        path: "/linhas",
        name: "linhas",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Linhas.vue"),
    },
    {
        path: "/cadastrar-linha",
        name: "cadastrar-linha",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/NovaLinha.vue"),
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});