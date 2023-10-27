const paths = {
    main: [
        {
            path: "/",
            redirect: "",
        },
        {
            path: "",
            name: "MainLayout",
            component: () => import("@/layout/SCCasino/MainLayout"),
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("@/views/SCCasino/Home"),
                }
            ],
        },

        // {
        //     path: "/404",
        //     name: "NotFound",
        //     component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: "/404"
        // },
    ],
};

export {paths};
