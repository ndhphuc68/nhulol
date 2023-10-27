import Casino from "@/assets/Play4G/icon/Header/casino.vue";
import Slot from "@/assets/Play4G/icon/Header/slot.vue";

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
    image: require("@/assets/Play4G/icon/Languages/ko.png"),
    key: "ko",
    text: "KO",
    idx: 1,
  },
  {
    image: require("@/assets/Play4G/icon/Languages/en.png"),
    key: "en",
    text: "EN",
    idx: 2,
  },
  {
    image: require("@/assets/Play4G/icon/Languages/th.png"),
    key: "th",
    text: "TH",
    idx: 3,
  },
  // {
  //   image: require("@/assets/icon/languages/mon.jpg"),
  //   key: "mon",
  //   text: "MO",
  //   idx: 4,
  // },
];
