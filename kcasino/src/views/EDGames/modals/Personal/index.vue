<template>
  <div class="container">
    <div class="titles">
      <button
        class="title-item"
        v-for="(title, index) in titles"
        @click="handleChangeTab(index)"
        :key="index"
        :class="{ active: activeIndex === index }"
      >
        {{ $t(title) }}
      </button>
    </div>
    <div class="tab">
      <KeepAlive>
        <component :is="activeTab"></component>
      </KeepAlive>
    </div>
  </div>
</template>
<script setup>
import WrapperModal from "../components/WrapperModal";
import { ref, computed, onUnmounted } from "vue";
import { userInfoTabs } from "@/utils/datas";
import UserInfo from "./components/UserInfo";
import DepositPage from "./components/DepositPage";
import Withdraw from "./components/Withdraw";
import DepositHistory from "./components/DepositHistory";
import WithdrawHistory from "./components/WithdrawHistory";
import Message from "./components/Message";
import HelpCenter from "./components/HelpCenter";

import { useStore } from "vuex";

const store = useStore();
const activeTab = computed(() => tabs[activeIndex.value]);
const activeIndex = ref(store.state.auth.activeMenu);
const userInfor = computed(() => store.state.user.userInfor);
const tabs = [
  UserInfo,
  DepositPage,
  Withdraw,
  DepositHistory,
  WithdrawHistory,
  /*  Coupon,*/
  Message,
  HelpCenter,
];
const { titles } = userInfoTabs;

onUnmounted(async () => {
  await store.dispatch("getListMessageAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
});
const handleChangeTab = (index) => {
  store.commit("handleActiveSidebar", userInfoTabs.tabs[index]);
  activeIndex.value = index;
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
}

.titles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 2px solid #e4e4e7;
}

.titles {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.titles::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.tab {
  padding: 0 16px;
  margin-top: 32px;
}

.tab::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

@media (max-width: 375px) {
  .tab {
    padding: 0;
  }
}

.title-item {
  /*height: 99px;*/
  padding: 15px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: var(--text-second);
  text-transform: capitalize;
  background-color: var(--bg);
}

@media (max-width: 375px) {
  .title-item {
    font-size: 12px !important;
  }
}

.title-item.active {
  color: var(--primary);
}

.title-item:hover {
  color: var(--primary);
}

.title-item.active::after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0;
  height: 0;
  top: calc(100% - 1px);
  border: 2px solid #cc9a6c;
}

@media (max-width: 1024px) {
  .titles {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .title-item {
    min-width: 20%;
    height: unset;
    margin: 5px;
    padding: 5px;
  }
}

@media (max-width: 768px) {
  .tab {
    height: 100%;
  }

  .container {
    margin-bottom: 40px;
  }
}
</style>
