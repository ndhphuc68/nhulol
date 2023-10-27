<script setup>
import Information from "./UserInfo";
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

<template>
  <section id="profile" class="container">
    <div>
      <component
        @handleChangeTab="handleChangeTab"
        :is="components[idxActive]"
      />
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
