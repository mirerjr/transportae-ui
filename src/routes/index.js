import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    }
]