import Home from "@/assets/PlayGame1/icon/sidebars/home.vue";
import Profile from "@/assets/PlayGame1/icon/sidebars/profile.vue";
import Deposit from "@/assets/PlayGame1/icon/sidebars/deposit.vue";
import Withdraw from "@/assets/PlayGame1/icon/sidebars/withdraw.vue";
import History from "@/assets/PlayGame1/icon/sidebars/history.vue";
import GamGuide from "@/assets/PlayGame1/icon/sidebars/gamguide.vue";
import Coupon from "@/assets/PlayGame1/icon/sidebars/coupon.vue";
import Message from "@/assets/PlayGame1/icon/sidebars/message.vue";
import Help from "@/assets/PlayGame1/icon/sidebars/help.vue";

export const menuSidebar = [
  {
    icon: Home,
    text: "Home",
    href: "",
    key: "home",
  },
  {
    icon: Deposit,
    text: "Deposit",
    key: "deposit",
    href: "Deposit-page",
  },
  {
    icon: Deposit,
    text: "DepositHistory",
    key: "depositHistory",
    href: "Deposit-history",
  },
  {
    icon: Withdraw,
    text: "Withdraw",
    key: "withdraw",
    href: "Withdraw-page",
  },
  {
    icon: Withdraw,
    text: "WithdrawHistory",
    key: "withdrawHistory",
    href: "Withdraw-history",
  },
  {
    icon: Coupon,
    text: "Coupon",
    key: "coupon",
    href: "page-coupon",
  },
  {
    text: "logo",
    key: "logo",
    href: "/",
  },
  {
    icon: Profile,
    text: "Profile",
    key: "profile",
    href: "Profile-page",
  },
  {
    icon: History,
    text: "History betting",
    key: "history",
    href: "Betting-history",
  },
  {
    icon: Help,
    text: "Help center",
    key: "help",
    href: "Help-center",
  },
  {
    icon: GamGuide,
    text: "GamGuide",
    key: "gameGuide",
    href: "Game-guide",
  },
  {
    icon: Message,
    text: "Message",
    key: "message",
    href: "message",
  },
];
