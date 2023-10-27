<template>
	<img v-if="isJuStyle" src="../assets/404.png" style="width: 100%; position: relative"/>
	<span v-else>404 NOT FOUND </span>

</template>
<script setup>
	import {onBeforeMount, ref} from "vue";
	const isJuStyle = ref(false);
</script>
<style scoped>

</style>