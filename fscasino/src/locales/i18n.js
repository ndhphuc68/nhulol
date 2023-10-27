import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
  messages: {
    en: require("./translation/en.json"),
    // ko: require("./ko.json"),
    // th: require("./th.json"),
  },
});

export default i18n;
