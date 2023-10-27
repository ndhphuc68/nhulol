<template>
  <div class="wrapper row mt-3">
    <div class="col-4">{{ notice.date }}</div>
    <div class="title col">{{ notice.title }}</div>
    <button class="col-2 d-none d-lg-block">See more</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  notice: Object,
});
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 992px) {
    font-size: 12px;
  }
  button {
    color: var(--pink);
  }
}
.col-6,
.col-3 {
  text-align: left;
}
.col-2 {
  text-align: right;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
