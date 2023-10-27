import Casino from "@/assets/PlayG1/icon/header/casino.vue";
import Slot from "@/assets/PlayG1/icon/header/slot.vue";

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
    text: "Slot",
    idx: 2,
    key: "slot",
    href: "slot",
  },
];

export const languages = [
  {
    image: require("@/assets/PlayG1/icon/languages/ko.png"),
    key: "ko",
    idx: 1,
  },
  {
    image: require("@/assets/PlayG1/icon/languages/en.png"),
    key: "en",
    idx: 2,
  },
  {
    image: require("@/assets/PlayG1/icon/languages/th.png"),
    key: "th",
    idx: 3,
  },
];
