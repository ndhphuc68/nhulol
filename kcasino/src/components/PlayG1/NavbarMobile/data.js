import Home from "@/assets/PlayG1/icon/sidebars/home.vue";
import Profile from "@/assets/PlayG1/icon/sidebars/profile.vue";
import Casino from "@/assets/PlayG1/icon/sidebars/casino.vue";
import Slot from "@/assets/PlayG1/icon/sidebars/slot.vue";

export const menuNavbar = [
  {
    icon: Home,
    text: "Home",
    href: "",
    key: "home",
  },
  {
    icon: Casino,
    text: "Casino",
    key: "casino",
    href: "casino",
  },
  {
    icon: Slot,
    text: "Slot",
    key: "slot",
    href: "slot",
  },
  {
    icon: Profile,
    text: "Profile",
    key: "profile",
    href: "Profile-page",
  },
];
