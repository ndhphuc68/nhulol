<template>
  <div class="tab-guide">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="BACCARAT" name="1"><Baccarat /></el-tab-pane>
      <el-tab-pane label="BLACKJACK" name="2"><Blackjack /></el-tab-pane>
      <el-tab-pane label="ROULETTE" name="3"><Roulette /></el-tab-pane>
      <el-tab-pane label="SICBO" name="4"><Sicbo /></el-tab-pane>
      <el-tab-pane label="DRAGON TIGER" name="5"><Dragontiger /></el-tab-pane>
      <el-tab-pane label="BULLFIGHT" name="6"><Bullfight /></el-tab-pane>
      <el-tab-pane label="HOLDEM" name="7"><Holdem /></el-tab-pane>
      <el-tab-pane label="MAHJOMG" name="8"><Mahjong /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Baccarat from "./components/Baccarat.vue";
import Blackjack from "./components/Blackjack.vue";
import Bullfight from "./components/Bullfight.vue";
import Dragontiger from "./components/Dragontiger.vue";
import Holdem from "./components/Holdem.vue";
import Mahjong from "./components/Mahjong.vue";
import Roulette from "./components/Roulette.vue";
import Sicbo from "./components/Sicbo.vue";

const activeName = ref("1");

// const handleClick = (tab, event) => {};
const handleClick = () => {};
</script>
<style lang="scss">
.tab-guide {
  .el-tabs__nav {
    float: none;
    justify-content: space-between;
  }
  .el-tabs__item {
    width: 12.5%;
  }
  .el-tabs__item.is-active {
    background: #de6777;
    color: var(--white);
    border-radius: 6px;
  }
  .el-tabs__active-bar {
    display: none;
  }
}
</style>
