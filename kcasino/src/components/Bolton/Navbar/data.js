import casino from "@/assets/FSCasino/icons/icon-navbar/casino.vue";
import home from "@/assets/FSCasino/icons/icon-navbar/home.vue";
import slot from "@/assets/FSCasino/icons/icon-navbar/slot.vue";
import gameguide from "@/assets/FSCasino/icons/icon-navbar/game-guide.vue";
import deposit from "@/assets/FSCasino/icons/icon-navbar/deposit.vue";
import withdraw from "@/assets/FSCasino/icons/icon-navbar/withdraw.vue";
import userinfor from "@/assets/FSCasino/icons/icon-navbar/user-infor.vue";
import depositHistory from "@/assets/FSCasino/icons/icon-navbar/deposit-history.vue";
import withdrawHistory from "@/assets/FSCasino/icons/icon-navbar/withdraw-history.vue";
import event from "@/assets/FSCasino/icons/icon-navbar/event.vue";
import message from "@/assets/FSCasino/icons/icon-navbar/message.vue";
import helpCenter from "@/assets/FSCasino/icons/icon-navbar/helpcenter.vue";
import notice from "@/assets/FSCasino/icons/icon-navbar/notice.vue";

export const menu = [
  {
    component: home,
    url: "",
    name: "home",
    key: "",
  },
  {
    component: casino,
    url: "",
    name: "casino",
    key: "casino",
  },
  {
    component: slot,
    url: "",
    name: "slot",
    key: "slot",
  },
  {
    component: gameguide,
    url: "",
    name: "gameGuide",
    key: "gameGuide",
  },
  {
    component: "",
    url: require("@/assets/Hermes/hermes_logo.png"),
    name: "",
    key: "",
  },
  {
    component: deposit,
    url: "",
    name: "deposit",
    key: "deposit",
  },
  {
    component: withdraw,
    url: "",
    name: "withdraw",
    key: "withdraw",
  },
  {
    component: userinfor,
    url: "",
    name: "user",
    key: "user",
  },
];

export const moreMenu = [
  {
    component: depositHistory,
    name: "Deposit History",
    key: "depositHistory",
  },
  {
    component: withdrawHistory,
    name: "Withdraw History",
    key: "withdrawHistory",
  },
  {
    component: event,
    name: "Event",
    key: "event",
  },
  {
    component: message,
    name: "Message",
    key: "message",
  },
  {
    component: helpCenter,
    name: "Help Center",
    key: "helpCenter",
  },
  {
    component: notice,
    name: "Notice",
    key: "notice",
  },
];
