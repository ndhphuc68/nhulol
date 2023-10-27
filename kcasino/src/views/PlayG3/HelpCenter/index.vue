<script setup>
import { ref } from "vue";
import QueryCreation from "./QueryCreation.vue";
import QueryList from "./QueryList.vue";
import svgIcon from "@/assets/PlayG3/icon/common";

const currentTabIdx = ref(0);

const tabs = [
  {
    index: 0,
    panel: QueryList,
    title: "helpCenter",
    textButton: "createFAQ",
    iconButton: svgIcon?.QueryCreateIcon,
    nextTab: 1,
  },
  {
    index: 1,
    panel: QueryCreation,
    textButton: "back",
    iconButton: svgIcon?.BackIcon,
    title: "queryCreation",
    nextTab: 0,
  },
];
</script>

<template>
  <section id="service-center" class="container">
    <div class="head-tab">
      <h4 class="title">
        {{ $t(tabs[currentTabIdx]?.title) }}
      </h4>
      <button
        class="btn-contained btn-query btn-change-tab"
        @click="currentTabIdx = tabs[currentTabIdx]?.nextTab"
      >
        {{ $t(tabs[currentTabIdx]?.textButton) }}
        <component class="icon ml-3" :is="tabs[currentTabIdx]?.iconButton" />
      </button>
    </div>
    <keep-alive>
      <component :is="tabs[currentTabIdx]?.panel" />
    </keep-alive>
  </section>
</template>

<style lang="scss" scoped>
#service-center {
  // margin: 3.125rem auto;
  padding-top: 3.125rem;
  padding-bottom: 3.125rem;

  @media (max-width: 375px) {
    // margin: 1rem auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.head-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .title {
    font-size: 1.75rem;
    display: flex;
    align-items: center;
  }

  .btn-query {
    border-radius: 8px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
  }
}
</style>
