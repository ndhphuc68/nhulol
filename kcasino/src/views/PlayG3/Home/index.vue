<script setup>
import Banner from "@/views/PlayG3/Home/Banner";
import Introduce from "@/views/PlayG3/Home/Introduce";
import BannerCenter from "@/views/PlayG3/Home/BanerCenter";
import ServiceDetail from "@/views/PlayG3/Home/ServiceDetail";
import Services from "@/views/PlayG3/Home/Services";
import PickGame from "@/views/PlayG3/Home/PickGame";
import BannerSlice from "@/views/PlayG3/Home/BannerSlice";
</script>

<template>
  <div>
<!--    <Banner />-->
    <!--        <Introduce />-->
      <BannerSlice />
    <PickGame />
    <!--    <BannerCenter />-->
    <Services />
    <ServiceDetail />
  </div>
</template>

<style scoped></style>
