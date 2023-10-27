<script setup>
import {computed} from 'vue'
import {useStore} from "vuex";

const store = useStore();
const alerts = computed(() => store.state.toast.alerts);
</script>

<template>
  <div class="toast-wrapper">
    <v-alert closable class="item-alert" v-for="(alert, index) in alerts" :type="alert?.type" :key="index">
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 0;
  right: 20px;
  width: auto;
  height: auto;
  z-index: 999;
  color: white;
}

.item-alert {
  margin-top: 5px;
  animation: side-in 0.2s linear;
}

@keyframes side-in {
  from {
    right: -100px;
    opacity: 0;
  }
  to {
    right: 20px;
    opacity: 1;
  }
}
</style>