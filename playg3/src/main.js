import {createApp} from 'vue'
import routes from "./routes";
import store from "@/store";
import App from './App.vue'

//prime
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import i18n from "@/locales/i18n";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.bundle"

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
    components,
    directives,
});

export const app = createApp(App)
app.use(routes).use(vuetify).use(PrimeVue).use(ToastService).use(ConfirmationService).use(i18n).use(store).mount('#app')
