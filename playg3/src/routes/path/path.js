const paths = {
    main: [
        {
            path: "/",
            redirect: "",
        },
        {
            path: "",
            name: "MainLayout",
            component: () => import("@/layout/PlayG3/MainLayout"),
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("@/views/PlayG3/Home"),
                },
                {
                    path: "profile",
                    name: "Profile",
                    component: () => import("@/views/PlayG3/Profile"),
                    // meta: {
                    //   requiresAuthPage: true,
                    // },
                },
                {
                    path: "casino",
                    name: "Casino",
                    component: () => import("@/views/PlayG3/Casino"),
                    // meta: {
                    //   requiresAuthPage: true,
                    // },
                },
                {
                    path: "slot",
                    name: "Slot",
                    component: () => import("@/views/PlayG3/SlotGame"),
                    // meta: {
                    //   requiresAuthPage: true,
                    // },
                },
                {
                    path: "betting-history",
                    name: "BettingHistory",
                    component: () => import("@/views/PlayG3/BettingHistory"),
                    // meta: {
                    //   requiresAuthPage: true,
                    // },
                },
                {
                    path: "page-deposit",
                    name: "Deposit",
                    component: () => import("@/views/PlayG3/Deposit"),
                    // meta: {
                    //   requiresAuthPage: true,
                    // },
                },
                {
                    path: "page-withdrawal",
                    name: "Withdrawal",
                    component: () => import("@/views/PlayG3/Withdrawal"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "help-center",
                    name: "HelpCenter",
                    component: () => import("@/views/PlayG3/HelpCenter"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "message",
                    name: "Message",
                    component: () => import("@/views/PlayG3/Message"),
                    meta: {
                        requiresAuthPage: true,
                    },
                },
                {
                    path: "login",
                    name: "Login",
                    component: () => import("@/views/PlayG3/Login"),
                    meta: {
                        checkAuth: true,
                    },
                    // beforeEnter: (to, from, next) => {
                    //   if (to.meta.checkAuth) {
                    //     // Kiểm tra điều kiện và điều hướng
                    //     if (store.state.auth.auth) {
                    //       next({name:'/'}); // Cho phép truy cập
                    //     } else {
                    //       next();
                    //     }
                    //   } else {
                    //     next(); // Cho phép truy cập
                    //   }
                    // }
                },
                {
                    path: "signup",
                    name: "Signup",
                    component: () => import("@/views/PlayG3/Signup"),
                    meta: {
                        checkAuth: true,
                    },
                },
                {
                    path: "page-gameguide",
                    name: "GameGuide",
                    component: () => import("@/views/PlayG3/GameGuide"),
                    meta: {
                        checkAuth: true,
                    },
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
