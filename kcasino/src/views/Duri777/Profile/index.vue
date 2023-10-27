<script setup>
import { ref } from "vue";
import Infomation from "./Components/Infomation";
import Edit from "./Components/Edit";

const components = [Infomation, Edit];
const idxActive = ref(0);
const handleChangeTab = (idx) => {
  const element = document.getElementById("profile");

  idxActive.value = idx;
  element.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <section id="profile">
    <div>
      <component
        @handleChangeTab="handleChangeTab"
        :is="components[idxActive]"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
#profile {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
}
</style>
