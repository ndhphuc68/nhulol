import Home from "@/assets/G2casino/icon/sidebars/home.vue";
import Profile from "@/assets/G2casino/icon/sidebars/profile.vue";
import Casino from "@/assets/G2casino/icon/sidebars/casino.vue";
import Slot from "@/assets/G2casino/icon/sidebars/slot.vue";

export const menuNavbar = [
  {
    icon: Home,
    text: "Home",
    href: "/",
    key: "home",
    activeGame: 3
  },
  {
    icon: Casino,
    text: "Casino",
    key: "casino",
    href: "/",
    activeGame: 0
  },
  {
    icon: Slot,
    text: "Slot",
    key: "slot",
    href: "/",
    activeGame: 1
  },
  {
    icon: Profile,
    text: "Profile",
    key: "profile",
    href: "/profile",
    activeGame: 3
  },
];
