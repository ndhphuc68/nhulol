<template>
	<div class="tabWrap">
		<div class="tab" :class="{ 'selected': tabIdx == idx }" v-for="(tab, idx) in props.tabs" :key="idx" @click.stop="clickTab(tab, idx)">
			{{ t(tab.tx) }}
		</div>
	</div>
</template>
<script setup>
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	const { t } = useI18n();
	const props = defineProps({
		tabs: {
			type: Array,
			default: () => {
				return []
			}
		}
	});
	const emits = defineEmits(['clickTab']);
	const tabIdx = ref(0);
	const clickTab = (tab, idx) => {
		tabIdx.value = idx;
		emits('clickTab', tab);
	}
</script>
<style scoped>
	.tabWrap {
		width: auto;
		display: flex;
		gap: 2px;
    margin: 0 auto;
	}
	.tabWrap .tab {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 108px;
		height: 40px;
    color: #ffffff;
    font-size: 13px;
		cursor: pointer;
    background-image: url("../../assets/tab/off.png");
    background-size: cover;
	}
	.tab.selected {
    background-image: url("../../assets/tab/on.png");
    background-size: cover;
	}
  .tabWrap.tabInfo .tab {
    background-image: unset;
    background-color: #020c15;
  }
  .tabWrap.tabInfo.LH .tab.selected {
    background-image: url("../../assets/box/blueInputBox.png");
  }
  .tabWrap.tabInfo.KINGS .tab.selected {
    background-image: unset;
    background-color: #b58a23;
  }
	.tabWrap.tabInfo.PANDORA .tab.selected {
		background-image: unset;
		background-color: rgba(220, 205, 205, 0.54);
	}
	.tabWrap.tabInfo.FREEDOM .tab.selected {
		/*background-image: url("../../assets/box/freedomInputBox2.png");*/
		/*background-image:linear-gradient(to top, #aba058, #5b5d2b, #8c7d46),linear-gradient(to top, #9b985c,#3a355e,#5c5591);*/
		background-image: linear-gradient(to top, #433124, #1d1b1b);
	}
	.tabWrap.tabInfo.HOMEPLUS .tab.selected {
		background-image: unset;
		/*background-color: rgba(220, 205, 205, 0.54);*/
		background-image:linear-gradient(to top, #aba058, #5b5d2b, #8c7d46),linear-gradient(to top, #9b985c,#3a355e,#5c5591);
	}
	.tabWrap.tabInfo.MEGA .tab.selected {
		background-image: unset;
		/*background-color: rgba(220, 205, 205, 0.54);*/
		background-image:linear-gradient(to top, #3f525c, #101517);
	}





</style>