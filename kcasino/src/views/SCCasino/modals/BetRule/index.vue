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
        {{ item }}
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

const activeIndex = computed(() => store.state.auth.activeGuideMenu);
const currentTabIdx = ref(activeIndex);
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

onUnmounted(() => {
  store.commit("handleActiveGuideMenu", 0);
});

function handleChangeTab(idx) {
  store.commit("handleActiveGuideMenu", idx);
}
</script>

<style scoped lang="scss">
#betrule {
  height: 100%;
  /* padding: 0; */
  display: flex;
  flex-direction: column;

  .tabs {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;

    .tab-item {
      padding: 16px 50px;
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

      @media (max-width: 375px) {
        font-size: 12px;
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
    padding: 20px 20px 50px 20px;
    border-radius: 8px;
    @media (max-width: 375px) {
      font-size: 12px;
    }
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
    padding: 0 15px;
    margin: 60px auto 100px;
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
