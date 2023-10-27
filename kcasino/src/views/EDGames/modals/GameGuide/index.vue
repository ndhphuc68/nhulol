<template>
  <div class="container">
    <div class="titles">
      <button
        class="title-item"
        v-for="(title, index) in titles"
        @click="activeIndex = index"
        :key="index"
        :class="{ active: activeIndex === index }"
      >
        {{ title }}
      </button>
    </div>
    <div class="tab">
      <component :is="activeTab"></component>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { gameGuideTabs } from "@/utils/datas";
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
const activeTab = computed(() => tabs[activeIndex.value]);
const activeIndex = ref(store.state.auth.activeGuideMenu);
const tabs = [
  Baccarat,
  Blackjack,
  Roulette,
  Sicbo,
  Dragontiger,
  Bullfight,
  Mahjong,
  Holdem,
];
const { titles } = gameGuideTabs;
</script>
<style scoped>
.container {
  margin-left: 10px;
  margin-top: 10px;
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
  height: 650px;
  width: 100%;
}

.tab::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.title-item {
  height: 45px;
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
  height: 0px;
  left: 0;
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
    margin: 10px;
    padding: 5px;
  }
}

@media (max-width: 768px) {
  .title-item {
    justify-content: left;
  }

  .tab {
    height: unset;
    overflow-y: unset;
  }

  .container {
    margin-bottom: 40px;
  }
}
@media (max-width: 375px) {
  .title-item {
    font-size: 10px;
  }
  .titles {
    padding: 0;
  }
}
</style>
