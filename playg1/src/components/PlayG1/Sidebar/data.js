import Home from "@/assets/PlayG1/icon/sidebars/home.vue";
import Profile from "@/assets/PlayG1/icon/sidebars/profile.vue";
import Deposit from "@/assets/PlayG1/icon/sidebars/deposit.vue";
import Withdraw from "@/assets/PlayG1/icon/sidebars/withdraw.vue";
import History from "@/assets/PlayG1/icon/sidebars/history.vue";
import GamGuide from "@/assets/PlayG1/icon/sidebars/gamguide.vue";
// import Favorite from '@/assets/PlayG1/icon/sidebars/favorite'
import Coupon from "@/assets/PlayG1/icon/sidebars/coupon.vue";
import Help from "@/assets/PlayG1/icon/sidebars/help.vue";

export const menuSidebar = [
  {
    icon: Home,
    text: "Home",
    href: "home",
    key: "home",
  },
  {
    icon: Deposit,
    text: "Deposit",
    key: "deposit",
    href: "deposit",
  },
  {
    icon: Deposit,
    text: "DepositHistory",
    key: "depositHistory",
    href: "depositHistory",
  },
  {
    icon: Withdraw,
    text: "Withdraw",
    key: "withdraw",
    href: "withdraw",
  },
  {
    icon: Withdraw,
    text: "WithdrawHistory",
    key: "withdrawHistory",
    href: "withdrawHistory",
  },
  {
    icon: Profile,
    text: "Profile",
    key: "profile",
    href: "profile",
  },
  {
    icon: History,
    text: "History betting",
    key: "history",
    href: "bettingHistory",
  },
  {
    icon: Help,
    text: "Help center",
    key: "help",
    href: "helpcenter",
  },
  {
    icon: Coupon,
    text: "Coupon",
    key: "coupon",
    href: "coupon",
  },
  {
    icon: GamGuide,
    text: "GamGuide",
    key: "gameGuide",
    href: "gameGuide",
  },
];
