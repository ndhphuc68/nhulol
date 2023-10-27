<template>
	<div class="layoutWrap" ref="layoutWrap">
		<router-view/>
	</div>
</template>
<script setup>
</script>
<style scoped>
	/* 테블릿 세로 (해상도 768px ~ 1023px)*/
	@media all and (min-width:768px) and (max-width:1023px) {
		nav {
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			left: unset;
		}
	}

	/* 모바일 가로, 테블릿 세로 (해상도 480px ~ 767px)*/
	@media all and (min-width:480px) and (max-width:767px) {
		nav {
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			left: unset;
		}
	}

	/* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/
	@media all and (max-width:479px) {
		/* nav {*/
		/*	 display: block;*/
		/*	position: absolute;*/
		/*	top: 0;*/
		/*	right: 0;*/
		/*	left: unset;*/
		/*}*/
	}
	.layoutWrap {
		display: flex;
		flex-direction: column;
		width: 100vw;
	}
	/*.layoutWrap .rootWrap {*/
	/*	width: 100%;*/
	/*	height: 100vh;*/
	/*	transform-origin: top;*/
	/*}*/
	/*.layoutWrap .rootWrap .headerWrap {*/
	/*	width: 100%;*/
	/*	height: 57px;*/
	/*}*/
	/*.layoutWrap .rootWrap .contentWrap{*/
	/*	width: 100%;*/
	/*	height: 1023px;*/
	/*}*/
</style>