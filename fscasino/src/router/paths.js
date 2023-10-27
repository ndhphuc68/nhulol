export const paths = {
  router: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/layout/Layout"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/home/index.vue"),
        },
      ],
    },
    {
      path: "/slotGame",
      name: "Slot Game",
      component: () => import("@/layout/Layout"),
      children: [
        {
          path: "",
          name: "Slot Game",
          component: () => import("@/views/slotgame"),
        },
      ],
    },
    {
      path: "/liveCasino",
      name: "Live Casino",
      component: () => import("@/layout/Layout"),
      children: [
        {
          path: "",
          name: "Live Casino",
          component: () => import("@/views/livecasino"),
        },
      ],
    },
  ],
};
