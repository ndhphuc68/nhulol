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

const activeIndex = computed(() => store.state.auth.activeGameGuide);
const currentTabIdx = ref(activeIndex);
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

// onUnmounted(() => {
//   store.commit("handleActiveGameGuide", 0);
// });

function handleChangeTab(idx) {
  store.commit("handleActiveGameGuide", idx);
}
</script>

<template>
  <div id="gameGuide">
    <h2>{{ $t("gameGuide") }}</h2>
    <div>
      <v-tabs v-model="currentTabIdx" bg-color="var(--bgPlayG3)">
        <v-tab
          v-for="(item, index) in items"
          :key="item"
          :value="item"
          @click="handleChangeTab(index)"
          style="width: calc(100% / 8)"
        >
          {{ $t(item) }}
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
  background: transparent;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 0;
  border: none;

  h2 {
    font-size: 1.5rem;
  }

  .tab-content {
    text-align: left;
    background: var(--bgPlayG3);
    color: var(--textPlayG3);

    h4 {
      color: var(--primaryPlayG3);
    }

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      margin-bottom: 0;
    }
  }

  .v-btn__content {
    color: var(--textPlayG3);
  }

  .v-tab__slider {
    background: var(--primaryPlayG3);
  }

  .title-guide {
    padding-top: 16px;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    .card {
      width: 95%;
    }
  }
}
</style>
