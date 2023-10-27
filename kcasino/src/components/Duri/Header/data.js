import Casino from "@/assets/Duri/icon/header/casino.vue";
import Slot from "@/assets/Duri/icon/header/slot.vue";

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
  {
    icon: Slot,
    text: "Demo",
    idx: 3,
    key: "demo",
    href: "demo",
  },
];

export const languages = [
  {
    image: require("@/assets/Duri/icon/languages/ko.png"),
    key: "ko",
    text: "KO",
    idx: 1,
  },
  {
    image: require("@/assets/Duri/icon/languages/en.png"),
    key: "en",
    text: "EN",
    idx: 2,
  },
  {
    image: require("@/assets/Duri/icon/languages/th.png"),
    key: "th",
    text: "TH",
    idx: 3,
  },
];
