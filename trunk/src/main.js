import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { utils } from '@/utils/common';
import i18n from './i18n'
const app = createApp(App);
import vClickOutside from "click-outside-vue3";
import Notifications from '@kyvg/vue3-notification'
import VueNumber from 'vue-number-animation'
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";


// 파라미터로 넘버를 받고 3자리 마다 컴마를 찍어준 후 스트링으로 반환
app.directive('numberFormat', {
	updated: (el, binding) => {
		el.innerText = utils.setNumberFormat(binding.value)
	},
	mounted: (el, binding) => {
		el.innerText = utils.setNumberFormat(binding.value)
	}
});

app.directive('moneySymbol', {
	updated: (el, binding) => {
		el.innerText = utils.getMoneySymbol(binding.value)
	},
	mounted: (el, binding) => {
		el.innerText = utils.getMoneySymbol(binding.value)
	}
});
app.config.errorHandler = (a, b, c) => {
	console.log(a, b, c);
}

const options = {
	// You can set your default options here
	//top-right, top-center, top-left, bottom-right, bottom-center, bottom-left.
	position: POSITION.TOP_CENTER,
	timeout: 2000
};
app.directive('clickOutside', vClickOutside.directive);
app.use(store).use(router).use(vClickOutside).use(Notifications).use(VueNumber).use(i18n).use(Toast, options).mount('#app')
