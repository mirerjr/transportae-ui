import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: { layout: 'LayoutLogo' },
        component: () => import("../views/NotFound.vue"),
    },
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
            linhaTransporteId: route.query.linhaId, 
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
    },
    {
        path: "/linha/:id?",
        props: true,
        name: "linha",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/Linha.vue"),
    },
    {
        path: "/cadastrar-ponto",
        props: (route) => ({
            linhaTransporteId: route.query.linhaId, 
        }),
        name: "cadastrar-ponto",
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/NovoPonto.vue"),
    },
];

// TODO: Criar tela 404
// https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});