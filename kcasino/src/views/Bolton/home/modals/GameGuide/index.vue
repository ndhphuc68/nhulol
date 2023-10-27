<template>
  <!--  <div class="tab-guide">-->
  <!--    <v-tabs-->
  <!--      v-model="currentTabIdx"-->
  <!--      bg-color="transparent"-->
  <!--      color="var(&#45;&#45;primaryFSCasino)"-->
  <!--      grow-->
  <!--    >-->
  <!--      <v-tab-->
  <!--        v-for="(item, index) in items"-->
  <!--        :key="item"-->
  <!--        :value="item"-->
  <!--        @click="handleChangeTab(index)"-->
  <!--      >-->
  <!--        {{ $t(item) }}-->
  <!--      </v-tab>-->
  <!--    </v-tabs>-->
  <!--    <v-window v-model="tab">-->
  <!--      <v-window-item v-for="item in items" :key="item" :value="item">-->
  <!--        <v-card color="basil" flat>-->
  <!--          <KeepAlive>-->
  <!--            <component :is="content" class="tab-content" />-->
  <!--          </KeepAlive>-->
  <!--        </v-card>-->
  <!--      </v-window-item>-->
  <!--    </v-window>-->
  <!--  </div>-->
  <TabView v-model:activeIndex="activeIndex">
    <TabPanel :key="index" v-for="(item, index) in items" :header="item">
      <component :is="contents[index]" />
    </TabPanel>
  </TabView>
</template>
<script setup>
import { computed, onUnmounted, ref } from "vue";
import Baccarat from "./components/Baccarat.vue";
import Blackjack from "./components/Blackjack.vue";
import Bullfight from "./components/Bullfight.vue";
import Dragontiger from "./components/Dragontiger.vue";
import Holdem from "./components/Holdem.vue";
import Mahjong from "./components/Mahjong.vue";
import Roulette from "./components/Roulette.vue";
import Sicbo from "./components/Sicbo.vue";
import { useStore } from "vuex";

import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

const store = useStore();

const activeIndex = computed(() => store.state.auth.activeGuideMenu);

onUnmounted(() => {
  store.commit("handleActiveGuideMenu", 0);
});

const items = [
  "Baccarat",
  "Blackjack",
  "Roulette",
  "Sicbo",
  "Dragontiger",
  "Bullfight",
  "Mahjong",
  "Holdem",
];

const contents = [
  Baccarat,
  Blackjack,
  Roulette,
  Sicbo,
  Dragontiger,
  Bullfight,
  Mahjong,
  Holdem,
];
</script>
<style lang="scss">
@media (min-width: 992px) {
  .p-tabview-nav {
    justify-content: space-evenly;
  }
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none;
}

.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  border-color: var(--primaryFSCasino);
  color: var(--primaryFSCasino);
}

.p-tabview {
  width: 100vw !important;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
