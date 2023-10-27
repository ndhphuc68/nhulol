<template>
  <Carousel />
  <div class="bg-content">
    <Notification />
    <Casino />
    <Slot />
  </div>
    <div class="bg-notion">
        <Event/>
        <div class="container row my-3 p-0">
            <FAQ class="col-12 col-lg-6 p-0"/>
            <Notice class="col-12 col-lg-6 p-0"/>
        </div>
    </div>
</template>

<script setup>
import Carousel from "@/components/CasinoClub/Carousel";
import Notification from "@/views/CasinoClub/Home/Notification";
import Event from "@/views/CasinoClub/Home/Events";
import Casino from "@/views/CasinoClub/Home/Casino";
import FAQ from '@/views/CasinoClub/Home/FAQ'
import Notice from '@/views/CasinoClub/Home/Notice'
import Slot from "@/views/CasinoClub/Home/Slot";
</script>

<style lang="scss" scoped>
.bg-content {
  background: url("@/assets/CasinoClub/background/bg-home.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-notion {
  background: url("@/assets/CasinoClub/background/bg-notion.png");
  background-size: cover;
}
</style>
