import { utils } from "@/utils/common";

const paths = {
  EDGames: [
    {
      path: "/",
      redirect: "/ ",
    },
    {
      path: "/ ",
      name: "HomeA",
      component: () => import("@/layout/EDGames/navLayout4"),
      children: [
        {
          path: "",
          name: "HomeB",
          component: () => import("@/views/EDGames/home/index.vue"),
        },
        {
          path: "/slot",
          redirect: "/ ",
        },
        {
          path: "/casino",
          redirect: "/ ",
        },

        {
          path: "/profile",
          redirect: "/ ",
        },
        {
          path: "/betting-history",
          redirect: "/ ",
        },
        {
          path: "/page-deposit",
          redirect: "/ ",
        },
        {
          path: "/page-withdrawal",
          redirect: "/ ",
        },
        {
          path: "/help-center",
          redirect: "/ ",
        },
        {
          path: "/message",
          redirect: "/ ",
        },
        {
          path: "/login",
          redirect: "/ ",
        },
        {
          path: "/signup",
          redirect: "/ ",
        },
        {
          path: "/page-gameguide",
          redirect: "/ ",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "ED Games",
        icon: "favicon.ico",
      },
    },
  ],
  DoPlay: [
    {
      path: "/",
      redirect: "/ ",
    },
    {
      path: "/ ",
      name: "HomeC",
      component: () => import("@/layout/DoPlay/MainLayout"),
      children: [
        {
          path: "",
          name: "HomeD",
          component: () => import("@/views/DoPlay/homeDoPlay/index.vue"),
        },
        {
          path: "/slot",
          redirect: "/ ",
        },
        {
          path: "/casino",
          redirect: "/ ",
        },

        {
          path: "/profile",
          redirect: "/ ",
        },
        {
          path: "/betting-history",
          redirect: "/ ",
        },
        {
          path: "/page-deposit",
          redirect: "/ ",
        },
        {
          path: "/page-withdrawal",
          redirect: "/ ",
        },
        {
          path: "/help-center",
          redirect: "/ ",
        },
        {
          path: "/message",
          redirect: "/ ",
        },
        {
          path: "/login",
          redirect: "/ ",
        },
        {
          path: "/signup",
          redirect: "/ ",
        },
        {
          path: "/page-gameguide",
          redirect: "/ ",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "DO Play",
        icon: "doplay.ico",
      },
    },
  ],
  PlayG1: [
    {
      path: "/",
      name: "HomePlayG1",
      component: () => import("@/layout/PlayG1/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/PlayG1/Home"),
        },
        {
          path: "/casino",
          name: "Casino",
          component: () => import("@/views/PlayG1/Casino"),
        },
        // {
        //     path: "/coupon-page",
        //     name: "Coupon",
        //     component: () => import("@/views/PlayG1/Coupon"),
        // },
        {
          path: "/slot",
          name: "Slot",
          component: () => import("@/views/PlayG1/Slot"),
        },
        {
          path: "/profile-page",
          name: "Profile",
          component: () => import("@/views/PlayG1/Profile"),
          meta: {
            requiresAuthModal: true, // Điều kiện route
          },
        },
        {
          path: "/page-coupon",
          name: "Coupon",
          component: () => import("@/views/PlayG1/Coupon"),
          meta: {
            requiresAuthModal: true, // Điều kiện route
          },
        },
        {
          path: "/deposit-page",
          name: "Deposit",
          component: () => import("@/views/PlayG1/Deposit"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/withdraw-page",
          name: "Withdraw",
          component: () => import("@/views/PlayG1/Withdraw"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/deposit-history",
          name: "DepositHistory",
          component: () => import("@/views/PlayG1/DepositHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/withdraw-history",
          name: "WithdrawHistory",
          component: () => import("@/views/PlayG1/WithdrawHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: () => import("@/views/PlayG1/HelpCenter"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/query-creation",
          name: "QueryCreation",
          component: () => import("@/views/PlayG1/QueryCreation"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/game-guide",
          name: "GameGuide",
          component: () => import("@/views/PlayG1/GameGuide"),
        },
        {
          path: "/betting-history",
          name: "BettingHistory",
          component: () => import("@/views/PlayG1/BettingHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/message",
          name: "Message",
          component: () => import("@/views/PlayG1/Message"),
          meta: {
            requiresAuthModal: true,
          },
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "Solongo",
        icon: "playg1.ico",
      },
    },
  ],
  Lighthouse: [
    {
      path: "/",
      name: "HomePlayG1",
      component: () => import("@/layout/PlayGame1/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/PlayGame1/Home"),
        },
        {
          path: "/casino",
          name: "Casino",
          component: () => import("@/views/PlayGame1/Casino"),
        },
        // {
        //     path: "/coupon-page",
        //     name: "Coupon",
        //     component: () => import("@/views/PlayGame1/Coupon"),
        // },
        {
          path: "/slot",
          name: "Slot",
          component: () => import("@/views/PlayGame1/Slot"),
        },
        {
          path: "/profile-page",
          name: "Profile",
          component: () => import("@/views/PlayGame1/Profile"),
          meta: {
            requiresAuthModal: true, // Điều kiện route
          },
        },
        {
          path: "/page-coupon",
          name: "Coupon",
          component: () => import("@/views/PlayGame1/Coupon"),
          meta: {
            requiresAuthModal: true, // Điều kiện route
          },
        },
        {
          path: "/deposit-page",
          name: "Deposit",
          component: () => import("@/views/PlayGame1/Deposit"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/withdraw-page",
          name: "Withdraw",
          component: () => import("@/views/PlayGame1/Withdraw"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/deposit-history",
          name: "DepositHistory",
          component: () => import("@/views/PlayGame1/DepositHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/withdraw-history",
          name: "WithdrawHistory",
          component: () => import("@/views/PlayGame1/WithdrawHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: () => import("@/views/PlayGame1/HelpCenter"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/query-creation",
          name: "QueryCreation",
          component: () => import("@/views/PlayGame1/QueryCreation"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/game-guide",
          name: "GameGuide",
          component: () => import("@/views/PlayGame1/GameGuide"),
        },
        {
          path: "/betting-history",
          name: "BettingHistory",
          component: () => import("@/views/PlayGame1/BettingHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/message",
          name: "Message",
          component: () => import("@/views/PlayGame1/Message"),
          meta: {
            requiresAuthModal: true,
          },
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "등대",
        icon: "lighthouse.ico",
      },
    },
  ],
  Duri: [
    {
      path: "/",
      name: "HomeDuri",
      component: () => import("@/layout/Duri/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/Duri/Home"),
        },
        {
          path: "/casino",
          name: "Casino",
          component: () => import("@/views/Duri/Casino"),
        },
        // {
        //     path: "/coupon-page",
        //     name: "Coupon",
        //     component: () => import("@/views/Duri/Coupon"),
        // },
        {
          path: "/slot",
          name: "Slot",
          component: () => import("@/views/Duri/Slot"),
        },
        {
          path: "/demo",
          name: "Demo",
          component: () => import("@/views/Duri/Demo"),
        },
        {
          path: "/profile-page",
          name: "Profile",
          component: () => import("@/views/Duri/Profile"),
          meta: {
            requiresAuthModal: true, // Điều kiện route
          },
        },
        {
          path: "/page-coupon",
          name: "Coupon",
          component: () => import("@/views/Duri/Coupon"),
          meta: {
            requiresAuthModal: true, // Điều kiện route
          },
        },
        {
          path: "/deposit-page",
          name: "Deposit",
          component: () => import("@/views/Duri/Deposit"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/withdraw-page",
          name: "Withdraw",
          component: () => import("@/views/Duri/Withdraw"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/deposit-history",
          name: "DepositHistory",
          component: () => import("@/views/Duri/DepositHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/withdraw-history",
          name: "WithdrawHistory",
          component: () => import("@/views/Duri/WithdrawHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: () => import("@/views/Duri/HelpCenter"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/query-creation",
          name: "QueryCreation",
          component: () => import("@/views/Duri/QueryCreation"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/game-guide",
          name: "GameGuide",
          component: () => import("@/views/Duri/GameGuide"),
        },
        {
          path: "/betting-history",
          name: "BettingHistory",
          component: () => import("@/views/Duri/BettingHistory"),
          meta: {
            requiresAuthModal: true,
          },
        },
        {
          path: "/message",
          name: "Message",
          component: () => import("@/views/Duri/Message"),
          meta: {
            requiresAuthModal: true,
          },
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "Duri",
        icon: "lighthouse.ico",
      },
    },
  ],
  FSCasino: [
    {
      path: "/ ",
      redirect: "/",
      name: "HomeFSCasino",
      component: () => import("@/layout/FSCasino/Layout"),
      children: [
        {
          path: "/",
          name: "HomeFSCasinoA",
          component: () => import("@/views/FSCasino/home/index.vue"),
        },
        {
          path: "/slot",
          name: "Slot Game",
          component: () => import("@/views/FSCasino/slotgame"),
        },
        {
          path: "/casino",
          name: "Live Casino",
          component: () => import("@/views/FSCasino/livecasino"),
        },
        {
          path: "/profile",
          redirect: "/ ",
        },
        {
          path: "/betting-history",
          redirect: "/ ",
        },
        {
          path: "/page-deposit",
          redirect: "/ ",
        },
        {
          path: "/page-withdrawal",
          redirect: "/ ",
        },
        {
          path: "/help-center",
          redirect: "/ ",
        },
        {
          path: "/message",
          redirect: "/ ",
        },
        {
          path: "/login",
          redirect: "/ ",
        },
        {
          path: "/signup",
          redirect: "/ ",
        },
        {
          path: "/page-gameguide",
          redirect: "/ ",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "FS Casino",
        icon: "fscasino.ico",
      },
    },
  ],
  G2Casino: [
    {
      path: "/",
      redirect: "/",
      name: "MainLayout",
      component: () => import("@/layout/G2casino/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/G2casino/Home"),
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("@/views/G2casino/Login"),
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
          path: "/signup",
          name: "Signup",
          component: () => import("@/views/G2casino/Signup"),
          meta: {
            checkAuth: true,
          },
        },
        {
          path: "/page-deposit",
          name: "Deposits",
          component: () => import("@/views/G2casino/Deposits"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-withdrawal",
          name: "Withdrawal",
          component: () => import("@/views/G2casino/Withdrawals"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: () => import("@/views/G2casino/HelpCenter"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/query-creation",
          name: "QueryCreation",
          component: () => import("@/views/G2casino/QueryCreation"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/G2casino/Profile"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/betting-history",
          name: "BettingHistory",
          component: () => import("@/views/G2casino/BettingHistory"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-gameguide",
          name: "GameGuide",
          component: () => import("@/views/G2casino/GameGuide"),
        },
        {
          path: "/message",
          name: "Message",
          component: () => import("@/views/G2casino/Message"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/slot",
          redirect: "/",
        },
        {
          path: "/casino",
          redirect: "/",
        },

        {
          path: "/deposit-history",
          redirect: "/",
        },
        {
          path: "/withdraw-history",
          redirect: "/",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "G2 Casino",
        icon: "playg2.ico",
      },
    },
  ],
  Duri777: [
    {
      path: "/",
      redirect: "/",
      name: "MainLayout",
      component: () => import("@/layout/Duri777/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/Duri777/Home"),
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("@/views/Duri777/Login"),
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
          path: "/signup",
          name: "Signup",
          component: () => import("@/views/Duri777/Signup"),
          meta: {
            checkAuth: true,
          },
        },
        {
          path: "/page-deposit",
          name: "Deposits",
          component: () => import("@/views/Duri777/Deposits"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-withdrawal",
          name: "Withdrawal",
          component: () => import("@/views/Duri777/Withdrawals"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-coupon",
          name: "Coupon",
          component: () => import("@/views/Duri777/Coupon"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: () => import("@/views/Duri777/HelpCenter"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/query-creation",
          name: "QueryCreation",
          component: () => import("@/views/Duri777/QueryCreation"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/Duri777/Profile"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/betting-history",
          name: "BettingHistory",
          component: () => import("@/views/Duri777/BettingHistory"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-gameguide",
          name: "GameGuide",
          component: () => import("@/views/Duri777/GameGuide"),
        },
        {
          path: "/message",
          name: "Message",
          component: () => import("@/views/Duri777/Message"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/slot",
          redirect: "/",
        },
        {
          path: "/casino",
          redirect: "/",
        },

        {
          path: "/deposit-history",
          redirect: "/",
        },
        {
          path: "/withdraw-history",
          redirect: "/",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "Duri777",
        icon: "duri777.ico",
      },
    },
  ],
  SCCasino: [
    {
      path: "/",
      name: "MainLayout",
      component: () => import("@/layout/SCCasino/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/SCCasino/Home"),
        },
        {
          path: "/slot",
          redirect: "/ ",
        },
        {
          path: "/casino",
          redirect: "/ ",
        },

        {
          path: "profile",
          redirect: "/",
        },
        {
          path: "betting-history",
          redirect: "/",
        },
        {
          path: "page-deposit",
          redirect: "/",
        },
        {
          path: "page-withdrawal",
          redirect: "/",
        },
        {
          path: "help-center",
          redirect: "/",
        },
        {
          path: "message",
          redirect: "/",
        },
        {
          path: "login",
          redirect: "/",
        },
        {
          path: "signup",
          redirect: "/",
        },
        {
          path: "page-gameguide",
          redirect: "/",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "SC Casino",
        icon: "sccasino.ico",
      },
    },
  ],
  Bolton: [
    {
      path: "/ ",
      redirect: "/",
      name: "HomeFSCasino",
      component: () => import("@/layout/Bolton/Layout"),
      children: [
        {
          path: "/",
          name: "HomeFSCasinoA",
          component: () => import("@/views/Bolton/home/index.vue"),
        },
        {
          path: "/slot",
          name: "Slot Game",
          component: () => import("@/views/Bolton/slotgame"),
        },
        {
          path: "/casino",
          name: "Live Casino",
          component: () => import("@/views/Bolton/livecasino"),
        },
        {
          path: "/profile",
          redirect: "/ ",
        },
        {
          path: "/betting-history",
          redirect: "/ ",
        },
        {
          path: "/page-deposit",
          redirect: "/ ",
        },
        {
          path: "/page-withdrawal",
          redirect: "/ ",
        },
        {
          path: "/help-center",
          redirect: "/ ",
        },
        {
          path: "/message",
          redirect: "/ ",
        },
        {
          path: "/login",
          redirect: "/ ",
        },
        {
          path: "/signup",
          redirect: "/ ",
        },
        {
          path: "/page-gameguide",
          redirect: "/ ",
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "Hermes",
        icon: "bolton_holdem.ico",
      },
    },
  ],
  TDGames: [
    {
      path: "/",
      redirect: "",
      name: "MainLayout",
      component: () => import("@/layout/PlayG3/MainLayout"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/PlayG3/Home"),
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/PlayG3/Profile"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/casino",
          name: "Casino",
          component: () => import("@/views/PlayG3/Casino"),
          // meta: {
          //   requiresAuthPage: true,
          // },
        },
        {
          path: "/slot",
          name: "Slot",
          component: () => import("@/views/PlayG3/SlotGame"),
          // meta: {
          //   requiresAuthPage: true,
          // },
        },
        {
          path: "/betting-history",
          name: "BettingHistory",
          component: () => import("@/views/PlayG3/BettingHistory"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-deposit",
          name: "Deposit",
          component: () => import("@/views/PlayG3/Deposit"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/page-withdrawal",
          name: "Withdrawal",
          component: () => import("@/views/PlayG3/Withdrawal"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: () => import("@/views/PlayG3/HelpCenter"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/message",
          name: "Message",
          component: () => import("@/views/PlayG3/Message"),
          meta: {
            requiresAuthPage: true,
          },
        },
        {
          path: "/login",
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
          path: "/signup",
          name: "Signup",
          component: () => import("@/views/PlayG3/Signup"),
          meta: {
            checkAuth: true,
          },
        },
        {
          path: "/page-gameguide",
          name: "GameGuide",
          component: () => import("@/views/PlayG3/GameGuide"),
          meta: {},
        },
      ],
      meta: {
        isMobile: utils.isMobile(),
        showNav: true,
        title: "TDGames",
        icon: "tdgames.ico",
      },
    },
  ],
};

export { paths };
