<template>
	<div class="boxWrap" :style="props.styles">
		<div class="headerWrap" :class="{ 'gradient1': props.gradient, 'gradient2': !props.gradient}">
			<slot name="header"></slot>
		</div>
		<div class="contentWrap">
			<slot name="body"></slot>
		</div>
	</div>
</template>
<script setup>
	const props = defineProps({
		styles: {
			type: Object,
			default: () => {
				return {}
			}
		},
		gradient: {
			type: Boolean,
			default: true
		}
	})

</script>
<style scoped>
	.boxWrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 12px;
	}
	.boxWrap .headerWrap {
		width: inherit;
		height: 38px;
		border: solid 1px #5d515c;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		display: flex;
		align-items: center;
		font-weight: bold;
		padding-left: 15px;
		padding-right: 15px;
	}
	.boxWrap .contentWrap {
		width: inherit;
		height: inherit;
		border: solid 1px #5d515c;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		background-image: linear-gradient(to right, #0f062d 20%, #17010f);
	}
	.gradient1 {
		background-image: linear-gradient(to right, #a28f40 0%, #281f3b 90%);
	}
	.gradient2 {
		background-image: linear-gradient(to right, #4c4661 0%, #270e44 100%);
	}
</style>