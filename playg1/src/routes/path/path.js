const paths = {
  main: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/PlayG1/Home"),
        },
      ],
    },
    {
      path: "/casino",
      name: "Casino",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Casino",
          component: () => import("@/views/PlayG1/Casino"),
        },
      ],
    },
    {
      path: "/coupon",
      name: "Coupon",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Coupon",
          component: () => import("@/views/PlayG1/Coupon"),
        },
      ],
    },
    {
      path: "/slot",
      name: "Slot",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Slot",
          component: () => import("@/views/PlayG1/Slot"),
        },
      ],
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Profile",
          component: () => import("@/views/PlayG1/Profile"),
        },
      ],
    },
    {
      path: "/deposit",
      name: "Deposit",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Deposit",
          component: () => import("@/views/PlayG1/Deposit"),
        },
      ],
    },
    {
      path: "/withdraw",
      name: "Withdraw",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "Withdraw",
          component: () => import("@/views/PlayG1/Withdraw"),
        },
      ],
    },
    {
      path: "/depositHistory",
      name: "DepositHistory",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "DepositHistory",
          component: () => import("@/views/PlayG1/DepositHistory"),
        },
      ],
    },
    {
      path: "/withdrawHistory",
      name: "WithdrawHistory",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "WithdrawHistory",
          component: () => import("@/views/PlayG1/WithdrawHistory"),
        },
      ],
    },
    {
      path: "/helpCenter",
      name: "HelpCenter",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "HelpCenter",
          component: () => import("@/views/PlayG1/HelpCenter"),
        },
      ],
    },
    {
      path: "/queryCreation",
      name: "QueryCreation",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "QueryCreation",
          component: () => import("@/views/PlayG1/QueryCreation"),
        },
      ],
    },
    {
      path: "/gameGuide",
      name: "GameGuide",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "GameGuide",
          component: () => import("@/views/PlayG1/GameGuide"),
        },
      ],
    },
    {
      path: "/bettingHistory",
      name: "BettingHistory",
      component: () => import("@/layout/MainLayout"),
      children: [
        {
          path: "",
          name: "BettingHistory",
          component: () => import("@/views/PlayG1/BettingHistory"),
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

export { paths };
