<template>
  <div class="w-100">
    <Slide />
    <CasinoCarousel />
    <SlotCarousel />
    <Banner />
    <Contact />
    <ContactDetail />
    <History />
  </div>
</template>

<script setup>
import Slide from "@/views/PlayG1/Home/Components/Slide/index.vue";
import Banner from "@/views/PlayG1/Home/Components/Banner/index.vue";
import CasinoCarousel from "@/views/PlayG1/Home/Components/CasinoCarousel/index.vue";
import SlotCarousel from "@/views/PlayG1/Home/Components/SlotCarousel/index.vue";
import History from "@/views/PlayG1/Home/Components/History/index.vue";
import Contact from "@/views/PlayG1/Home/Components/Contact/index.vue";
import ContactDetail from "@/views/PlayG1/Home/Components/ContactDetail/index.vue";
</script>
