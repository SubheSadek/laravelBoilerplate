import { createRouter, createWebHistory } from "vue-router";
import AdminRoutes from "@/vue/views/administration/js/adminRoutes";
// const auth = window.authUser ? window.authUser : null;

const masterRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/home/Home.vue"),
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
        ...AdminRoutes
    ]
});

router.beforeEach((to, from, next) => {
    document.title =to.meta.title
    next();
});

export default router;
