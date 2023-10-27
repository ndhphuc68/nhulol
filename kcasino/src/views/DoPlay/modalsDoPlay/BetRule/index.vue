<script setup>
import { computed, ref } from "vue";
import Baccarat from "./components/Baccarat";
import Blackjack from "./components/Blackjack";
import Roulette from "./components/Roulette";
import Sicbo from "./components/Sicbo";
import Dragontiger from "./components/Dragontiger";
import Bullfight from "./components/Bullfight";
import Mahjong from "./components/Mahjong";
import Holdem from "./components/Holdem";
import { useStore } from "vuex";
const store = useStore();
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
const activeIndex = ref(store.state.auth.activeGuideMenu);
const currentTabIdx = ref(activeIndex);
const tab = computed(() => items[activeIndex.value]);
const content = computed(() => contents[activeIndex.value]);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
}
</script>

<template>
  <h2 class="text-center mb-3">{{ $t("betrule") }}</h2>
  <div class="bet-rule">
    <v-tabs v-model="currentTabIdx" bg-color="transparent" color="basil" grow>
      <v-tab
        v-for="(item, index) in items"
        :key="item"
        :value="item"
        @click="handleChangeTab(index)"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="item in items" :key="item" :value="item">
        <v-card color="basil" flat>
          <KeepAlive>
            <component :is="content" />
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<style lang="scss" scoped>
.bet-rule {
  padding: 1.5rem 2.5rem;
  //max-height: 600px;
  //overflow: auto;
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
  @media (max-width: 375px) {
    font-size: 12px;
  }
  .v-btn.v-tab {
    border: 1px solid #d4d4d8;
  }

  .v-btn.v-tab--selected {
    background-color: var(--primaryDoplay) !important;
    //border: 1px solid var(--primaryDoplay);
  }

  .text-basil {
    color: #ffffff !important;
  }
}
</style>

<style lang="scss">
.v-btn__content {
  @media (max-width: 375px) {
    font-size: 10px !important;
  }
}
</style>
