const paths = {
    main: [
        {
            path: "/",
            redirect: "",
        },
        {
            path: "",
            name: "MainLayout",
            component: () => import("@/layout/Play4G/MainLayout"),
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("@/views/Play4G/Home"),
                },
                {
                    path: "/profile",
                    name: "Profile",
                    component: () => import("@/views/Play4G/Profile"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                // {
                //     path: "/casino",
                //     name: "Casino",
                //     component: () => import("@/views/Play4G/Casino"),
                //     // meta: {
                //     //   requiresAuthPage: true,
                //     // },
                // },
                // {
                //     path: "/slot",
                //     name: "Slot",
                //     component: () => import("@/views/Play4G/SlotGame"),
                //     // meta: {
                //     //   requiresAuthPage: true,
                //     // },
                // },
                {
                    path: "/betting-history",
                    name: "BettingHistory",
                    component: () => import("@/views/Play4G/BettingHistory"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "/page-deposit",
                    name: "Deposit",
                    component: () => import("@/views/Play4G/Deposit"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "/page-withdrawal",
                    name: "Withdrawal",
                    component: () => import("@/views/Play4G/Withdraw"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "/help-center",
                    name: "HelpCenter",
                    component: () => import("@/views/Play4G/HelpCenter"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "/message",
                    name: "Message",
                    component: () => import("@/views/Play4G/Message"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "/page-gameguide",
                    name: "GameGuide",
                    component: () => import("@/views/Play4G/GameGuide/index.vue"),
                    meta: {},
                },
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
