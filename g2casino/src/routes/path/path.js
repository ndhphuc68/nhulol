const paths = {
    main: [
        {
            path: "/",
            redirect: "",
        },
        {
            path: "",
            name: "MainLayout",
            component: () => import("@/layout/G2casino/MainLayout"),
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("@/views/G2casino/Home"),
                },
            ],
        },
        {
            path: "",
            name: "MainLayout",
            component: () => import("@/layout/G2casino/MainLayout"),
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("@/views/G2casino/Home"),
                },
                {
                    path: "login",
                    name: "Login",
                    component: () => import("@/views/G2casino/Login"),
                },
                {
                    path: "signup",
                    name: "Signup",
                    component: () => import("@/views/G2casino/Signup"),
                },
                {
                    path: "deposit",
                    name: "Deposits",
                    component: () => import("@/views/G2casino/Deposits"),
                },
                {
                    path: "withdrawal",
                    name: "Withdrawal",
                    component: () => import("@/views/G2casino/Withdrawals"),
                },
                {
                    path: "help-center",
                    name: "HelpCenter",
                    component: () => import("@/views/G2casino/HelpCenter"),
                },
                {
                    path: "query-creation",
                    name: "QueryCreation",
                    component: () => import("@/views/G2casino/QueryCreation"),
                },
                {
                    path: "profile",
                    name: "Profile",
                    component: () => import("@/views/G2casino/Profile"),
                },
                {
                    path: "coupon",
                    name: "Coupon",
                    component: () => import("@/views/G2casino/Coupon"),
                },
                {
                    path: "betting-history",
                    name: "BettingHistory",
                    component: () => import("@/views/G2casino/BettingHistory"),
                },
                {
                    path: "game-guide",
                    name: "GameGuide",
                    component: () => import("@/views/G2casino/GameGuide"),
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
