

const adminRoutes = [
    {
        path: "/administration",
        name: "administration",
        meta: {
            title: "Administration",
            menuName: "Administration",
            iconName: "administration",
        },
        children: [
            {
                path: "manage-users",
                name: "manageUsers",
                component: () => import("../ManageUser.vue"),
                meta: {
                    title: "Manage User",
                    menuName: "Manage users",
                    iconName: "homeIcon",
                    parent: "administration",
                },
            },
        ],
    },

];


export default adminRoutes;
