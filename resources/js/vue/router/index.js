import { createRouter, createWebHistory } from "vue-router";
// const auth = window.authUser ? window.authUser : null;

const masterRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/main/Home.vue"),
        meta: {
            title: "Dashboard",
            menuName: "Dashboard",
            iconName: "homeIcon",
            isHide: false,
        },
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...masterRoutes,
    ]
});

router.beforeEach((to, from, next) => {
    document.title =to.meta.title
    next();
});

export default router;
