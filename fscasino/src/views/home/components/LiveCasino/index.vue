<template>
  <section class="mt-5">
    <div class="container">
      <div class="text-start">
        <img src="@/assets/icons/live-casino.png" alt="live-casino" />
        <span class="title-section">Live Casino</span>
      </div>
      <div class="mt-5 list-live">
        <LiveCasinoItem
          v-for="item in listLive"
          :key="item.id"
          :liveItem="item"
        />
      </div>
      <div class="mt-5">
        <button class="primary-button">See more</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import LiveCasinoItem from "./LiveCasinoItem.vue";
import { listLive } from "./data";
</script>

<style scoped lang="scss">
section {
  background: url("@/assets/bg-live-casino.png") no-repeat;
  background-size: 100% auto;
  .container {
    @media (max-width: 768px) {
      padding: 1rem;
    }
    .list-live {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 2%;
      justify-content: center;
      @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5%;
      }
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-gap: 1rem;
      }
    }
  }
}
.text-start {
  align-items: center;
}
</style>
