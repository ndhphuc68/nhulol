<template>
  <div id="betrule">
    <div class="tabs">
      <div
        :class="`tab-item ${activeIndex === index ? 'active' : ''}`"
        v-for="(item, index) in items"
        :key="item"
        :value="item"
        @click="handleChangeTab(index)"
      >
        {{ $t(item) }}
      </div>
    </div>
    <v-window v-model="tab">
      <v-window-item v-for="item in items" :key="item" :value="item">
        <KeepAlive>
          <component :is="content" class="tab-content" />
        </KeepAlive>
      </v-window-item>
    </v-window>
  </div>
</template>
<script setup>
import Baccarat from "./components/Baccarat.vue";
import Blackjack from "./components/Blackjack.vue";
import Roulette from "./components/Roulette.vue";
import Sicbo from "./components/Sicbo.vue";
import Dragontiger from "./components/Dragontiger.vue";
import Bullfight from "./components/Bullfight.vue";
import Mahjong from "./components/Mahjong.vue";
import Holdem from "./components/Holdem.vue";
import { computed, onUnmounted, ref } from "vue";
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

const activeIndex = computed(() => store.state.auth.activeBetRuleMenu);
const currentTabIdx = ref(activeIndex);
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

onUnmounted(() => {
  store.commit("handleActiveBetRuleMenu", 0);
});

function handleChangeTab(idx) {
  store.commit("handleActiveBetRuleMenu", idx);
}
</script>

<style scoped lang="scss">
#betrule {
  height: 100%;
  padding: 0;
  display: flex;

  .tabs {
    margin-right: 20px;
    display: grid;
    grid-gap: 8px;

    .tab-item {
      padding: 0 50px;
      border-radius: 8px;
      border: 1px solid var(--300, #e0e0e0);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
      cursor: pointer;
      white-space: nowrap;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .active {
      background: var(--primarySCCasino);
      color: #fff;
      transition: all 0.5s;
      border: var(--primarySCCasino);
    }
  }

  .tab-content {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
  }

  .v-window {
    width: 100%;
    overflow-y: scroll;
    text-align: left;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  @media (max-width: 768px) {
    width: 95%;
    height: 87%;
    margin: 60px auto 0;
    flex-direction: column;
    overflow-y: auto;

    .tabs {
      margin: 0;
      grid-template-columns: 1fr 1fr;
      .tab-item {
        padding: 10px 0;
      }
    }

    .v-window {
      margin-top: 20px;
    }
  }
}
</style>
