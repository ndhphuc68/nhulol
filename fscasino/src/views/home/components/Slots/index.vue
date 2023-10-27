<template>
  <section class="container mt-5">
    <div class="slots-title">
      <img src="@/assets/slots/logo-slots.png" alt="slots" />
      <span class="title-section text-start">Slots</span>
    </div>
    <div class="row">
      <SlotItem v-for="item in listSlot" :key="item.id" :slotItem="item" />
    </div>
    <button class="mt-5 primary-button">See more</button>
  </section>
</template>

<script setup>
import SlotItem from "./SlotItem.vue";
import { listSlot } from "./data";
</script>

<style scoped lang="scss">
.slots-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
