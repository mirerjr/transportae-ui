import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: { layout: 'LayoutLogo' },
        component: () => import("../views/NotFound.vue"),
    },
    {
        path: "/forbbiden",
        name: "forbbiden",        
        props: (route) => ({
            nomeRotaAnterior: route.query.rotaAnterior, 
        }),
        meta: { layout: 'LayoutLogo' },
        component: () => import("../views/Forbbiden.vue"),
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
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/Admin.vue"),
    },
    {
        path: "/cadastrar-endereco",
        name: "cadastrar-endereco",
        props: true,
        meta: { layout: 'LayoutPrincipal' },
        component: () => import("../views/NovoEndereco.vue"),
    },
    {
        path: "/usuarios",
        name: "usuarios",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
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
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import ("../views/NovoUsuario.vue"),
    },
    {
        path: "/instituicoes",
        name: "instituicoes",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/Instituicoes.vue"), 
    },
    {
        path: "/cadastrar-instituicao",
        name: "cadastrar-instituicao",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/NovaInstituicao.vue"), 
    },
    {
        path: "/instituicao/:id?",
        props: true,
        name: "instituicao",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/Instituicao.vue"), 
    },
    {
        path: "/linhas",
        name: "linhas",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/Linhas.vue"),
    },
    {
        path: "/cadastrar-linha",
        name: "cadastrar-linha",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/NovaLinha.vue"),
    },
    {
        path: "/linha/:id?",
        props: true,
        name: "linha",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/Linha.vue"),
    },
    {
        path: "/cadastrar-ponto",
        props: (route) => ({
            linhaTransporteId: route.query.linhaId, 
        }),
        name: "cadastrar-ponto",
        meta: { 
            layout: 'LayoutPrincipal',
            perfil: "ADMIN", 
        },
        component: () => import("../views/NovoPonto.vue"),
    },
    {
        path: "/itinerario/:id",
        props: true,
        name: "itinerario",
        meta: { layout: 'LayoutPrincipal'},
        component: () => import("../views/Itinerario.vue"),
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});