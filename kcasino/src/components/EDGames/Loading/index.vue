<template>
  <div class="container" :style="Props.style">
    <div class="loading-group">
      <div class="text-center">
        <v-progress-circular indeterminate :size="Props.size"></v-progress-circular>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

const Props = defineProps({
  size: String,
  style: {
  },
  // Các props khác...
});

</script>
<style scoped>
.loading-group {

}
</style>