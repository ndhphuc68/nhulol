<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import MyPage from "./components/UserInfo";
import Deposit from "./components/Deposit";
import Withdrawal from "./components/Withdrawal";
import HelpCenter from "./components/HelpCenter";
import SiteMall from "./components/SiteMall/SiteMail";

const store = useStore();
const currentTabIdx = ref(store.state.auth.activeMenu);
const items = ["sitemail", "mypage", "deposit", "withdraw", "helpcenter"];

const tabSidebar = [5, 6, 7, 8, 9];

const contents = [SiteMall, MyPage, Deposit, Withdrawal, HelpCenter];
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
  store.commit("handleActiveSidebar", tabSidebar[idx]);
}
</script>

<template>
  <div class="personal">
    <div>
      <v-tabs v-model="currentTabIdx" bg-color="transparent" color="basil" grow>
        <v-tab
          v-for="(item, index) in items"
          :key="item"
          :value="item"
          @click="handleChangeTab(index)"
        >
          {{ $t(item) }}
        </v-tab>
      </v-tabs>
    </div>

    <div class="tab-content">
      <v-window v-model="tab">
        <v-window-item v-for="item in items" :key="item" :value="item">
          <v-card class="ma-2" color="basil" flat>
            <KeepAlive>
              <component :is="content" />
            </KeepAlive>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
<style scoped>
.personal {
  position: relative;
}

@media (max-width: 768px) {
  .personal {
    min-height: unset;
  }
}
</style>
<style lang="scss">
/* Helper classes */
.personal .v-tab--selected {
  background-color: var(--bg);
}

.personal .text-basil {
  color: var(--primaryDoplay);
}

@media (max-width: 280px) {
  .personal .v-btn__content {
    font-size: 10px;
  }
}

.tab-content {
  max-height: 81vh;
  //overflow-y: auto;
}

.tab-content::-webkit-scrollbar {
  display: none;
}
</style>
