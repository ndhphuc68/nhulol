<template>
	<div class="modalWrap">
		<div class="modalBox">
			<img class="loading" src="@/assets/holdem/loading.png"/>
		</div>
	</div>
</template>
<script setup>
</script>
<style scoped>

.modalWrap {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: -1;
	top: 0;
	left: 0;
}

.bgBox {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	background-size: 100% 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
}

.modalBox {
	position: relative;
	width: auto;
	height: auto;
	background-size: 100% 100%;
	overflow: hidden;
	z-index: -1;
}

.loading {
	animation: rotate 0.5s infinite;
}

@keyframes rotate {
	0% {
		transform: rotate(-45deg)
	}
	100% {
		transform: rotate(45deg)
	}
}

@media (max-width: 1024px) {
  .modalWrap {
    z-index: 0;
  }
}


</style>