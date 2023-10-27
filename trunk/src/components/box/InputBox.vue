<template>
    <div class="boxWrap" :style="props.styles">
        <div v-if="!utils.isMobile()" class="headerWrap" :class="props.title">
          {{ t(props.title) }}
        </div>
        <div v-if="utils.isMobile()" class="headerWrapMobile" :class="props.title">
          {{ t(props.title) }}
        </div>
        <div v-if="!utils.isMobile()" class="contentWrap">
          <div class="inputBox" :class="props.title" v-numberFormat="obj.value" :style="props.inputStyles"></div>
        </div>
        <div v-if="utils.isMobile()" class="contentWrap">
          <div class="inputBoxMobile" :class="props.title" v-numberFormat="obj.value" :style="props.inputStyles"></div>
        </div>
    </div>
</template>
<script setup>

import { anime } from "@/plugins/anim/anim";
import { onMounted, onUpdated, watch, reactive } from 'vue';
import { useI18n } from "vue-i18n";
import { utils } from '@/utils/common';
const { t } = useI18n();

const props = defineProps({
	styles: {
		type: Object,
		default: () => {
			return {}
		}
	},
	inputStyles: {
		type: Object,
		default: () => {
			return {}
		}
	},
	title: {
		type: String,
		default: ''
	},
	value: {
		type: Number,
		default: 0
	},
	align: {
		type: Object,
		default: () => {
			return {
				title: 'center',
				value: 'center'
			}
		}
	}
});

const obj = reactive({
	value: 0
});

const setNumberAnim = () => {
	anime({
		targets: obj,
		value: props.value,
		easing: 'linear',
		round: 1,
	});
}

watch(()=> props.value, (val, oldVal) => {
	setNumberAnim();
});

onMounted(() => {
	setNumberAnim();
});
</script>
<style scoped>
.boxWrap {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	//border: 2px solid transparent;
  background-image: url("../../assets/box/moneyinput.png");
	//background-image: linear-gradient(to bottom, #322e29, #322e29), linear-gradient(to top, rgba(155, 129, 49, 1), rgba(207, 193, 143, 1), #9b8232);
	//background-origin: border-box;
	background-clip: content-box, border-box;
	font-weight: bold;
  background-size: 100% 100%;
}

.inputBox.balance {
	color: green !important;
}
.inputBoxMobile.balance {
  color: green !important;
}
.boxWrap .headerWrap {
	width: inherit;
	display: flex;
	align-items: center;
	font-size: 16px;
	color: #f6edcd;
	white-space: nowrap;
	letter-spacing: -0.48px;
	text-align: center;
	line-height: 24px;
	min-height: 24px;
	padding-top: 7px;
	flex: 1;
	justify-content: center;
}
.boxWrap .headerWrapMobile {
  width: inherit;
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #f6edcd;
  white-space: nowrap;
  text-align: center;
  line-height: 36px;
  min-height: 16px;
  padding-top: 7px;
  flex: 1;
  justify-content: center;
}
.boxWrap .contentWrap {
	width: 89%;
	margin: 0 auto;
	text-align: center;
	color: #ffc601;
	font-size: 16px;
	letter-spacing: 0.45px;
	flex: 1;
	background-image: url("../../assets/box/moneyinput_text.png");
	background-size: 100% 100%;
	margin-bottom: 7px;
	line-height: 25px;
}

.boxWrap .contentWrap .inputBox {
	//border-bottom: 3px solid transparent;
	//background-image: linear-gradient(to bottom, #171715, #171715), linear-gradient(to top, rgba(155, 129, 49, 1), rgba(207, 193, 143, 1), #9b8232);
	//background-origin: border-box;
	//background-clip: content-box;
	width: 100%;
	margin: 0 auto;
	color: #ffc601;
	display: flex;
	align-items: center;
	justify-content: center;
}
.boxWrap .contentWrap .inputBoxMobile {
//border-bottom: 3px solid transparent;
//background-image: linear-gradient(to bottom, #171715, #171715), linear-gradient(to top, rgba(155, 129, 49, 1), rgba(207, 193, 143, 1), #9b8232);
//background-origin: border-box;
//background-clip: content-box;
  width: 100%;
  margin: 0 auto;
  color: #ffc601;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
@media (max-width: 1024px) {
	.boxWrap .headerWrap {
		font-size: 12px;
	}
	.boxWrap .contentWrap .inputBox {
		height: 20px;
		font-size: 12px;
	}
}
</style>
