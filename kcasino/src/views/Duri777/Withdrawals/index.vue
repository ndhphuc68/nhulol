<script setup>
import withdrawal from "@/views/Duri777/Withdrawals/Withdrawal";
import withdrawalHistory from "@/views/Duri777/Withdrawals/WithdrawalHistory";
import {computed, ref, onMounted} from "vue";
import BannerPage from "@/components/Duri777/BannerPage/index"
import Button from 'primevue/button'
import { useStore} from "vuex";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter();
const titles = ["withdrawal", "WithdrawHistory"];
const tabs = [withdrawal, withdrawalHistory];
const currentTabIndex = ref(0);
const activeTab = computed(() => tabs[currentTabIndex.value]);
const transaction = computed(() => store.getters.getTransaction)

const changeTab = (idx) => {
  currentTabIndex.value = idx
}

onMounted(()=> {
  transaction.value === "YES" && router.push('/')
})
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