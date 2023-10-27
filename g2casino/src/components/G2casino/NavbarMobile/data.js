import Home from "@/assets/G2casino/icon/sidebars/home.vue";
import Profile from "@/assets/G2casino/icon/sidebars/profile.vue";
import Casino from "@/assets/G2casino/icon/sidebars/casino.vue";
import Slot from "@/assets/G2casino/icon/sidebars/slot.vue";

export const menuNavbar = [
  {
    icon: Home,
    href: "/",
    key: "home",
  },
  {
    icon: Casino,
    key: "casino",
    href: "/",
  },
  {
    icon: Slot,
    key: "slot",
    href: "/",
  },
  {
    icon: Profile,
    key: "profile",
    href: "profile",
  },
];
