<script setup>
import Service from "@/views/Duri777/Home/Components/Service";
import ServiceDetail from "@/views/Duri777/Home/Components/ServiceDetail";
import Banner from "@/views/Duri777/Home/Components/Banner";
import Partners from "@/views/Duri777/Home/Components/Partners";
import PickGame from "@/views/Duri777/Home/Components/PickGame";
</script>

<template>
  <!-- This is Home page -->
  <Banner />
  <div class="wrap">
    <!--    <Partners />-->
    <PickGame class="mt-4" />
    <Service />
    <ServiceDetail />
  </div>
</template>

<style scoped lang="scss">
.wrap {
  max-width: 1440px;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }
}
</style>
