<script setup>

</script>

<template>
  <v-row class="align-center">
    <div class="logo-wrap">
      <slot></slot>
    </div>
    <v-col class="line pa-0 ml-3" tag="hr"/>
  </v-row>
</template>

<style scoped>

.logo-wrap {
  min-width: 10%;
}

.line {
  height: 2px;
  background: var(--primary);
  flex: 1;
  max-width: 90%;
}
</style>