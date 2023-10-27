<script setup>
import Carousel from "@/views/SCCasino/Home/Carousel";
import PickGame from "@/views/SCCasino/Home/PickGame";
import Notice from '@/views/SCCasino/Home/Notice';
import EventAndFAQ from '@/views/SCCasino/Home/EventAndFAQ'

</script>

<template>
    <div class="home">
        <Carousel/>
        <PickGame/>
        <Notice />
        <EventAndFAQ class="mt-5" />
    </div>
</template>

<style scoped>
.home {
    padding-left: 1.25rem;
  
  @media (max-width: 1024px) {
    padding-left: 0;
  }
}
</style>