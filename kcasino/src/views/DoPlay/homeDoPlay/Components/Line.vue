<script setup>
import { defineProps } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <v-row class="mx-0 my-0 align-center justify-center mx-0 mt-3">
    <div class="logo-wrap" :class="props.class">
      <slot></slot>
    </div>
    <v-col class="line pa-0 ml-3 d-md-block d-none" tag="hr" />
  </v-row>
</template>

<style scoped>
.logo-wrap {
  min-width: 10%;
}

.line {
  height: 2px;
  background: var(--primaryDoplay);
  flex: 1;
  max-width: 90%;
}
</style>
