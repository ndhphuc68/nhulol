import Casino from "@/assets/PlayGame1/icon/header/casino.vue";
import Slot from "@/assets/PlayGame1/icon/header/slot.vue";

export const tabs = [
  {
    icon: Casino,
    text: "Casino",
    idx: 0,
    key: "casino",
    href: "casino",
  },
  {
    icon: Slot,
    text: "slot",
    idx: 2,
    key: "slot",
    href: "slot",
  },
];

export const languages = [
  {
    image: require("@/assets/PlayGame1/icon/languages/ko.png"),
    key: "ko",
    text: "KO",
    idx: 1,
  },
  {
    image: require("@/assets/PlayGame1/icon/languages/en.png"),
    key: "en",
    text: "EN",
    idx: 2,
  },
  {
    image: require("@/assets/PlayGame1/icon/languages/th.png"),
    key: "th",
    text: "TH",
    idx: 3,
  },
];
