<script setup>
import {defineProps} from 'vue'

defineProps({
  variant: 'outlined' || 'contained' || 'text',
  style: Object,
  onClick: Function,
  isFullWidth: Boolean
})
</script>

<template>
  <button :class="[variant, {'full-width' : isFullWidth}]" :style="style" class="btn" @click="onClick">
    <slot/>
  </button>
</template>

<style scoped>
.btn {
  border-radius: 6px;
  padding: 12px 24px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  color: var(--primaryG2Casino);
  background: #FFFFFF;
  @media(max-width: 375px) {
    font-size: 12px;
    padding: 10px;
  }
}

.btn:hover {
//filter: blur(1px); transform: scale(0.99);
  opacity: 0.9;
  transition: transform linear 0.2s;
}

.btn.text {
  box-shadow: unset;
  padding: 0;
}

.btn.contained {
  background: var(--primaryG2Casino);
  color: #ffffff;
}

.btn.full-width {
  width: 100%;
}
</style>