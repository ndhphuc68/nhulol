<script setup>
import withdrawal from "@/views/G2casino/Withdrawals/Withdrawal";
import withdrawalHistory from "@/views/G2casino/Withdrawals/WithdrawalHistory";
import {computed, ref} from "vue";
import BannerPage from "@/components/G2casino/BannerPage/index"
import Button from 'primevue/button'

const titles = ["withdrawal", "WithdrawHistory"];
const tabs = [withdrawal, withdrawalHistory];
const currentTabIndex = ref(0);
const activeTab = computed(() => tabs[currentTabIndex.value]);

const changeTab = (idx) => {
  currentTabIndex.value = idx
}
</script>

<template>
  <BannerPage :page="$t('withdrawal')"/>
  <div class="container">
    <div class="tabs mt-5 pl-3" id="tabGame">
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
        <component
            :is="activeTab"
        ></component>
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  margin-right: auto;
}
.tab-item {
  background: #FAFAFA;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  @media(max-width: 375px) {
    padding: 10px;
    font-size: 12px;
  }

  p {
    margin-bottom: 0;
  }
  &:hover {
    color: var(--text);
    opacity: 0.8;
    transform: scale(0.97);
    transition: all linear .2s;
  }
  &:nth-child(1) {
    margin-right: 0.75rem;
  }
  &.active {
    background-color: var(--primaryG2Casino);
    color: #ffffff;
  }
}
</style>