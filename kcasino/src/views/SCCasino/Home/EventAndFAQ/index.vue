<script setup>
import FAQ from "./FAQ";
import Event from "./Event";
import Notice from "../Notice"
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(async () => await store.dispatch("getPartnershipAction"));
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-xl-4">
        <Event class="" />
      </div>
      <div class="col-12 col-xl-4">
        <FAQ class="" />
      </div>
      <div class="col-12 col-xl-4 mt-2 mt-xl-0">
        <Notice class="" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
