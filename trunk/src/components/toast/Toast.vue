<template>
	<div class="toastWrap">
		{{ props.message }}
	</div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
	message : {
		type: String,
		default: undefined
	}
});
</script>
<style scoped>
	.toastWrap {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 30px;
		right: 20px;
		z-index: 30;
		width: auto;
		font-size: 18px;
		padding: 10px;
		height: auto;
		border: 1px solid #855814;
		background-color: #151023;
		font-weight: bold;
		color: white;
		border-radius: 10px;
	}

</style>


