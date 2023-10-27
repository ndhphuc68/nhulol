import {createI18n} from 'vue-i18n';

const i18n = createI18n({
    legacy: false,
    locale: "en", // Set the initial locale
    messages: {
        en: require("./en.json"),
        ko: require("./ko.json"),
        th: require("./th.json"),
    },
});

export default i18n;
