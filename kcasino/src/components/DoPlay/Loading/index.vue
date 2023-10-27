<script setup>
import {defineProps} from 'vue';

defineProps({
  size: String,
  style: Object,
});

</script>
<template>
  <div :style="style" class="container">
    <div class="loading-group">
      <div class="text-center">
        <v-progress-circular :size="size" indeterminate></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>