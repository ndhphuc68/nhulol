import casino from "@/assets/icons/icon-navbar/casino.vue";
import home from "@/assets/icons/icon-navbar/home.vue";
import slot from "@/assets/icons/icon-navbar/slot.vue";
import gameguide from "@/assets/icons/icon-navbar/game-guide.vue";
import deposit from "@/assets/icons/icon-navbar/deposit.vue";
import withdraw from "@/assets/icons/icon-navbar/withdraw.vue";
import userinfor from "@/assets/icons/icon-navbar/user-infor.vue";
import depositHistory from "@/assets/icons/icon-navbar/deposit-history.vue";
import withdrawHistory from "@/assets/icons/icon-navbar/withdraw-history.vue";
import event from "@/assets/icons/icon-navbar/event.vue";
import message from "@/assets/icons/icon-navbar/message.vue";
import helpCenter from "@/assets/icons/icon-navbar/helpcenter.vue";
import notice from "@/assets/icons/icon-navbar/notice.vue";

export const menu = [
  {
    component: home,
    url: "",
    name: "Home Page",
    key: "home",
  },
  {
    component: casino,
    url: "",
    name: "Casino",
    key: "liveCasino",
  },
  {
    component: slot,
    url: "",
    name: "Slot",
    key: "slotGame",
  },
  {
    component: gameguide,
    url: "",
    name: "Game Guide",
    key: "gameGuide",
  },
  {
    component: "",
    url: require("@/assets/logo.png"),
    name: "",
    key: "",
  },
  {
    component: deposit,
    url: "",
    name: "Deposit",
    key: "deposit",
  },
  {
    component: withdraw,
    url: "",
    name: "Withdraw",
    key: "withdraw",
  },
  {
    component: userinfor,
    url: "",
    name: "User Infor",
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
    key: "user",
  },
];
