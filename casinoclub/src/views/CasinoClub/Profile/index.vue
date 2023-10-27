<template>
  <section id="profile">
    <Banner
      :image="'banner-profile'"
      :title="'profile'"
      :description="'Our Magical Moment'"
    />

    <component @handleChangeTab="handleChangeTab" :is="components[idxActive]" />
  </section>
</template>

<script setup>
import Banner from "@/components/CasinoClub/Banner";
import Information from "./infomation.vue";
import Edit from "./Edit";
import { ref } from "vue";

const components = [Information, Edit];
const idxActive = ref(0);
const handleChangeTab = (idx) => {
  const element = document.getElementById("profile");

  idxActive.value = idx;
  element.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped lang="scss"></style>
