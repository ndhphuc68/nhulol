<script setup>
import { computed, ref } from "vue";
import Baccarat from "./components/Baccarat.vue";
import Blackjack from "./components/Blackjack.vue";
import Roulette from "./components/Roulette.vue";
import Sicbo from "./components/Sicbo.vue";
import Dragontiger from "./components/Dragontiger.vue";
import Bullfight from "./components/Bullfight.vue";
import Mahjong from "./components/Mahjong.vue";
import Holdem from "./components/Holdem.vue";
import BannerPage from '@/components/Duri777/BannerPage';
import { useStore } from "vuex";

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
const store = useStore();

const activeIndex = computed(() => store.state.auth.activeGuideMenu);
const currentTabIdx = ref(activeIndex);
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

// onUnmounted(() => {
//   store.commit("handleActiveGuideMenu", 0);
// });

function handleChangeTab(idx) {
  store.commit("handleActiveGuideMenu", idx);
}
</script>

<template>
  <div id="gameGuide">
    <!-- <h2>{{ $t("gameGuide") }}</h2> -->
    <BannerPage :page="$t('gameGuide')" />
    <div class="card">
      <v-tabs
        v-model="currentTabIdx"
        bg-color="transparent"
        color="var(--primaryG2Casino)"
      >
        <v-tab
          v-for="(item, index) in items"
          :key="item"
          :value="item"
          @click="handleChangeTab(index)"
          style="width: calc(100% / 8)"
        >
          {{ (item) }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="item in items" :key="item" :value="item">
          <v-card color="basil" flat>
            <KeepAlive>
              <component :is="content" class="tab-content" />
            </KeepAlive>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<style lang="scss">
#gameGuide {
  h2 {
    font-size: 1.5rem;
  }

  .card {
    width: 90%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 32px 0;
    border: none;
  }

  .tab-content {
    text-align: left;

    h4 {
        color: var(--primaryG2Casino);
    }
  }

  .v-slide-group__content {
    border-bottom: 2px solid #d4d4d8;
  }

  @media (max-width: 768px) {
    .card {
        width: 95%;
    }
  }
}
</style>
