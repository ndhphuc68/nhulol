export const paths = {
  router: [
    {
      path: "/",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/CasinoClub/Home"),
        },
      ],
    },{
      path: "/profile",
      name: "Profile",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Profile",
          component: () => import("@/views/CasinoClub/Profile"),
        },
      ],
    },
    {
      path: "/betting-history",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "BettingHistory",
          component: () => import("@/views/CasinoClub/BettingHistory"),
        },
      ],
    },
    {
      path: "/deposit-page",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Deposit",
          component: () => import("@/views/CasinoClub/Deposit"),
        },
      ],
    },
    {
      path: "/withdraw-page",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Withdraw",
          component: () => import("@/views/CasinoClub/Withdraw"),
        },
      ],
    },
    {
      path: "/casino-page",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Casino",
          component: () => import("@/views/CasinoClub/Casino"),
        },
      ],
    },
    {
      path: "/slots-page",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Slot",
          component: () => import("@/views/CasinoClub/Slot"),
        },
      ],
    },
    {
      path: "/game-guide",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "GameGuide",
          component: () => import("@/views/CasinoClub/GameGuide"),
        },
      ],
    },
    {
      path: "/deposit-history",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "DepositHistory",
          component: () => import("@/views/CasinoClub/DepositHistory"),
        },
      ],
    },
    {
      path: "/withdraw-history",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "WithdrawHistory",
          component: () => import("@/views/CasinoClub/WithdrawHistory"),
        },
      ],
    },
    {
      path: "/help-center",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "HelpCenter",
          component: () => import("@/views/CasinoClub/HelpCenter"),
        },
      ],
    },
    {
      path: "/profile",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Profile",
          component: () => import("@/views/CasinoClub/Profile"),
        },
      ],
    },
    {
      path: "/faq",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Faq",
          component: () => import("@/views/CasinoClub/Faq"),
        },
      ],
    },
    {
      path: "/login",
      name: "",
      component: () => import("@/layout/CasinoClub"),
      children: [
        {
          path: "",
          name: "Login",
          component: () => import("@/views/CasinoClub/Login"),
        },
      ],
    },
  ],
};
