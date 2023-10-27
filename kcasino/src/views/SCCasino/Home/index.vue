<script setup>
import Carousel from "@/views/SCCasino/Home/Carousel";
import PickGame from "@/views/SCCasino/Home/PickGame";
import EventAndFAQ from "@/views/SCCasino/Home/EventAndFAQ";
</script>

<template>
  <div class="home">
    <Carousel />
    <PickGame />
    <EventAndFAQ class="mt-4" />
  </div>
</template>

<style scoped lang="scss">
.home {
  /* padding-left: 1.25rem; */

  @media (max-width: 1024px) {
    padding-left: 0;
  }
}
</style>
