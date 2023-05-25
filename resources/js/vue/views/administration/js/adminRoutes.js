

const adminRoutes = [
    {
        path: "/manage",
        name: "manage",
        meta: {
            title: "Manage",
            menuName: "Manage",
            iconName: "administration",
        },
        children: [
            {
                path: "users",
                name: "manageUsers",
                component: () => import("../ManageUser.vue"),
                meta: {
                    title: "Manage User",
                    menuName: "Manage users",
                    iconName: "homeIcon",
                },
            },
        ],
    },

];


export default adminRoutes;
