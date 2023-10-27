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
import Slide from "@/views/Duri/Home/Components/Slide/index.vue";
import Banner from "@/views/Duri/Home/Components/Banner/index.vue";
import CasinoCarousel from "@/views/Duri/Home/Components/CasinoCarousel/index.vue";
import SlotCarousel from "@/views/Duri/Home/Components/SlotCarousel/index.vue";
import History from "@/views/Duri/Home/Components/History/index.vue";
import Contact from "@/views/Duri/Home/Components/Contact/index.vue";
import ContactDetail from "@/views/Duri/Home/Components/ContactDetail/index.vue";
</script>
