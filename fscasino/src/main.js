import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import router from "./router";
import store from "./store";
import i18n from "@/locales/i18n";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(i18n)
  .use(ElementPlus)
  .use(PrimeVue)
  .mount("#app");
