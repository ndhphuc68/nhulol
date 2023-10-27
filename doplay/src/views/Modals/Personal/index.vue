<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex"
import MyPage from "./components/UserInfo";
import Deposit from "./components/Deposit";
import Withdrawal from "./components/Withdrawal";
import HelpCenter from "./components/HelpCenter";
import Notice from "./components/Notice";
import BetRule from "./components/BetRule";
import SiteMall from "./components/SiteMall";

const store = useStore();
const currentTabIdx = ref(store.state.auth.activeMenu);
const items = [
  "notice",
  "betrule",
  "sitemail",
  "mypage",
  "deposit",
  "withdrawal",
  "servicecenter",
];

const contents = [Notice, BetRule, SiteMall, MyPage, Deposit, Withdrawal, HelpCenter];
const tab = computed(() => items[currentTabIdx.value])
const content = computed(() => contents[currentTabIdx.value]);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
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
              <component :is="content"/>
            </KeepAlive>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
<style scoped>
.personal {
  max-width: 1128px;
  min-height: 800px;
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
  color: var(--primary);
}

.tab-content {
  max-height: 81vh;
  overflow-y: auto;
}

.tab-content::-webkit-scrollbar {
  display: none;
}

</style>
