<script setup>
import deposit from "@/views/PlayG3/Withdrawal/Withdrawal";
import depositHistory from "@/views/PlayG3/Withdrawal/WithdrawalHistory";
import { computed, ref } from "vue";
import Button from "primevue/button";

const titles = ["withdraw", "withdrawalHistory"];
const tabs = [deposit, depositHistory];
const currentTabIndex = ref(0);
const activeTab = computed(() => tabs[currentTabIndex.value]);

const changeTab = (idx) => {
  currentTabIndex.value = idx;
};
</script>

<template>
  <div class="container">
    <h3>{{ $t(`${titles[currentTabIndex]}`) }}</h3>
    <div class="tabs mt-8" id="tabGame">
      <Button
        class="tab-item"
        v-for="(title, index) in titles"
        @click="changeTab(index)"
        :key="index"
        :class="{ active: currentTabIndex === index }"
      >
        <p>{{ $t(title) }}</p>
      </Button>
    </div>
    <div class="panel">
      <KeepAlive>
        <component :is="activeTab"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding-bottom: 50px;
  padding-top: 50px;

  @media (max-width: 375px) {
    padding-bottom: 16px;
    padding-top: 16px;
  }
}
.tabs {
  display: flex;
  margin-right: auto;
}
.tab-item {
  background: transparent;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all linear 0.2s;
  &:focus,
  &:focus-visible,
  &:active {
    border: none;
    outline: none;
    box-shadow: none;
  }

  p {
    margin-bottom: 0;
  }

  &:hover {
    color: var(--text);
    opacity: 0.8;
    transform: scale(0.97);
    transition: all linear 0.2s;
    background-color: var(--primaryPlayG3);
  }
  &:nth-child(1) {
    margin-right: 1.25rem;
  }
  &.active {
    background-color: var(--primaryPlayG3);
    color: #ffffff;
  }
  
  @media (max-width: 375px) {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
