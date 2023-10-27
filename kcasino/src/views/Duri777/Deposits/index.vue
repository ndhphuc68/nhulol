<script setup>
import deposit from "@/views/Duri777/Deposits/Deposit";
import depositHistory from "@/views/Duri777/Deposits/DepositHistory";
import {computed, ref, onMounted} from "vue";
import BannerPage from "@/components/Duri777/BannerPage/index"
import Button from 'primevue/button'
import { useStore} from "vuex";
import { useRouter } from "vue-router";


const store = useStore()
const router = useRouter();
const titles = ["deposit", "depositHistory"];
const tabs = [deposit, depositHistory];
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
  <BannerPage :page="$t('deposit')"/>
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
    padding: 10px 15px;
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
    margin-right: 1rem;
  }
  &.active {
    background-color: var(--primaryG2Casino);
    color: #ffffff;
  }
}
</style>